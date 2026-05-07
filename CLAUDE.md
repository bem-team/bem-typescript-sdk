# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This file is for engineers and coding agents **integrating Bem into their own application** using the `bem-ai-sdk` package. It is not a contributor guide. Authoritative product docs live at [docs.bem.ai](https://docs.bem.ai); the full surface of every endpoint, parameter, and response type is in [`api.md`](./api.md).

## What Bem is, briefly

Bem is a document-processing API: you give it files (PDFs, images, spreadsheets, emails, audio), and you get back structured JSON. The pipeline is composable.

- **Functions** are the building blocks. Each has a type that determines what it does:
  - `extract` — pull structured fields from a document into a JSON Schema you supply
  - `classify` (a.k.a. `route`) — categorize a document into one of several named buckets
  - `split` — break a multi-document file into individual documents
  - `join` — merge results from multiple branches
  - `parse` — render a document into an entity-and-section tree walkable by an agent
  - `payload_shaping` — transform extract output via JMESPath
  - `enrich` — augment with semantic search against a Collection
  - `send` — deliver final output to a webhook or other destination
- **Workflows** chain functions together as a directed acyclic graph. One entry node, edges between nodes, branching for `classify`/`split` outputs.
- **Calls** are individual invocations of a workflow. Async by default; you can opt in to a server-side wait of up to ~30 seconds.
- **Events / Outputs / Errors** are emitted along the way. The terminal events of a call are split into `outputs` (success) and `errors` (per-function failures). Workflow calls are not atomic — both arrays may be non-empty.
- **Collections** are vector stores used by `enrich` functions.
- **Webhooks** deliver completed call results to your own URL. Every delivery is HMAC-signed.

If you're building an integration, the typical shape is: define schemas → register functions → wire them into a workflow → invoke per-document → handle the result via webhook or polling.

## Installing and authenticating

```sh
npm install bem-ai-sdk
```

```ts
import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: process.env['BEM_API_KEY'], // also read by default from this env var
});
```

Other client options worth knowing about:

- `baseURL` — point at a non-production environment.
- `timeout` — per-request timeout (default 60 s).
- `maxRetries` — automatic retries on 408/409/429/5xx and connection errors (default 2, exponential backoff).
- `fetch` / `fetchOptions` — bring your own `fetch` or pass `RequestInit` options (used to attach a proxy `dispatcher` under Node, an `httpClient` under Deno, etc.).
- `logLevel` / `logger` — `'debug'` logs every request and response (auth headers redacted; bodies are not).

## Runtime support

Works on Node 20+, Bun, Deno 1.28+, Cloudflare Workers, Vercel Edge, modern browsers, and Jest's `node` environment. The SDK uses `globalThis.fetch` and Web Crypto, so the same code runs everywhere. There is no React Native support.

## File uploads

Endpoints that accept files (`infer-schema`, workflow `call`, etc.) take an `Uploadable`. Several shapes are accepted:

- A `File` or `Blob` you already have (browsers, Workers).
- A buffer wrapped via `toFile`:
  ```ts
  import { toFile } from 'bem-ai-sdk';
  await client.inferSchema.create({ file: await toFile(buffer, 'invoice.pdf', { type: 'application/pdf' }) });
  ```
- A path on disk (Node only) via `fromPath`, which reads the bytes, takes the basename, and infers the MIME type from the extension list documented for `/v3/infer-schema`:
  ```ts
  import { fromPath } from 'bem-ai-sdk';
  await client.inferSchema.create({ file: await fromPath('./fixtures/invoice.pdf') });
  ```

## Calling workflows

A workflow runs asynchronously by default — `client.workflows.create({ ..., wait: true })` blocks server-side for up to ~30 seconds; past that, the call is still running and you have to poll `GET /v3/calls/{callID}` yourself. The SDK ships a `waitForCall` helper that does this with exponential backoff, configurable timeout, and `AbortSignal` support:

```ts
import Bem, { waitForCall, CallFailedError } from 'bem-ai-sdk';

const client = new Bem();

const { call } = await client.workflows.create({
  name: 'my-pipeline',
  input: { singleFile: { inputContent: base64Pdf, inputType: 'pdf' } },
});

try {
  const result = await waitForCall(client, call!.callID!, {
    until: 'completed',     // throw on `failed` instead of resolving
    timeoutMs: 10 * 60_000,
    pollIntervalMs: 1000,
    maxPollIntervalMs: 10_000,
  });
  // result.call.outputs / result.call.errors / result.call.traceUrl
} catch (err) {
  if (err instanceof CallFailedError) {
    // err.response.call.errors holds the per-function error events
  } else {
    throw err;
  }
}
```

## Pagination

List methods return a `PagePromise` that supports both auto-iteration and manual paging:

```ts
// Streaming all pages
for await (const fn of client.functions.list()) {
  // ...
}

// One page at a time
let page = await client.functions.list({ limit: 50 });
while (page.hasNextPage()) {
  page = await page.getNextPage();
}
```

