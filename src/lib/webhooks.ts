/**
 * Verify the HMAC-SHA256 signature on an incoming Bem webhook.
 *
 * Bem signs every outbound webhook delivery with the active webhook secret
 * (see `client.webhookSecret`). The signature is sent in the `bem-signature`
 * header in the format:
 *
 *     bem-signature: t=<unix-seconds>,v1=<hex-hmac-sha256>
 *
 * The signed payload is `${timestamp}.${rawRequestBody}`. Verification:
 *
 *   1. Parse the `bem-signature` header.
 *   2. Reject requests whose timestamp is outside the replay window.
 *   3. Recompute HMAC-SHA256 over `${t}.${payload}` with the shared secret.
 *   4. Compare against `v1` in constant time.
 *
 * This module uses Web Crypto (`globalThis.crypto.subtle`) so it runs
 * unchanged on Node, Bun, Deno, browsers, Cloudflare Workers, and Vercel
 * Edge. The body MUST be the raw request bytes — parsing it as JSON first
 * will reorder/reformat keys and break the HMAC.
 */

const DEFAULT_TOLERANCE_MS = 5 * 60 * 1000;

export class WebhookSignatureError extends Error {
  override readonly name = 'WebhookSignatureError';
  constructor(message: string) {
    super(message);
  }
}

export interface VerifyWebhookOptions {
  /** Value of the `bem-signature` request header. */
  header: string | null | undefined;
  /**
   * Raw, unparsed request body. Must be exactly the bytes Bem signed —
   * pass `await request.text()` (Fetch) or the buffered body (Express,
   * with `express.text()` / `express.raw()`), not a re-serialized object.
   */
  payload: string | Uint8Array;
  /** Webhook signing secret (from `client.webhookSecret.retrieve()`). */
  secret: string;
  /**
   * Maximum age of the signature in milliseconds. Default: 5 minutes.
   * Older signatures are rejected to prevent replay attacks.
   */
  toleranceMs?: number;
  /** Injectable clock for testing. Default: `Date.now()`. */
  nowMs?: number;
}

export interface VerifiedWebhook {
  /** Unix-seconds timestamp from the signature header. */
  timestamp: number;
  /** The raw payload, returned for convenient JSON parsing downstream. */
  payload: string;
}

/**
 * Verify a Bem webhook signature. Resolves with the parsed timestamp and
 * payload on success; throws {@link WebhookSignatureError} on any failure
 * (missing header, malformed format, expired timestamp, bad digest).
 *
 * ```ts
 * import { verifyWebhookSignature, WebhookSignatureError } from 'bem-ai-sdk';
 *
 * export async function POST(request: Request) {
 *   const rawBody = await request.text();
 *   try {
 *     await verifyWebhookSignature({
 *       header: request.headers.get('bem-signature'),
 *       payload: rawBody,
 *       secret: process.env.BEM_WEBHOOK_SECRET!,
 *     });
 *   } catch (err) {
 *     if (err instanceof WebhookSignatureError) {
 *       return new Response('Unauthorized', { status: 401 });
 *     }
 *     throw err;
 *   }
 *   const event = JSON.parse(rawBody);
 *   // ...
 * }
 * ```
 */
export async function verifyWebhookSignature(options: VerifyWebhookOptions): Promise<VerifiedWebhook> {
  const { header, payload, secret, toleranceMs = DEFAULT_TOLERANCE_MS, nowMs = Date.now() } = options;

  if (!header) {
    throw new WebhookSignatureError('Missing bem-signature header');
  }
  if (!secret) {
    throw new WebhookSignatureError('Missing webhook secret');
  }

  const { ts, v1 } = parseSignatureHeader(header);

  const ageMs = nowMs - ts * 1000;
  if (ageMs > toleranceMs) {
    throw new WebhookSignatureError(
      `bem-signature timestamp is older than the replay window (age ${ageMs}ms, tolerance ${toleranceMs}ms)`,
    );
  }
  // A small negative skew is allowed (clocks drift); a large one is suspicious.
  if (ageMs < -toleranceMs) {
    throw new WebhookSignatureError(`bem-signature timestamp is too far in the future (age ${ageMs}ms)`);
  }

  const payloadString = typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
  const expected = await hmacSha256Hex(secret, `${ts}.${payloadString}`);

  if (!timingSafeHexEqual(v1, expected)) {
    throw new WebhookSignatureError('bem-signature v1 digest does not match');
  }

  return { timestamp: ts, payload: payloadString };
}

function parseSignatureHeader(header: string): { ts: number; v1: string } {
  let ts: number | undefined;
  let v1: string | undefined;

  for (const part of header.split(',')) {
    const eq = part.indexOf('=');
    if (eq < 0) {
      throw new WebhookSignatureError('Malformed bem-signature header');
    }
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === 't') {
      const parsed = Number(value);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new WebhookSignatureError('bem-signature t is not a valid unix timestamp');
      }
      ts = parsed;
    } else if (key === 'v1') {
      v1 = value;
    }
  }

  if (ts === undefined || v1 === undefined) {
    throw new WebhookSignatureError('bem-signature missing t or v1 field');
  }
  return { ts, v1 };
}

// Structural subset of Web Crypto we depend on. Avoids requiring a DOM/Worker
// lib in the SDK's tsconfig and keeps the runtime check honest about what we
// actually call.
interface SubtleCryptoLike {
  importKey(
    format: 'raw',
    keyData: ArrayBufferView | ArrayBuffer,
    algorithm: { name: 'HMAC'; hash: 'SHA-256' },
    extractable: boolean,
    keyUsages: ReadonlyArray<'sign'>,
  ): Promise<unknown>;
  sign(algorithm: 'HMAC', key: unknown, data: ArrayBufferView | ArrayBuffer): Promise<ArrayBuffer>;
}

async function hmacSha256Hex(secret: string, data: string): Promise<string> {
  const subtle = (globalThis as { crypto?: { subtle?: SubtleCryptoLike } }).crypto?.subtle;
  if (!subtle) {
    throw new WebhookSignatureError('Web Crypto (globalThis.crypto.subtle) is not available in this runtime');
  }
  const encoder = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await subtle.sign('HMAC', key, encoder.encode(data));
  return bufferToHex(signature);
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i]!.toString(16).padStart(2, '0');
  }
  return out;
}

function timingSafeHexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