Cursor params are `startingAfter` / `endingBefore` (per-resource: `functionIDs`, `workflowIDs`, etc.).

## Errors

Every API failure throws a subclass of `APIError`. Narrow with `instanceof`:

```ts
import Bem, {
  APIError,
  NotFoundError,
  RateLimitError,
  AuthenticationError,
} from 'bem-ai-sdk';

try {
  await client.functions.retrieve('does-not-exist');
} catch (err) {
  if (err instanceof NotFoundError) {
    // 404 — function name doesn't exist in this environment
  } else if (err instanceof RateLimitError) {
    // 429 — already retried per maxRetries, then surfaced
  } else if (err instanceof APIError) {
    console.log(err.status, err.name, err.headers);
  } else {
    throw err; // network error, abort, etc.
  }
}
```

Status → class: `BadRequestError` 400, `AuthenticationError` 401, `PermissionDeniedError` 403, `NotFoundError` 404, `ConflictError` 409, `UnprocessableEntityError` 422, `RateLimitError` 429, `InternalServerError` 5xx, `APIConnectionError` / `APIConnectionTimeoutError` for transport failures.

## Idempotent setup with upsert

There is no `PUT /functions/{name}` — `POST` creates v1, `PATCH` produces a new version. For setup scripts and fixture loaders that should be re-runnable, use the upsert helpers. They narrow strictly on `NotFoundError`, so auth and 5xx failures don't silently flip into a create attempt:

```ts
import { upsertFunction, upsertWorkflow } from 'bem-ai-sdk';

const { created, data } = await upsertFunction(client, 'invoice-extractor', {
  type: 'extract',
  outputSchema: invoiceSchema,
  outputSchemaName: 'InvoiceExtraction',
});

await upsertWorkflow(client, 'my-pipeline', {
  mainNodeName: 'extract',
  nodes: [{ nodeName: 'extract', function: { functionName: 'invoice-extractor' } }],
});
```

`upsert*` returns `{ created: boolean, data: <resource> }`. Pass the body without the name field — it's taken from the positional argument.

## Receiving and verifying webhooks

When a `send` function (or a webhook subscription) fires, Bem POSTs the payload to your URL with a `bem-signature` header. Verify it before trusting the body. The signed string is `${unix_seconds}.${raw_request_body}` — you must hand the helper the **raw bytes**, not a re-serialized JSON object, or the HMAC will not match.

```ts
import { verifyWebhookSignature, WebhookSignatureError } from 'bem-ai-sdk';

// Next.js App Router / Fetch-style
export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    await verifyWebhookSignature({
      header: request.headers.get('bem-signature'),
      payload: rawBody,
      secret: process.env['BEM_WEBHOOK_SECRET']!,
      // toleranceMs: 5 * 60 * 1000   // default
    });
  } catch (err) {
    if (err instanceof WebhookSignatureError) {
      return new Response('Unauthorized', { status: 401 });
    }
    throw err;
  }
  const event = JSON.parse(rawBody);
  // ... handle event ...
  return new Response('ok');
}
```

The verifier uses Web Crypto, so it runs unchanged on Workers and Edge runtimes. It enforces a 5-minute replay window by default and uses constant-time comparison.

To rotate the secret on the Bem side: `await client.webhookSecret.create()` returns a new value (shown in full only this once — store it before the next webhook delivery arrives).

## Sending custom headers and undocumented requests

To attach per-request headers, query params, or signal an abort:

```ts
const ac = new AbortController();
await client.functions.create(body, {
  signal: ac.signal,
  headers: { 'X-Request-ID': crypto.randomUUID() },
  maxRetries: 5,
  timeout: 30_000,
});
```

To hit endpoints not yet typed in the SDK, use the raw verbs:

```ts
await client.post('/some/path', { body: { ... }, query: { ... } });
```

## Reading raw responses

The `APIPromise` returned by every method has `.asResponse()` (headers immediately, body untouched) and `.withResponse()` (parsed body plus the raw `Response`). Useful for streaming, custom parsing, or surfacing trace IDs from response headers:

```ts
const { data, response } = await client.functions
  .retrieve('invoice-extractor')
  .withResponse();
console.log(response.headers.get('x-request-id'));
```

## What lives where in your imports

| Need | Import from `bem-ai-sdk` |
| --- | --- |
| Client | `Bem` (default and named export) |
| Errors to narrow on | `APIError`, `NotFoundError`, `RateLimitError`, `AuthenticationError`, … |
| File uploads | `toFile`, `fromPath` (Node), type `Uploadable` |
| Wait helpers | `waitForCall`, `CallTimeoutError`, `CallFailedError` |
| Idempotent setup | `upsertFunction`, `upsertWorkflow` |
| Webhook verification | `verifyWebhookSignature`, `WebhookSignatureError` |
| Resource-specific types | subpath imports like `bem-ai-sdk/resources/functions` |

For the full method-by-method API reference, see [`api.md`](./api.md). For product concepts (function types, workflow patterns, what a parse output looks like, how feedback gets attributed), see [docs.bem.ai](https://docs.bem.ai).
