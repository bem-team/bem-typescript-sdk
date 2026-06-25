// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from './functions';
import * as CopyAPI from './copy';
import { Copy, CopyCreateParams, FunctionCopyRequest } from './copy';
import * as RegressionAPI from './regression';
import {
  Regression,
  RegressionApplyCorrectionsParams,
  RegressionApplyCorrectionsResponse,
  RegressionRunParams,
  RegressionRunResponse,
} from './regression';
import * as VersionsAPI from './versions';
import {
  FunctionVersion,
  ListFunctionVersionsResponse,
  VersionRetrieveParams,
  VersionRetrieveResponse,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { FunctionsPage, type FunctionsPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Functions extends APIResource {
  copy: CopyAPI.Copy = new CopyAPI.Copy(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
  regression: RegressionAPI.Regression = new RegressionAPI.Regression(this._client);

  /**
   * **Create a function.**
   *
   * The function type (`extract`, `classify`, `split`, `join`, `enrich`, or
   * `payload_shaping`) determines which configuration fields are required — see
   * [Function types overview](/guide/function-types/overview) for the per-type
   * contract.
   *
   * The response contains both `functionID` and `functionName`. Either is a stable
   * handle you can use elsewhere; most workflows reference functions by
   * `functionName` because it's human-readable.
   *
   * ## Naming rules
   *
   * - `functionName` must be unique per environment.
   * - Allowed characters: letters, digits, hyphens, and underscores.
   * - Names cannot be reused after deletion within the same environment for at least
   *   the retention window of the previous record.
   *
   * The new function is created at `versionNum: 1`. Subsequent
   * `PATCH /v3/functions/{functionName}` calls produce new versions — the version-1
   * configuration remains immutable and addressable.
   *
   * @example
   * ```ts
   * const functionResponse = await client.functions.create({
   *   functionName: 'functionName',
   *   type: 'extract',
   * });
   * ```
   */
  create(body: FunctionCreateParams, options?: RequestOptions): APIPromise<FunctionResponse> {
    return this._client.post('/v3/functions', { body, ...options });
  }

  /**
   * **Retrieve a function's current version by name.**
   *
   * Returns the function record with its `currentVersionNum` and the configuration
   * of that version. To inspect a historical version, use
   * `GET /v3/functions/{functionName}/versions/{versionNum}`.
   *
   * @example
   * ```ts
   * const functionResponse = await client.functions.retrieve(
   *   'functionName',
   * );
   * ```
   */
  retrieve(functionName: string, options?: RequestOptions): APIPromise<FunctionResponse> {
    return this._client.get(path`/v3/functions/${functionName}`, options);
  }

  /**
   * **Update a function. Updates create a new version.**
   *
   * The previous version remains addressable and immutable. Workflow nodes that
   * pinned the function with a `versionNum` continue to use the pinned version;
   * nodes that reference the function by name with no version automatically pick up
   * the new version on their next call.
   *
   * ## What you can change
   *
   * Any field allowed by the function's type. Most commonly: `outputSchema` (for
   * `extract`/`join`), `classifications` (for `classify`), `displayName`, and
   * `tags`.
   *
   * ## Versioning behaviour
   *
   * - Each successful update increments `currentVersionNum` by 1.
   * - `displayName`, `tags`, and `functionName` updates also create a new version,
   *   so the version history is a complete record of every change.
   * - To revert, fetch the previous version and re-submit its configuration as a new
   *   update — versions themselves are immutable.
   *
   * @example
   * ```ts
   * const functionResponse = await client.functions.update(
   *   'functionName',
   *   { type: 'extract' },
   * );
   * ```
   */
  update(
    pathFunctionName: string,
    body: FunctionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<FunctionResponse> {
    return this._client.patch(path`/v3/functions/${pathFunctionName}`, { body, ...options });
  }

  /**
   * **List functions in the current environment.**
   *
   * Returns each function's current version. Combine filters freely — they AND
   * together.
   *
   * ## Filtering
   *
   * - `functionIDs` / `functionNames`: exact-match identity filters.
   * - `displayName`: case-insensitive substring match.
   * - `types`: one or more of `extract`, `classify`, `split`, `join`, `enrich`,
   *   `payload_shaping`. Legacy `transform`, `analyze`, `route`, and `send` types
   *   remain readable via this filter.
   * - `tags`: returns functions tagged with any of the supplied tags.
   * - `workflowIDs` / `workflowNames`: returns only functions referenced by the
   *   named workflows. Useful for "what functions does this workflow depend on?"
   *   lookups.
   *
   * ## Pagination
   *
   * Cursor-based with `startingAfter` and `endingBefore` (functionIDs). Default
   * limit 50, maximum 100.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const _function of client.functions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: FunctionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FunctionsFunctionsPage, Function> {
    return this._client.getAPIList('/v3/functions', FunctionsPage<Function>, { query, ...options });
  }

  /**
   * **Delete a function and every one of its versions.**
   *
   * Permanent. Running and queued calls that reference this function continue to
   * completion against the version they captured at call time, but no new calls can
   * target it.
   *
   * ## Before deleting
   *
   * Workflow nodes that reference this function will fail at call time after
   * deletion. List workflows that reference it first:
   *
   * ```
   * GET /v3/workflows?functionNames=my-function
   * ```
   *
   * Update or remove those workflows, or create a replacement function and re-point
   * the workflow nodes, before deleting.
   *
   * @example
   * ```ts
   * await client.functions.delete('functionName');
   * ```
   */
  delete(functionName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/functions/${functionName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * **Compare metrics between two function versions.**
   *
   * Computes aggregate and field-level lift/regression between any two versions of a
   * function: accuracy, precision, recall, F1, and PR-AUC. Field-level changes are
   * returned only for fields whose lift exceeds 1% in either direction.
   *
   * Supported for every function type that produces labeled transformations:
   * `extract`, `transform`, `analyze`, `join`. Pass `isRegression: true` to compare
   * only the regression dataset (rows produced by `POST /v3/functions/regression`) —
   * the canonical way to judge a candidate version before promoting it.
   *
   * Defaults: `baselineVersionNum = currentVersionNum - 1`,
   * `comparisonVersionNum = currentVersionNum`.
   *
   * @example
   * ```ts
   * const response = await client.functions.compareMetrics({
   *   functionName: 'invoice-extractor',
   *   baselineVersionNum: 2,
   *   comparisonVersionNum: 3,
   *   isRegression: true,
   * });
   * ```
   */
  compareMetrics(
    body: FunctionCompareMetricsParams,
    options?: RequestOptions,
  ): APIPromise<FunctionCompareMetricsResponse> {
    return this._client.post('/v3/functions/compare', { body, ...options });
  }

  /**
   * **Estimate human review requirements for a function.**
   *
   * Combines confusion-matrix metrics with the per-transformation evaluation scores
   * (confidence / hallucination / relevance produced by the eval service) to
   * compute:
   *
   * - A confidence-bucketed distribution of the function's outputs.
   * - Sample-size estimates at configurable margin-of-error and confidence levels
   *   (Wald or Wilson intervals).
   * - A precision-recall AUC and a per-threshold matrix you can use to pick a review
   *   cutoff.
   *
   * Supported for every function type that produces transformations and feeds the
   * auto-evaluation pipeline: `extract`, `transform`, `analyze`, `join`. Extract
   * works on both vision (PDF/PNG/JPEG/HEIC/HEIF/WebP) and OCR-routed inputs.
   *
   * Pass `isRegression: true` to scope the review to transformations created by a
   * previous regression run (see `POST /v3/functions/regression`).
   *
   * @example
   * ```ts
   * const response =
   *   await client.functions.estimateReviewRequirements({
   *     functionName: 'invoice-extractor',
   *     functionVersionNum: 2,
   *     isRegression: true,
   *     marginOfError: 0.05,
   *   });
   * ```
   */
  estimateReviewRequirements(
    body: FunctionEstimateReviewRequirementsParams,
    options?: RequestOptions,
  ): APIPromise<FunctionEstimateReviewRequirementsResponse> {
    return this._client.post('/v3/functions/review', { body, ...options });
  }

  /**
   * **Retrieve performance metrics for functions based on labeled transformation
   * data.**
   *
   * Calculates accuracy, precision, recall, F1, and the underlying confusion-matrix
   * counts for each matching function by comparing model outputs against user
   * corrections. Metrics are aggregated across every transformation the function has
   * produced, regardless of function type — `extract`, `transform`, `analyze`, and
   * `join` all populate the same `metrics` column on the transformation row, so v3
   * surfaces all of them uniformly.
   *
   * ## Filtering
   *
   * Combine `functionIDs` / `functionNames` / `types` to narrow the result set.
   * `types` accepts `extract` alongside the legacy `transform` / `analyze` types
   * (which remain readable). Pagination is cursor-based.
   *
   * ## Requirements
   *
   * A function only shows non-zero metrics once at least one of its transformations
   * has been labeled — submit corrections via `POST /v3/events/{eventID}/feedback`.
   *
   * @example
   * ```ts
   * const response = await client.functions.getMetrics();
   * ```
   */
  getMetrics(
    query: FunctionGetMetricsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FunctionGetMetricsResponse> {
    return this._client.get('/v3/functions/metrics', { query, ...options });
  }
}

export type FunctionsFunctionsPage = FunctionsPage<Function>;

export interface ClassificationListItem {
  name: string;

  description?: string;

  functionID?: string;

  functionName?: string;

  isErrorFallback?: boolean;

  origin?: ClassificationListItem.Origin;

  regex?: ClassificationListItem.Regex;
}

export namespace ClassificationListItem {
  export interface Origin {
    email?: Origin.Email;
  }

  export namespace Origin {
    export interface Email {
      patterns?: Array<string>;
    }
  }

  export interface Regex {
    patterns?: Array<string>;
  }
}

/**
 * V3 wire form of the classify function create payload.
 */
export type CreateFunction =
  | CreateFunction.ExtractFunction
  | CreateFunction.ClassifyFunction
  | CreateFunction.SendFunction
  | CreateFunction.SplitFunction
  | CreateFunction.JoinFunction
  | CreateFunction.PayloadShapingFunction
  | CreateFunction.EnrichFunction
  | CreateFunction.ParseFunction;

export namespace CreateFunction {
  export interface ExtractFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'extract';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Whether bounding box extraction is enabled. Applies to vision input types (pdf,
     * png, jpeg, heic, heif, webp) that dispatch through the analyze path. When true,
     * the function returns the document regions (page, coordinates) from which each
     * field was extracted. Enabling this automatically configures the function to use
     * the bounding box model. Disabling resets to the default.
     */
    enableBoundingBoxes?: boolean;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency. Compatible with `enableBoundingBoxes`.
     */
    preCount?: boolean;

    /**
     * Whether tabular chunking is enabled. When true, tables in CSV/Excel files are
     * processed in row batches rather than all at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  /**
   * V3 wire form of the classify function create payload.
   */
  export interface ClassifyFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'classify';

    /**
     * List of classifications a classify function can produce. Shares the underlying
     * route list shape.
     */
    classifications?: Array<FunctionsAPI.ClassificationListItem>;

    /**
     * Description of classifier. Can be used to provide additional context on
     * classifier's purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface SendFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'send';

    /**
     * Destination type for a Send function.
     */
    destinationType?: FunctionsAPI.SendDestinationType;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Google Drive folder ID. Required when destinationType is google_drive. Managed
     * via Paragon OAuth.
     */
    googleDriveFolderId?: string;

    /**
     * S3 bucket to upload the payload to. Required when destinationType is s3.
     */
    s3Bucket?: string;

    /**
     * Optional S3 key prefix (folder path).
     */
    s3Prefix?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * Whether to sign webhook deliveries with an HMAC-SHA256 `bem-signature` header.
     * Defaults to `true` when omitted — signing is on by default for new send
     * functions. Set explicitly to `false` to disable.
     */
    webhookSigningEnabled?: boolean;

    /**
     * Webhook URL to POST the payload to. Required when destinationType is webhook.
     */
    webhookUrl?: string;
  }

  export interface SplitFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'split';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    printPageSplitConfig?: SplitFunction.PrintPageSplitConfig;

    semanticPageSplitConfig?: SplitFunction.SemanticPageSplitConfig;

    splitType?: 'print_page' | 'semantic_page';

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace SplitFunction {
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;

      nextFunctionName?: string;
    }

    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface JoinFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'join';

    /**
     * Description of join function.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * The type of join to perform.
     */
    joinType?: 'standard';

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface PayloadShapingFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'payload_shaping';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * JMESPath expression that defines how to transform and customize the input
     * payload structure. Payload shaping allows you to extract, reshape, and
     * reorganize data from complex input payloads into a simplified, standardized
     * output format. Use JMESPath syntax to select specific fields, perform
     * calculations, and create new data structures tailored to your needs.
     */
    shapingSchema?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface EnrichFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'enrich';

    /**
     * Configuration for an enrich function.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions augment JSON input with data from external sources. They take
     * JSON input (typically from a previous function), extract specified fields, fetch
     * or search for matching data, and inject the results back into the JSON.
     *
     * **Data Sources:**
     *
     * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
     *   collection. Best for semantic matching against pre-indexed documents.
     * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
     *   Best for looking up live data from CRMs, ERPs, or other external systems.
     *   Optionally uses LLM agent reasoning to rank candidates returned by the
     *   endpoint.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically from a previous function's output)
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog collection
     * - Enrich customer data with account details from a CRM endpoint
     * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
     *   products
     *
     * **Configuration:**
     *
     * - Define named endpoints (for endpoint-source steps)
     * - Define one or more enrichment steps; steps are executed sequentially
     */
    config?: FunctionsAPI.EnrichConfig;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface ParseFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'parse';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    extraConfig?: ParseFunction.ExtraConfig;

    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: FunctionsAPI.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace ParseFunction {
    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    export interface ExtraConfig {
      /**
       * When true, return per-section and per-entity-mention coordinates in the parse
       * event's `fieldBoundingBoxes` map (same shape as Extract: JSON Pointer key →
       * array of `{page, left, top, width, height}` with coordinates normalized to [0,
       * 1]). Keys are `/sections/{N}` and `/entities/{N}/occurrences/{M}` into the parse
       * output. Only applies to the open-ended discovery path (no `schema`) and to
       * vision input types. Bedrock-backed parse functions silently return an empty map
       * (no native bbox support). Defaults to false.
       */
      enableBoundingBoxes?: boolean;
    }
  }
}

/**
 * Configuration for an enrich function.
 *
 * **How Enrich Functions Work:**
 *
 * Enrich functions augment JSON input with data from external sources. They take
 * JSON input (typically from a previous function), extract specified fields, fetch
 * or search for matching data, and inject the results back into the JSON.
 *
 * **Data Sources:**
 *
 * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
 *   collection. Best for semantic matching against pre-indexed documents.
 * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
 *   Best for looking up live data from CRMs, ERPs, or other external systems.
 *   Optionally uses LLM agent reasoning to rank candidates returned by the
 *   endpoint.
 *
 * **Input Requirements:**
 *
 * - Must receive JSON input (typically from a previous function's output)
 *
 * **Example Use Cases:**
 *
 * - Match product descriptions to SKU codes from a product catalog collection
 * - Enrich customer data with account details from a CRM endpoint
 * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
 *   products
 *
 * **Configuration:**
 *
 * - Define named endpoints (for endpoint-source steps)
 * - Define one or more enrichment steps; steps are executed sequentially
 */
export interface EnrichConfig {
  /**
   * Array of enrichment steps to execute sequentially.
   */
  steps: Array<EnrichStep>;

  /**
   * Named HTTP endpoints available to endpoint-source steps. Each endpoint must have
   * a unique `name` referenced by the step's `endpointName`. Required when any step
   * uses `source: "endpoint"`.
   */
  endpoints?: Array<EnrichConfig.Endpoint>;
}

export namespace EnrichConfig {
  /**
   * A named HTTP endpoint that an enrich step can call to fetch enrichment data.
   *
   * The platform makes one request per extracted source value, substituting the
   * value as a query parameter or body template placeholder. The raw response (or
   * the sub-value selected by `responsePath`) is injected into the output, or passed
   * to LLM agent reasoning when `matchInstructions` is set.
   *
   * **Request formats:**
   *
   * - `GET`: Appends `?{queryParam}={value}` to the URL.
   * - `POST`: Sends `bodyTemplate` as the request body, replacing `{value}` with the
   *   extracted value.
   */
  export interface Endpoint {
    /**
     * HTTP method to use.
     */
    method: 'GET' | 'POST';

    /**
     * Unique name for this endpoint, referenced by enrichStep.endpointName.
     */
    name: string;

    /**
     * Full URL of the endpoint (must be http:// or https://).
     */
    url: string;

    /**
     * JSON body template for POST requests. **Required for POST endpoints.** Must
     * contain the `{value}` placeholder, which is replaced with the extracted source
     * value at runtime.
     *
     * Example: `bodyTemplate: "{\"query\": \"{value}\", \"limit\": 10}"`
     */
    bodyTemplate?: string;

    /**
     * Additional HTTP headers to include in every request (e.g.
     * `Authorization: Bearer <token>`).
     */
    headers?: unknown;

    /**
     * Natural-language instructions for LLM agent reasoning.
     *
     * When set, the candidates fetched from the endpoint are passed to an LLM with
     * these instructions, which selects the best match(es) and returns them with
     * confidence scores. Each injected result has the shape
     * `{ data, confidence, reasoning? }`.
     *
     * When omitted, the raw fetched value is injected without any LLM involvement.
     */
    matchInstructions?: string;

    /**
     * Maximum number of ranked matches to return per source value when
     * `matchInstructions` is set (default: 1). Ignored when `matchInstructions` is
     * empty.
     */
    matchTopK?: number;

    /**
     * LLM batch size during agent reasoning (default: 50). All candidates — across all
     * fetched pages — are scored in batches of this size. Smaller values reduce
     * per-call token usage; larger values mean fewer LLM calls. Ignored when
     * `matchInstructions` is empty.
     */
    maxCandidates?: number;

    /**
     * Maximum number of pages to fetch (default: 10). Acts as a safety cap against
     * infinite pagination loops when the server never returns an empty cursor.
     */
    maxPages?: number;

    /**
     * Query parameter name used to pass the cursor on subsequent GET requests, or the
     * `{placeholder}` name used in the POST `bodyTemplate` (e.g. `"cursor"`,
     * `"pageToken"`, `"offset"`).
     *
     * Must be set together with `nextPagePath`.
     */
    nextPageParam?: string;

    /**
     * JMESPath expression applied to each raw response to extract the cursor or token
     * for the next page (e.g. `"nextCursor"`, `"pagination.nextToken"`). An absent,
     * null, or empty-string result stops pagination. Both string and numeric values
     * are supported — numbers are converted to their decimal string representation
     * before being forwarded as a query parameter.
     *
     * Must be set together with `nextPageParam`.
     *
     * **Supported pagination styles:**
     *
     * - **Cursor/token-based** — server returns an opaque token in the response body
     *   (e.g. `{"nextCursor": "abc123"}`). Set `nextPagePath: "nextCursor"` and the
     *   platform forwards it verbatim on the next request.
     * - **Server-computed offset/page** — server echoes back the next offset or page
     *   number in the response body (e.g. `{"nextOffset": 50}` or `{"nextPage": 2}`).
     *   Set `nextPagePath: "nextOffset"` and the platform forwards the value as-is.
     *
     * **Not supported:**
     *
     * - **Client-computed offset** — APIs where the client must compute
     *   `offset += limit` itself (e.g. `?offset=0&limit=50` with no next-offset in the
     *   response). Workaround: ask the API provider to return the next offset in the
     *   response body, or bake a fixed page size into the URL and use a server-side
     *   cursor instead.
     * - **Client-computed page number** — APIs where the client increments `?page=N`
     *   itself with no next-page value in the response. Same workaround applies.
     * - **Link header** — `Link: <url>; rel="next"` in HTTP response headers. The
     *   platform only inspects the response body.
     */
    nextPagePath?: string;

    /**
     * Query parameter name used to pass the extracted source value. **Required for GET
     * endpoints.** The value is URL-encoded and appended as
     * `?{queryParam}={sourceValue}`.
     *
     * Example: `queryParam: "q"` → `GET /products?q=blue+widget`
     */
    queryParam?: string;

    /**
     * JMESPath expression applied to the response body to extract the enrichment
     * value. Omit to use the entire response body as the result.
     *
     * **For agent reasoning:** use a wildcard projection (e.g. `items[*]` or
     * `results[*].data`) so the endpoint's list of candidates is flattened into an
     * array before being passed to the LLM. A non-wildcard path (e.g. `data.product`)
     * extracts a single value treated as one candidate.
     *
     * **Response size:** the platform reads at most 50 MB of the response body before
     * decoding, regardless of the Content-Length header.
     */
    responsePath?: string;
  }
}

/**
 * Single enrichment step configuration.
 *
 * **Process Flow (collection source):**
 *
 * 1. Extract values from `sourceField` using JMESPath
 * 2. Perform search against the specified collection (semantic, exact, or hybrid
 *    based on `searchMode`)
 * 3. Return top K matches sorted by relevance (best match first)
 * 4. Inject results into `targetField`
 *
 * **Process Flow (endpoint source):**
 *
 * 1. Extract values from `sourceField` using JMESPath
 * 2. Call the named endpoint once per extracted value, following pagination if
 *    `nextPagePath`/`nextPageParam` are configured on the endpoint
 * 3. Optionally apply LLM agent reasoning to rank candidates
 *    (`matchInstructions`), batching across all fetched pages in groups of
 *    `maxCandidates`
 * 4. Inject results into `targetField`
 *
 * **Collection Search Modes** (`source: "collection"` only):
 *
 * - `semantic` (default): Vector similarity search — best for natural language and
 *   conceptual matching
 * - `exact`: Exact keyword matching — best for SKU numbers, IDs, routing numbers
 * - `hybrid`: Combined semantic + keyword search — best for tags and categories
 *
 * **Result Format (collection source):**
 *
 * - Always an array sorted by relevance (best match first)
 * - Each element: `{ data, cosineDistance? }` or `{ data, hybridScore? }`
 *
 * **Result Format (endpoint source, no matchInstructions):**
 *
 * - Always an array; the raw fetched value is the single element
 *
 * **Result Format (endpoint source, with matchInstructions):**
 *
 * - Array of LLM-ranked matches: `[{ data, confidence, reasoning? }, ...]`
 * - Length capped by `enrichEndpoint.matchTopK` (default 1)
 */
export interface EnrichStep {
  /**
   * JMESPath expression to extract source data. Can extract a single value or an
   * array. Each extracted value is looked up independently.
   */
  sourceField: string;

  /**
   * Field path where enriched results should be placed. Use simple field names
   * (e.g., "enriched_products"). Results are always injected as an array (list),
   * regardless of topK value.
   */
  targetField: string;

  /**
   * Name of the collection to search against. Required when `source` is
   * `"collection"`. The collection must exist and contain items. Supports
   * hierarchical paths when used with `includeSubcollections`.
   */
  collectionName?: string;

  /**
   * Name of an endpoint defined in `enrichConfig.endpoints`. Required when `source`
   * is `"endpoint"`.
   */
  endpointName?: string;

  /**
   * Whether to include cosine distance scores in results. Cosine distance ranges
   * from 0.0 (perfect match) to 2.0 (completely dissimilar). Lower scores indicate
   * better semantic similarity.
   *
   * When enabled, each result includes a `cosine_distance` field (semantic mode) or
   * a `hybrid_score` field (hybrid mode).
   */
  includeScore?: boolean;

  /**
   * When true, searches all collections under the hierarchical path. For example,
   * "customers" will match "customers", "customers.premium", etc.
   */
  includeSubcollections?: boolean;

  /**
   * Maximum cosine distance threshold for filtering results (default: 0.6). Results
   * with cosine distance above this threshold are excluded.
   *
   * **Only applies to `semantic` and `hybrid` search modes.** Exact search does not
   * use cosine distance and ignores this setting.
   *
   * Cosine distance ranges from 0.0 (identical) to 2.0 (opposite):
   *
   * - 0.0 - 0.3: Very similar (strict threshold, high-quality matches only)
   * - 0.3 - 0.6: Reasonably similar (moderate threshold)
   * - 0.6 - 1.0: Loosely related (lenient threshold)
   * - > 1.0: Rarely useful — allows nearly unrelated results
   *
   * For most semantic search use cases, good matches typically fall in the 0.2 - 0.5
   * range.
   */
  scoreThreshold?: number;

  /**
   * Search mode to use for enrichment (default: "semantic").
   *
   * **semantic**: Vector similarity search using dense embeddings. Best for finding
   * conceptually similar items.
   *
   * - Use for: Product descriptions, natural language content
   * - Example: "red sports car" matches "crimson convertible automobile"
   *
   * **exact**: Exact keyword matching using PostgreSQL text search. Best for exact
   * identifiers.
   *
   * - Use for: SKU numbers, routing numbers, account IDs, exact tags
   * - Example: "SKU-12345" only matches items containing that exact text
   *
   * **hybrid**: Combined search using 20% semantic + 80% sparse embeddings
   * (keyword-based).
   *
   * - Use for: Tags, categories, partial identifiers
   * - Example: Balances semantic meaning with exact keyword matching
   */
  searchMode?: 'semantic' | 'exact' | 'hybrid';

  /**
   * Where to fetch enrichment data from (default: `"collection"`).
   *
   * - `"collection"`: Vector/keyword search against a BEM collection. Requires
   *   `collectionName`.
   * - `"endpoint"`: HTTP call to a named endpoint defined in
   *   `enrichConfig.endpoints`. Requires `endpointName`.
   */
  source?: 'collection' | 'endpoint';

  /**
   * Number of top matching results to return per query (default: 1). Results are
   * always returned as an array (list) and automatically sorted by cosine distance
   * (best match = lowest distance first).
   *
   * - 1: Returns array with single best match: `[{...}]`
   * - > 1: Returns array with multiple matches: `[{...}, {...}, ...]`
   */
  topK?: number;
}

/**
 * V3 read-side union. Same shape as the shared `Function` union but with
 * `classify` in place of `route`. Legacy `transform` and `analyze` functions
 * remain readable via V3.
 */
export type Function =
  | Function.TransformFunction
  | Function.ExtractFunction
  | Function.AnalyzeFunction
  | Function.ClassifyFunction
  | Function.SendFunction
  | Function.SplitFunction
  | Function.JoinFunction
  | Function.PayloadShapingFunction
  | Function.EnrichFunction
  | Function.ParseFunction;

export namespace Function {
  export interface TransformFunction {
    /**
     * Email address automatically created by bem. You can forward emails with or
     * without attachments, to be transformed.
     */
    emailAddress: string;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName: string;

    /**
     * Whether tabular chunking is enabled on the pipeline. This processes tables in
     * CSV/Excel in row batches, rather than all rows at once.
     */
    tabularChunkingEnabled: boolean;

    type: 'transform';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  /**
   * A function that extracts structured JSON from documents and images. Accepts a
   * wide range of input types including PDFs, images, spreadsheets, emails, and
   * more.
   */
  export interface ExtractFunction {
    /**
     * Whether bounding box extraction is enabled. Applies to vision input types (pdf,
     * png, jpeg, heic, heif, webp) that dispatch through the analyze path. When true,
     * the function returns the document regions (page, coordinates) from which each
     * field was extracted.
     */
    enableBoundingBoxes: boolean;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency.
     */
    preCount: boolean;

    type: 'extract';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export interface AnalyzeFunction {
    /**
     * Whether bounding box extraction is enabled. Only applicable to analyze and
     * extract functions. When true, the function returns the document regions (page,
     * coordinates) from which each field was extracted.
     */
    enableBoundingBoxes: boolean;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency.
     */
    preCount: boolean;

    type: 'analyze';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export interface ClassifyFunction {
    /**
     * List of classifications a classify function can produce. Shares the underlying
     * route list shape.
     */
    classifications: Array<FunctionsAPI.ClassificationListItem>;

    /**
     * Description of classifier. Can be used to provide additional context on
     * classifier's purpose and expected inputs.
     */
    description: string;

    /**
     * Email address automatically created by bem. You can forward emails with or
     * without attachments, to be classified.
     */
    emailAddress: string;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'classify';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  /**
   * A function that delivers workflow outputs to an external destination. Send
   * functions receive the output of an upstream workflow node and forward it to a
   * webhook, S3 bucket, or Google Drive folder.
   */
  export interface SendFunction {
    /**
     * Destination type for a Send function.
     */
    destinationType: FunctionsAPI.SendDestinationType;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'send';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Google Drive folder ID. Present when destinationType is google_drive. Managed
     * via Paragon OAuth.
     */
    googleDriveFolderId?: string;

    /**
     * S3 bucket to upload the payload to. Present when destinationType is s3.
     */
    s3Bucket?: string;

    /**
     * S3 key prefix (folder path). Optional, present when destinationType is s3.
     */
    s3Prefix?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;

    /**
     * Whether webhook payloads are signed with an HMAC-SHA256 `bem-signature` header.
     */
    webhookSigningEnabled?: boolean;

    /**
     * Webhook URL to POST the payload to. Present when destinationType is webhook.
     */
    webhookUrl?: string;
  }

  export interface SplitFunction {
    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * The method used to split pages.
     */
    splitType: 'print_page' | 'semantic_page';

    type: 'split';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Configuration for print page splitting.
     */
    printPageSplitConfig?: SplitFunction.PrintPageSplitConfig;

    /**
     * Configuration for semantic page splitting.
     */
    semanticPageSplitConfig?: SplitFunction.SemanticPageSplitConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export namespace SplitFunction {
    /**
     * Configuration for print page splitting.
     */
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;
    }

    /**
     * Configuration for semantic page splitting.
     */
    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface JoinFunction {
    /**
     * Description of join function.
     */
    description: string;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * The type of join to perform.
     */
    joinType: 'standard';

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName: string;

    type: 'join';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  /**
   * A function that transforms and customizes input payloads using JMESPath
   * expressions. Payload shaping allows you to extract specific data, perform
   * calculations, and reshape complex input structures into simplified, standardized
   * output formats tailored to your downstream systems or business requirements.
   */
  export interface PayloadShapingFunction {
    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    /**
     * JMESPath expression that defines how to transform and customize the input
     * payload structure. Payload shaping allows you to extract, reshape, and
     * reorganize data from complex input payloads into a simplified, standardized
     * output format. Use JMESPath syntax to select specific fields, perform
     * calculations, and create new data structures tailored to your needs.
     */
    shapingSchema: string;

    type: 'payload_shaping';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export interface EnrichFunction {
    /**
     * Configuration for an enrich function.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions augment JSON input with data from external sources. They take
     * JSON input (typically from a previous function), extract specified fields, fetch
     * or search for matching data, and inject the results back into the JSON.
     *
     * **Data Sources:**
     *
     * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
     *   collection. Best for semantic matching against pre-indexed documents.
     * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
     *   Best for looking up live data from CRMs, ERPs, or other external systems.
     *   Optionally uses LLM agent reasoning to rank candidates returned by the
     *   endpoint.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically from a previous function's output)
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog collection
     * - Enrich customer data with account details from a CRM endpoint
     * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
     *   products
     *
     * **Configuration:**
     *
     * - Define named endpoints (for endpoint-source steps)
     * - Define one or more enrichment steps; steps are executed sequentially
     */
    config: FunctionsAPI.EnrichConfig;

    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'enrich';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export interface ParseFunction {
    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'parse';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    extraConfig?: ParseFunction.ExtraConfig;

    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: FunctionsAPI.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export namespace ParseFunction {
    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    export interface ExtraConfig {
      /**
       * When true, return per-section and per-entity-mention coordinates in the parse
       * event's `fieldBoundingBoxes` map (same shape as Extract: JSON Pointer key →
       * array of `{page, left, top, width, height}` with coordinates normalized to [0,
       * 1]). Keys are `/sections/{N}` and `/entities/{N}/occurrences/{M}` into the parse
       * output. Only applies to the open-ended discovery path (no `schema`) and to
       * vision input types. Bedrock-backed parse functions silently return an empty map
       * (no native bbox support). Defaults to false.
       */
      enableBoundingBoxes?: boolean;
    }
  }
}

export interface FunctionAudit {
  /**
   * Information about who created the function.
   */
  functionCreatedBy?: UserActionSummary;

  /**
   * Information about who last updated the function.
   */
  functionLastUpdatedBy?: UserActionSummary;

  /**
   * Information about who created the current version.
   */
  versionCreatedBy?: UserActionSummary;
}

/**
 * Single-function response wrapper used by V3 function endpoints. V3 wraps
 * individual function responses in a `{"function": ...}` envelope for consistency
 * with other V3 resource endpoints.
 */
export interface FunctionResponse {
  /**
   * V3 read-side union. Same shape as the shared `Function` union but with
   * `classify` in place of `route`. Legacy `transform` and `analyze` functions
   * remain readable via V3.
   */
  function: Function;
}

/**
 * The type of the function.
 */
export type FunctionType =
  | 'transform'
  | 'extract'
  | 'route'
  | 'classify'
  | 'send'
  | 'split'
  | 'join'
  | 'analyze'
  | 'payload_shaping'
  | 'enrich'
  | 'parse';

export interface ListFunctionsResponse {
  functions?: Array<Function>;

  /**
   * The total number of results available.
   */
  totalCount?: number;
}

/**
 * Per-version configuration for a Parse function.
 *
 * Parse renders document pages (PDF, image) via vision LLM and emits structured
 * JSON. The two toggles below independently control entity extraction (a per-call
 * output concern) and cross-document memory linking (an environment-wide concern).
 */
export interface ParseConfig {
  /**
   * Optional bucket NAME that parse-extracted entities land in when no call-level
   * bucket is supplied. Lower precedence than a call-level bucket, higher than the
   * account+environment default.
   */
  defaultBucket?: string;

  /**
   * When true, extract named entities (people, organizations, products, studies,
   * identifiers, etc.) and the relationships between them, and dedupe by canonical
   * name within the document. When false, only `sections[]` is extracted;
   * `entities[]` and `relationships[]` come back empty in the parse output. Defaults
   * to true.
   */
  extractEntities?: boolean;

  /**
   * When true, link this document's entities to entities seen in earlier documents
   * in this environment, building one canonical record per real-world thing across
   * the corpus. Visible in the Memory tab and queryable via `POST /v3/fs` (op=find /
   * open / xref). Doesn't change this call's parse output. Requires
   * `extractEntities=true`. Defaults to true.
   */
  linkAcrossDocuments?: boolean;

  /**
   * Optional JSONSchema. When provided, each chunk performs schema-guided
   * extraction. When absent, chunks perform open-ended discovery and return
   * sections, entities, and relationships per the discovery schema.
   */
  schema?: unknown;
}

/**
 * Destination type for a Send function.
 */
export type SendDestinationType = 'webhook' | 's3' | 'google_drive';

export interface SplitFunctionSemanticPageItemClass {
  name: string;

  description?: string;

  /**
   * The unique ID of the function you want to use for this item class.
   */
  nextFunctionID?: string;

  /**
   * The unique name of the function you want to use for this item class.
   */
  nextFunctionName?: string;
}

/**
 * V3 create/update variants of the shared function payloads.
 *
 * The V3 Functions API no longer accepts the legacy `transform` or `analyze`
 * function types when creating new functions or updating existing ones — both have
 * been unified under `extract`. Existing functions of those types remain readable
 * and callable via V3, so the V3 read-side unions still include `transform` and
 * `analyze` variants.
 *
 * The V3 API also exposes `classify` in place of the legacy `route` type on
 * create/update, with `classifications` in place of `routes`. Read-side
 * `ClassifyFunction` / `ClassifyFunctionVersion` / `ClassificationList` are
 * defined in the shared functions models and used by both the V2 and V3 response
 * unions (existing classify functions are returned from V2 GET endpoints
 * verbatim).V3 wire form of the classify function upsert payload.
 */
export type UpdateFunction =
  | UpdateFunction.ExtractFunction
  | UpdateFunction.ClassifyFunction
  | UpdateFunction.SendFunction
  | UpdateFunction.SplitFunction
  | UpdateFunction.JoinFunction
  | UpdateFunction.PayloadShapingFunction
  | UpdateFunction.UpsertEnrichFunction
  | UpdateFunction.ParseFunction;

export namespace UpdateFunction {
  export interface ExtractFunction {
    type: 'extract';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Whether bounding box extraction is enabled. Applies to vision input types (pdf,
     * png, jpeg, heic, heif, webp) that dispatch through the analyze path. When true,
     * the function returns the document regions (page, coordinates) from which each
     * field was extracted. Enabling this automatically configures the function to use
     * the bounding box model. Disabling resets to the default.
     */
    enableBoundingBoxes?: boolean;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency. Compatible with `enableBoundingBoxes`.
     */
    preCount?: boolean;

    /**
     * Whether tabular chunking is enabled. When true, tables in CSV/Excel files are
     * processed in row batches rather than all at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  /**
   * V3 create/update variants of the shared function payloads.
   *
   * The V3 Functions API no longer accepts the legacy `transform` or `analyze`
   * function types when creating new functions or updating existing ones — both have
   * been unified under `extract`. Existing functions of those types remain readable
   * and callable via V3, so the V3 read-side unions still include `transform` and
   * `analyze` variants.
   *
   * The V3 API also exposes `classify` in place of the legacy `route` type on
   * create/update, with `classifications` in place of `routes`. Read-side
   * `ClassifyFunction` / `ClassifyFunctionVersion` / `ClassificationList` are
   * defined in the shared functions models and used by both the V2 and V3 response
   * unions (existing classify functions are returned from V2 GET endpoints
   * verbatim).V3 wire form of the classify function upsert payload.
   */
  export interface ClassifyFunction {
    type: 'classify';

    /**
     * List of classifications a classify function can produce. Shares the underlying
     * route list shape.
     */
    classifications?: Array<FunctionsAPI.ClassificationListItem>;

    /**
     * Description of classifier. Can be used to provide additional context on
     * classifier's purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface SendFunction {
    type: 'send';

    /**
     * Destination type for a Send function.
     */
    destinationType?: FunctionsAPI.SendDestinationType;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Google Drive folder ID. Required when destinationType is google_drive. Managed
     * via Paragon OAuth.
     */
    googleDriveFolderId?: string;

    /**
     * S3 bucket to upload the payload to. Required when destinationType is s3.
     */
    s3Bucket?: string;

    /**
     * Optional S3 key prefix (folder path).
     */
    s3Prefix?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * Whether to sign webhook deliveries with an HMAC-SHA256 `bem-signature` header.
     * Defaults to `true` when omitted — signing is on by default for new send
     * functions. Set explicitly to `false` to disable.
     */
    webhookSigningEnabled?: boolean;

    /**
     * Webhook URL to POST the payload to. Required when destinationType is webhook.
     */
    webhookUrl?: string;
  }

  export interface SplitFunction {
    type: 'split';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    printPageSplitConfig?: SplitFunction.PrintPageSplitConfig;

    semanticPageSplitConfig?: SplitFunction.SemanticPageSplitConfig;

    splitType?: 'print_page' | 'semantic_page';

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace SplitFunction {
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;

      nextFunctionName?: string;
    }

    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface JoinFunction {
    type: 'join';

    /**
     * Description of join function.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * The type of join to perform.
     */
    joinType?: 'standard';

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  /**
   * A function that transforms and customizes input payloads using JMESPath
   * expressions. Payload shaping allows you to extract specific data, perform
   * calculations, and reshape complex input structures into simplified, standardized
   * output formats tailored to your downstream systems or business requirements.
   */
  export interface PayloadShapingFunction {
    type: 'payload_shaping';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * JMESPath expression that defines how to transform and customize the input
     * payload structure. Payload shaping allows you to extract, reshape, and
     * reorganize data from complex input payloads into a simplified, standardized
     * output format. Use JMESPath syntax to select specific fields, perform
     * calculations, and create new data structures tailored to your needs.
     */
    shapingSchema?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertEnrichFunction {
    type: 'enrich';

    /**
     * Configuration for an enrich function.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions augment JSON input with data from external sources. They take
     * JSON input (typically from a previous function), extract specified fields, fetch
     * or search for matching data, and inject the results back into the JSON.
     *
     * **Data Sources:**
     *
     * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
     *   collection. Best for semantic matching against pre-indexed documents.
     * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
     *   Best for looking up live data from CRMs, ERPs, or other external systems.
     *   Optionally uses LLM agent reasoning to rank candidates returned by the
     *   endpoint.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically from a previous function's output)
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog collection
     * - Enrich customer data with account details from a CRM endpoint
     * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
     *   products
     *
     * **Configuration:**
     *
     * - Define named endpoints (for endpoint-source steps)
     * - Define one or more enrichment steps; steps are executed sequentially
     */
    config?: FunctionsAPI.EnrichConfig;
  }

  export interface ParseFunction {
    type: 'parse';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    extraConfig?: ParseFunction.ExtraConfig;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: FunctionsAPI.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace ParseFunction {
    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    export interface ExtraConfig {
      /**
       * When true, return per-section and per-entity-mention coordinates in the parse
       * event's `fieldBoundingBoxes` map (same shape as Extract: JSON Pointer key →
       * array of `{page, left, top, width, height}` with coordinates normalized to [0,
       * 1]). Keys are `/sections/{N}` and `/entities/{N}/occurrences/{M}` into the parse
       * output. Only applies to the open-ended discovery path (no `schema`) and to
       * vision input types. Bedrock-backed parse functions silently return an empty map
       * (no native bbox support). Defaults to false.
       */
      enableBoundingBoxes?: boolean;
    }
  }
}

export interface UserActionSummary {
  /**
   * The date and time the action was created.
   */
  createdAt: string;

  /**
   * Unique identifier of the user action.
   */
  userActionID: string;

  /**
   * API key name. Present for API key-initiated actions.
   */
  apiKeyName?: string;

  /**
   * Email address. Present for email-initiated actions.
   */
  emailAddress?: string;

  /**
   * User's email address. Present for user-initiated actions.
   */
  userEmail?: string;

  /**
   * User's ID. Present for user-initiated actions.
   */
  userID?: string;
}

export interface WorkflowUsageInfo {
  /**
   * Current version number of workflow, provided for reference - compare to
   * usedInWorkflowVersionNums to see whether the current version of the workflow
   * uses this function version.
   */
  currentVersionNum: number;

  /**
   * Version numbers of workflows that this function version is used in.
   */
  usedInWorkflowVersionNums: Array<number>;

  /**
   * Unique identifier of workflow.
   */
  workflowID: string;

  /**
   * Name of workflow.
   */
  workflowName: string;
}

/**
 * **Response containing metrics comparison between two function versions**
 *
 * Shows absolute differences, lift percentages, and field-level changes.
 */
export interface FunctionCompareMetricsResponse {
  /**
   * Baseline version number used for comparison
   */
  baselineVersionNum: number;

  /**
   * Comparison version number
   */
  comparisonVersionNum: number;

  /**
   * Name of the compared function
   */
  functionName: string;

  /**
   * Comparison of metrics between two versions
   */
  aggregateComparison?: FunctionCompareMetricsResponse.AggregateComparison;

  /**
   * Detailed performance metrics and analysis
   */
  baselineMetrics?: FunctionCompareMetricsResponse.BaselineMetrics;

  /**
   * Number of transformations used to calculate baseline metrics
   */
  baselineTransformationCount?: number;

  /**
   * Detailed performance metrics and analysis
   */
  comparisonMetrics?: FunctionCompareMetricsResponse.ComparisonMetrics;

  /**
   * Number of transformations used to calculate comparison metrics
   */
  comparisonTransformationCount?: number;

  /**
   * **Field-level metrics that changed significantly**
   *
   * Only includes fields where metrics changed by more than 1%.
   */
  fieldMetricsChanges?: Array<FunctionCompareMetricsResponse.FieldMetricsChange>;

  /**
   * Optional message with additional details
   */
  message?: string;
}

export namespace FunctionCompareMetricsResponse {
  /**
   * Comparison of metrics between two versions
   */
  export interface AggregateComparison {
    /**
     * Comparison of a single metric between two versions
     */
    accuracy?: AggregateComparison.Accuracy;

    /**
     * Comparison of a single metric between two versions
     */
    f1Score?: AggregateComparison.F1Score;

    /**
     * Comparison of a single metric between two versions
     */
    precision?: AggregateComparison.Precision;

    /**
     * Comparison of a single metric between two versions
     */
    recall?: AggregateComparison.Recall;
  }

  export namespace AggregateComparison {
    /**
     * Comparison of a single metric between two versions
     */
    export interface Accuracy {
      /**
       * Value in baseline version (null if not available)
       */
      baselineValue?: number | null;

      /**
       * Value in comparison version (null if not available)
       */
      comparisonValue?: number | null;

      /**
       * Absolute difference (comparisonValue - baselineValue)
       */
      difference?: number | null;

      /**
       * **Percentage change from baseline to comparison**
       *
       * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
       *
       * - Positive values indicate improvement
       * - Negative values indicate regression
       */
      liftPercent?: number | null;
    }

    /**
     * Comparison of a single metric between two versions
     */
    export interface F1Score {
      /**
       * Value in baseline version (null if not available)
       */
      baselineValue?: number | null;

      /**
       * Value in comparison version (null if not available)
       */
      comparisonValue?: number | null;

      /**
       * Absolute difference (comparisonValue - baselineValue)
       */
      difference?: number | null;

      /**
       * **Percentage change from baseline to comparison**
       *
       * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
       *
       * - Positive values indicate improvement
       * - Negative values indicate regression
       */
      liftPercent?: number | null;
    }

    /**
     * Comparison of a single metric between two versions
     */
    export interface Precision {
      /**
       * Value in baseline version (null if not available)
       */
      baselineValue?: number | null;

      /**
       * Value in comparison version (null if not available)
       */
      comparisonValue?: number | null;

      /**
       * Absolute difference (comparisonValue - baselineValue)
       */
      difference?: number | null;

      /**
       * **Percentage change from baseline to comparison**
       *
       * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
       *
       * - Positive values indicate improvement
       * - Negative values indicate regression
       */
      liftPercent?: number | null;
    }

    /**
     * Comparison of a single metric between two versions
     */
    export interface Recall {
      /**
       * Value in baseline version (null if not available)
       */
      baselineValue?: number | null;

      /**
       * Value in comparison version (null if not available)
       */
      comparisonValue?: number | null;

      /**
       * Absolute difference (comparisonValue - baselineValue)
       */
      difference?: number | null;

      /**
       * **Percentage change from baseline to comparison**
       *
       * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
       *
       * - Positive values indicate improvement
       * - Negative values indicate regression
       */
      liftPercent?: number | null;
    }
  }

  /**
   * Detailed performance metrics and analysis
   */
  export interface BaselineMetrics {
    /**
     * Comprehensive performance metrics
     */
    aggregateMetrics?: BaselineMetrics.AggregateMetrics;

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    fieldMetrics?: Array<BaselineMetrics.FieldMetric>;

    /**
     * Area Under the Precision-Recall Curve
     */
    precisionRecallAuc?: number;
  }

  export namespace BaselineMetrics {
    /**
     * Comprehensive performance metrics
     */
    export interface AggregateMetrics {
      /**
       * Overall accuracy
       */
      accuracy?: number | null;

      /**
       * F1 Score (harmonic mean of precision and recall)
       */
      f1Score?: number | null;

      /**
       * False Negatives
       */
      fn?: number;

      /**
       * False Positives
       */
      fp?: number;

      /**
       * Precision (TP / (TP + FP))
       */
      precision?: number | null;

      /**
       * Recall (TP / (TP + FN))
       */
      recall?: number | null;

      /**
       * True Negatives
       */
      tn?: number;

      /**
       * True Positives
       */
      tp?: number;
    }

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    export interface FieldMetric {
      /**
       * JSON path to the field
       */
      fieldPath: string;

      /**
       * Comprehensive performance metrics
       */
      metrics?: FieldMetric.Metrics;
    }

    export namespace FieldMetric {
      /**
       * Comprehensive performance metrics
       */
      export interface Metrics {
        /**
         * Overall accuracy
         */
        accuracy?: number | null;

        /**
         * F1 Score (harmonic mean of precision and recall)
         */
        f1Score?: number | null;

        /**
         * False Negatives
         */
        fn?: number;

        /**
         * False Positives
         */
        fp?: number;

        /**
         * Precision (TP / (TP + FP))
         */
        precision?: number | null;

        /**
         * Recall (TP / (TP + FN))
         */
        recall?: number | null;

        /**
         * True Negatives
         */
        tn?: number;

        /**
         * True Positives
         */
        tp?: number;
      }
    }
  }

  /**
   * Detailed performance metrics and analysis
   */
  export interface ComparisonMetrics {
    /**
     * Comprehensive performance metrics
     */
    aggregateMetrics?: ComparisonMetrics.AggregateMetrics;

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    fieldMetrics?: Array<ComparisonMetrics.FieldMetric>;

    /**
     * Area Under the Precision-Recall Curve
     */
    precisionRecallAuc?: number;
  }

  export namespace ComparisonMetrics {
    /**
     * Comprehensive performance metrics
     */
    export interface AggregateMetrics {
      /**
       * Overall accuracy
       */
      accuracy?: number | null;

      /**
       * F1 Score (harmonic mean of precision and recall)
       */
      f1Score?: number | null;

      /**
       * False Negatives
       */
      fn?: number;

      /**
       * False Positives
       */
      fp?: number;

      /**
       * Precision (TP / (TP + FP))
       */
      precision?: number | null;

      /**
       * Recall (TP / (TP + FN))
       */
      recall?: number | null;

      /**
       * True Negatives
       */
      tn?: number;

      /**
       * True Positives
       */
      tp?: number;
    }

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    export interface FieldMetric {
      /**
       * JSON path to the field
       */
      fieldPath: string;

      /**
       * Comprehensive performance metrics
       */
      metrics?: FieldMetric.Metrics;
    }

    export namespace FieldMetric {
      /**
       * Comprehensive performance metrics
       */
      export interface Metrics {
        /**
         * Overall accuracy
         */
        accuracy?: number | null;

        /**
         * F1 Score (harmonic mean of precision and recall)
         */
        f1Score?: number | null;

        /**
         * False Negatives
         */
        fn?: number;

        /**
         * False Positives
         */
        fp?: number;

        /**
         * Precision (TP / (TP + FP))
         */
        precision?: number | null;

        /**
         * Recall (TP / (TP + FN))
         */
        recall?: number | null;

        /**
         * True Negatives
         */
        tn?: number;

        /**
         * True Positives
         */
        tp?: number;
      }
    }
  }

  /**
   * Comparison of field-level metrics
   */
  export interface FieldMetricsChange {
    /**
     * Comparison of metrics between two versions
     */
    comparison: FieldMetricsChange.Comparison;

    /**
     * JSON pointer path to the field
     */
    fieldPath: string;
  }

  export namespace FieldMetricsChange {
    /**
     * Comparison of metrics between two versions
     */
    export interface Comparison {
      /**
       * Comparison of a single metric between two versions
       */
      accuracy?: Comparison.Accuracy;

      /**
       * Comparison of a single metric between two versions
       */
      f1Score?: Comparison.F1Score;

      /**
       * Comparison of a single metric between two versions
       */
      precision?: Comparison.Precision;

      /**
       * Comparison of a single metric between two versions
       */
      recall?: Comparison.Recall;
    }

    export namespace Comparison {
      /**
       * Comparison of a single metric between two versions
       */
      export interface Accuracy {
        /**
         * Value in baseline version (null if not available)
         */
        baselineValue?: number | null;

        /**
         * Value in comparison version (null if not available)
         */
        comparisonValue?: number | null;

        /**
         * Absolute difference (comparisonValue - baselineValue)
         */
        difference?: number | null;

        /**
         * **Percentage change from baseline to comparison**
         *
         * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
         *
         * - Positive values indicate improvement
         * - Negative values indicate regression
         */
        liftPercent?: number | null;
      }

      /**
       * Comparison of a single metric between two versions
       */
      export interface F1Score {
        /**
         * Value in baseline version (null if not available)
         */
        baselineValue?: number | null;

        /**
         * Value in comparison version (null if not available)
         */
        comparisonValue?: number | null;

        /**
         * Absolute difference (comparisonValue - baselineValue)
         */
        difference?: number | null;

        /**
         * **Percentage change from baseline to comparison**
         *
         * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
         *
         * - Positive values indicate improvement
         * - Negative values indicate regression
         */
        liftPercent?: number | null;
      }

      /**
       * Comparison of a single metric between two versions
       */
      export interface Precision {
        /**
         * Value in baseline version (null if not available)
         */
        baselineValue?: number | null;

        /**
         * Value in comparison version (null if not available)
         */
        comparisonValue?: number | null;

        /**
         * Absolute difference (comparisonValue - baselineValue)
         */
        difference?: number | null;

        /**
         * **Percentage change from baseline to comparison**
         *
         * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
         *
         * - Positive values indicate improvement
         * - Negative values indicate regression
         */
        liftPercent?: number | null;
      }

      /**
       * Comparison of a single metric between two versions
       */
      export interface Recall {
        /**
         * Value in baseline version (null if not available)
         */
        baselineValue?: number | null;

        /**
         * Value in comparison version (null if not available)
         */
        comparisonValue?: number | null;

        /**
         * Absolute difference (comparisonValue - baselineValue)
         */
        difference?: number | null;

        /**
         * **Percentage change from baseline to comparison**
         *
         * Formula: ((comparisonValue - baselineValue) / baselineValue) \* 100
         *
         * - Positive values indicate improvement
         * - Negative values indicate regression
         */
        liftPercent?: number | null;
      }
    }
  }
}

/**
 * Response containing review requirements estimate
 */
export interface FunctionEstimateReviewRequirementsResponse {
  /**
   * Detailed review requirements estimate
   */
  estimate: FunctionEstimateReviewRequirementsResponse.Estimate;

  /**
   * Name of the analyzed function
   */
  functionName: string;

  /**
   * Version number of the function that was analyzed
   */
  functionVersionNum: number;

  /**
   * Detailed performance metrics and analysis
   */
  metrics?: FunctionEstimateReviewRequirementsResponse.Metrics;
}

export namespace FunctionEstimateReviewRequirementsResponse {
  /**
   * Detailed review requirements estimate
   */
  export interface Estimate {
    /**
     * Distribution of confidence levels
     */
    confidenceDistribution: Estimate.ConfidenceDistribution;

    /**
     * Number of transformations already labeled
     */
    labeledTransformations: number;

    /**
     * Number of transformations without evaluation data
     */
    missingEvaluations: number;

    /**
     * Statistical analysis across confidence thresholds
     */
    thresholdMatrix: Array<Estimate.ThresholdMatrix>;

    /**
     * Total number of transformations analyzed
     */
    totalTransformations: number;

    /**
     * Number of transformations not yet labeled
     */
    unlabeledTransformations: number;
  }

  export namespace Estimate {
    /**
     * Distribution of confidence levels
     */
    export interface ConfidenceDistribution {
      high?: number;

      low?: number;

      medium?: number;
    }

    /**
     * Results for a specific confidence threshold analysis
     */
    export interface ThresholdMatrix {
      /**
       * False Negatives
       */
      fn: number;

      /**
       * False Positives
       */
      fp: number;

      /**
       * Confidence threshold value
       */
      threshold: number;

      /**
       * True Negatives
       */
      tn: number;

      /**
       * True Positives
       */
      tp: number;

      /**
       * Accuracy confidence intervals for samples above threshold, by confidence level.
       * Keys are confidence levels as strings ("90", "95", "99"). Values contain
       * statistical confidence intervals.
       */
      accuracyAboveThreshold?: ThresholdMatrix.AccuracyAboveThreshold;

      /**
       * False Discovery Rate confidence intervals by confidence level. Keys are
       * confidence levels as strings ("90", "95", "99"). Values contain statistical
       * confidence intervals.
       */
      falseDiscoveryRate?: ThresholdMatrix.FalseDiscoveryRate;

      /**
       * False Positive Rate confidence intervals by confidence level. Keys are
       * confidence levels as strings ("90", "95", "99"). Values contain statistical
       * confidence intervals.
       */
      falsePositiveRate?: ThresholdMatrix.FalsePositiveRate;

      /**
       * Precision confidence intervals by confidence level. Keys are confidence levels
       * as strings ("90", "95", "99"). Values contain statistical confidence intervals.
       */
      precision?: ThresholdMatrix.Precision;

      /**
       * Recall confidence intervals by confidence level. Keys are confidence levels as
       * strings ("90", "95", "99"). Values contain statistical confidence intervals.
       */
      recall?: ThresholdMatrix.Recall;
    }

    export namespace ThresholdMatrix {
      /**
       * Accuracy confidence intervals for samples above threshold, by confidence level.
       * Keys are confidence levels as strings ("90", "95", "99"). Values contain
       * statistical confidence intervals.
       */
      export interface AccuracyAboveThreshold {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        '95'?: AccuracyAboveThreshold._95;
      }

      export namespace AccuracyAboveThreshold {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        export interface _95 {
          /**
           * Current number of samples/observations available
           */
          currentSample: number;

          /**
           * Minimum number of samples needed for reliable confidence interval calculation
           */
          sampleNeeded: number;

          /**
           * Lower bound of the confidence interval (null if insufficient sample size)
           */
          ciLower?: number | null;

          /**
           * Upper bound of the confidence interval (null if insufficient sample size)
           */
          ciUpper?: number | null;

          /**
           * Point estimate (observed rate) at the center of the interval (null if
           * insufficient sample size)
           */
          mid?: number | null;
        }
      }

      /**
       * False Discovery Rate confidence intervals by confidence level. Keys are
       * confidence levels as strings ("90", "95", "99"). Values contain statistical
       * confidence intervals.
       */
      export interface FalseDiscoveryRate {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        '95'?: FalseDiscoveryRate._95;
      }

      export namespace FalseDiscoveryRate {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        export interface _95 {
          /**
           * Current number of samples/observations available
           */
          currentSample: number;

          /**
           * Minimum number of samples needed for reliable confidence interval calculation
           */
          sampleNeeded: number;

          /**
           * Lower bound of the confidence interval (null if insufficient sample size)
           */
          ciLower?: number | null;

          /**
           * Upper bound of the confidence interval (null if insufficient sample size)
           */
          ciUpper?: number | null;

          /**
           * Point estimate (observed rate) at the center of the interval (null if
           * insufficient sample size)
           */
          mid?: number | null;
        }
      }

      /**
       * False Positive Rate confidence intervals by confidence level. Keys are
       * confidence levels as strings ("90", "95", "99"). Values contain statistical
       * confidence intervals.
       */
      export interface FalsePositiveRate {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        '95'?: FalsePositiveRate._95;
      }

      export namespace FalsePositiveRate {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        export interface _95 {
          /**
           * Current number of samples/observations available
           */
          currentSample: number;

          /**
           * Minimum number of samples needed for reliable confidence interval calculation
           */
          sampleNeeded: number;

          /**
           * Lower bound of the confidence interval (null if insufficient sample size)
           */
          ciLower?: number | null;

          /**
           * Upper bound of the confidence interval (null if insufficient sample size)
           */
          ciUpper?: number | null;

          /**
           * Point estimate (observed rate) at the center of the interval (null if
           * insufficient sample size)
           */
          mid?: number | null;
        }
      }

      /**
       * Precision confidence intervals by confidence level. Keys are confidence levels
       * as strings ("90", "95", "99"). Values contain statistical confidence intervals.
       */
      export interface Precision {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        '95'?: Precision._95;
      }

      export namespace Precision {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        export interface _95 {
          /**
           * Current number of samples/observations available
           */
          currentSample: number;

          /**
           * Minimum number of samples needed for reliable confidence interval calculation
           */
          sampleNeeded: number;

          /**
           * Lower bound of the confidence interval (null if insufficient sample size)
           */
          ciLower?: number | null;

          /**
           * Upper bound of the confidence interval (null if insufficient sample size)
           */
          ciUpper?: number | null;

          /**
           * Point estimate (observed rate) at the center of the interval (null if
           * insufficient sample size)
           */
          mid?: number | null;
        }
      }

      /**
       * Recall confidence intervals by confidence level. Keys are confidence levels as
       * strings ("90", "95", "99"). Values contain statistical confidence intervals.
       */
      export interface Recall {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        '95'?: Recall._95;
      }

      export namespace Recall {
        /**
         * Confidence interval for a rate/proportion using Wald (normal approximation)
         * method by default.
         *
         * Wald confidence intervals use the normal approximation to the binomial
         * distribution. For extreme rates or small sample sizes, Wilson confidence
         * intervals may be more appropriate.
         */
        export interface _95 {
          /**
           * Current number of samples/observations available
           */
          currentSample: number;

          /**
           * Minimum number of samples needed for reliable confidence interval calculation
           */
          sampleNeeded: number;

          /**
           * Lower bound of the confidence interval (null if insufficient sample size)
           */
          ciLower?: number | null;

          /**
           * Upper bound of the confidence interval (null if insufficient sample size)
           */
          ciUpper?: number | null;

          /**
           * Point estimate (observed rate) at the center of the interval (null if
           * insufficient sample size)
           */
          mid?: number | null;
        }
      }
    }
  }

  /**
   * Detailed performance metrics and analysis
   */
  export interface Metrics {
    /**
     * Comprehensive performance metrics
     */
    aggregateMetrics?: Metrics.AggregateMetrics;

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    fieldMetrics?: Array<Metrics.FieldMetric>;

    /**
     * Area Under the Precision-Recall Curve
     */
    precisionRecallAuc?: number;
  }

  export namespace Metrics {
    /**
     * Comprehensive performance metrics
     */
    export interface AggregateMetrics {
      /**
       * Overall accuracy
       */
      accuracy?: number | null;

      /**
       * F1 Score (harmonic mean of precision and recall)
       */
      f1Score?: number | null;

      /**
       * False Negatives
       */
      fn?: number;

      /**
       * False Positives
       */
      fp?: number;

      /**
       * Precision (TP / (TP + FP))
       */
      precision?: number | null;

      /**
       * Recall (TP / (TP + FN))
       */
      recall?: number | null;

      /**
       * True Negatives
       */
      tn?: number;

      /**
       * True Positives
       */
      tp?: number;
    }

    /**
     * Enhanced field metrics with comprehensive analytics
     */
    export interface FieldMetric {
      /**
       * JSON path to the field
       */
      fieldPath: string;

      /**
       * Comprehensive performance metrics
       */
      metrics?: FieldMetric.Metrics;
    }

    export namespace FieldMetric {
      /**
       * Comprehensive performance metrics
       */
      export interface Metrics {
        /**
         * Overall accuracy
         */
        accuracy?: number | null;

        /**
         * F1 Score (harmonic mean of precision and recall)
         */
        f1Score?: number | null;

        /**
         * False Negatives
         */
        fn?: number;

        /**
         * False Positives
         */
        fp?: number;

        /**
         * Precision (TP / (TP + FP))
         */
        precision?: number | null;

        /**
         * Recall (TP / (TP + FN))
         */
        recall?: number | null;

        /**
         * True Negatives
         */
        tn?: number;

        /**
         * True Positives
         */
        tp?: number;
      }
    }
  }
}

export interface FunctionGetMetricsResponse {
  functions: Array<FunctionGetMetricsResponse.Function>;

  /**
   * Total number of functions
   */
  totalCount: number;
}

export namespace FunctionGetMetricsResponse {
  export interface Function {
    /**
     * The function name
     */
    functionName: string;

    metrics: Function.Metrics;

    /**
     * Number of transformations that have been labeled/evaluated for metrics
     * calculation
     */
    totalLabeledResults: number;

    /**
     * Total number of results processed by the function
     */
    totalResults: number;
  }

  export namespace Function {
    export interface Metrics {
      accuracy: number | null;

      f1Score: number | null;

      fn: number;

      fp: number;

      precision: number | null;

      recall: number | null;

      tn: number;

      tp: number;
    }
  }
}

export type FunctionCreateParams =
  | FunctionCreateParams.CreateExtractFunction
  | FunctionCreateParams.CreateClassifyFunction
  | FunctionCreateParams.CreateSendFunction
  | FunctionCreateParams.CreateSplitFunction
  | FunctionCreateParams.CreateJoinFunction
  | FunctionCreateParams.CreatePayloadShapingFunction
  | FunctionCreateParams.CreateEnrichFunction
  | FunctionCreateParams.CreateParseFunction;

export declare namespace FunctionCreateParams {
  export interface CreateExtractFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'extract';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Whether bounding box extraction is enabled. Applies to vision input types (pdf,
     * png, jpeg, heic, heif, webp) that dispatch through the analyze path. When true,
     * the function returns the document regions (page, coordinates) from which each
     * field was extracted. Enabling this automatically configures the function to use
     * the bounding box model. Disabling resets to the default.
     */
    enableBoundingBoxes?: boolean;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency. Compatible with `enableBoundingBoxes`.
     */
    preCount?: boolean;

    /**
     * Whether tabular chunking is enabled. When true, tables in CSV/Excel files are
     * processed in row batches rather than all at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreateClassifyFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'classify';

    /**
     * List of classifications a classify function can produce. Shares the underlying
     * route list shape.
     */
    classifications?: Array<ClassificationListItem>;

    /**
     * Description of classifier. Can be used to provide additional context on
     * classifier's purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreateSendFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'send';

    /**
     * Destination type for a Send function.
     */
    destinationType?: SendDestinationType;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Google Drive folder ID. Required when destinationType is google_drive. Managed
     * via Paragon OAuth.
     */
    googleDriveFolderId?: string;

    /**
     * S3 bucket to upload the payload to. Required when destinationType is s3.
     */
    s3Bucket?: string;

    /**
     * Optional S3 key prefix (folder path).
     */
    s3Prefix?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * Whether to sign webhook deliveries with an HMAC-SHA256 `bem-signature` header.
     * Defaults to `true` when omitted — signing is on by default for new send
     * functions. Set explicitly to `false` to disable.
     */
    webhookSigningEnabled?: boolean;

    /**
     * Webhook URL to POST the payload to. Required when destinationType is webhook.
     */
    webhookUrl?: string;
  }

  export interface CreateSplitFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'split';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    printPageSplitConfig?: CreateSplitFunction.PrintPageSplitConfig;

    semanticPageSplitConfig?: CreateSplitFunction.SemanticPageSplitConfig;

    splitType?: 'print_page' | 'semantic_page';

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace CreateSplitFunction {
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;

      nextFunctionName?: string;
    }

    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface CreateJoinFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'join';

    /**
     * Description of join function.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * The type of join to perform.
     */
    joinType?: 'standard';

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreatePayloadShapingFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'payload_shaping';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * JMESPath expression that defines how to transform and customize the input
     * payload structure. Payload shaping allows you to extract, reshape, and
     * reorganize data from complex input payloads into a simplified, standardized
     * output format. Use JMESPath syntax to select specific fields, perform
     * calculations, and create new data structures tailored to your needs.
     */
    shapingSchema?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreateEnrichFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'enrich';

    /**
     * Configuration for an enrich function.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions augment JSON input with data from external sources. They take
     * JSON input (typically from a previous function), extract specified fields, fetch
     * or search for matching data, and inject the results back into the JSON.
     *
     * **Data Sources:**
     *
     * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
     *   collection. Best for semantic matching against pre-indexed documents.
     * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
     *   Best for looking up live data from CRMs, ERPs, or other external systems.
     *   Optionally uses LLM agent reasoning to rank candidates returned by the
     *   endpoint.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically from a previous function's output)
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog collection
     * - Enrich customer data with account details from a CRM endpoint
     * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
     *   products
     *
     * **Configuration:**
     *
     * - Define named endpoints (for endpoint-source steps)
     * - Define one or more enrichment steps; steps are executed sequentially
     */
    config?: EnrichConfig;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreateParseFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'parse';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    extraConfig?: CreateParseFunction.ExtraConfig;

    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace CreateParseFunction {
    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    export interface ExtraConfig {
      /**
       * When true, return per-section and per-entity-mention coordinates in the parse
       * event's `fieldBoundingBoxes` map (same shape as Extract: JSON Pointer key →
       * array of `{page, left, top, width, height}` with coordinates normalized to [0,
       * 1]). Keys are `/sections/{N}` and `/entities/{N}/occurrences/{M}` into the parse
       * output. Only applies to the open-ended discovery path (no `schema`) and to
       * vision input types. Bedrock-backed parse functions silently return an empty map
       * (no native bbox support). Defaults to false.
       */
      enableBoundingBoxes?: boolean;
    }
  }
}

export type FunctionUpdateParams =
  | FunctionUpdateParams.UpsertExtractFunction
  | FunctionUpdateParams.UpsertClassifyFunction
  | FunctionUpdateParams.UpsertSendFunction
  | FunctionUpdateParams.UpsertSplitFunction
  | FunctionUpdateParams.UpsertJoinFunction
  | FunctionUpdateParams.UpsertPayloadShapingFunction
  | FunctionUpdateParams.UpsertEnrichFunction
  | FunctionUpdateParams.UpsertParseFunction;

export declare namespace FunctionUpdateParams {
  export interface UpsertExtractFunction {
    type: 'extract';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Whether bounding box extraction is enabled. Applies to vision input types (pdf,
     * png, jpeg, heic, heif, webp) that dispatch through the analyze path. When true,
     * the function returns the document regions (page, coordinates) from which each
     * field was extracted. Enabling this automatically configures the function to use
     * the bounding box model. Disabling resets to the default.
     */
    enableBoundingBoxes?: boolean;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Reducing the risk of the model stopping early on long documents. Trade-off:
     * Increases total latency. Compatible with `enableBoundingBoxes`.
     */
    preCount?: boolean;

    /**
     * Whether tabular chunking is enabled. When true, tables in CSV/Excel files are
     * processed in row batches rather than all at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertClassifyFunction {
    type: 'classify';

    /**
     * List of classifications a classify function can produce. Shares the underlying
     * route list shape.
     */
    classifications?: Array<ClassificationListItem>;

    /**
     * Description of classifier. Can be used to provide additional context on
     * classifier's purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertSendFunction {
    type: 'send';

    /**
     * Destination type for a Send function.
     */
    destinationType?: SendDestinationType;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Google Drive folder ID. Required when destinationType is google_drive. Managed
     * via Paragon OAuth.
     */
    googleDriveFolderId?: string;

    /**
     * S3 bucket to upload the payload to. Required when destinationType is s3.
     */
    s3Bucket?: string;

    /**
     * Optional S3 key prefix (folder path).
     */
    s3Prefix?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * Whether to sign webhook deliveries with an HMAC-SHA256 `bem-signature` header.
     * Defaults to `true` when omitted — signing is on by default for new send
     * functions. Set explicitly to `false` to disable.
     */
    webhookSigningEnabled?: boolean;

    /**
     * Webhook URL to POST the payload to. Required when destinationType is webhook.
     */
    webhookUrl?: string;
  }

  export interface UpsertSplitFunction {
    type: 'split';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    printPageSplitConfig?: UpsertSplitFunction.PrintPageSplitConfig;

    semanticPageSplitConfig?: UpsertSplitFunction.SemanticPageSplitConfig;

    splitType?: 'print_page' | 'semantic_page';

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace UpsertSplitFunction {
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;

      nextFunctionName?: string;
    }

    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface UpsertJoinFunction {
    type: 'join';

    /**
     * Description of join function.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * The type of join to perform.
     */
    joinType?: 'standard';

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertPayloadShapingFunction {
    type: 'payload_shaping';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * JMESPath expression that defines how to transform and customize the input
     * payload structure. Payload shaping allows you to extract, reshape, and
     * reorganize data from complex input payloads into a simplified, standardized
     * output format. Use JMESPath syntax to select specific fields, perform
     * calculations, and create new data structures tailored to your needs.
     */
    shapingSchema?: string;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertEnrichFunction {
    type: 'enrich';

    /**
     * Configuration for an enrich function.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions augment JSON input with data from external sources. They take
     * JSON input (typically from a previous function), extract specified fields, fetch
     * or search for matching data, and inject the results back into the JSON.
     *
     * **Data Sources:**
     *
     * - **Collections** (`source: "collection"`): Vector/keyword search against a BEM
     *   collection. Best for semantic matching against pre-indexed documents.
     * - **Endpoints** (`source: "endpoint"`): HTTP call to any user-provided REST API.
     *   Best for looking up live data from CRMs, ERPs, or other external systems.
     *   Optionally uses LLM agent reasoning to rank candidates returned by the
     *   endpoint.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically from a previous function's output)
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog collection
     * - Enrich customer data with account details from a CRM endpoint
     * - Use LLM agent reasoning to fuzzy-match line item descriptions to catalog
     *   products
     *
     * **Configuration:**
     *
     * - Define named endpoints (for endpoint-source steps)
     * - Define one or more enrichment steps; steps are executed sequentially
     */
    config?: EnrichConfig;
  }

  export interface UpsertParseFunction {
    type: 'parse';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    extraConfig?: UpsertParseFunction.ExtraConfig;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName?: string;

    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace UpsertParseFunction {
    /**
     * Cross-cutting toggles for Parse functions. Mirrors the `extraConfig` surface on
     * Extract / Join — separated from `parseConfig` so the per-call Parse output shape
     * stays distinct from operator-level execution flags.
     */
    export interface ExtraConfig {
      /**
       * When true, return per-section and per-entity-mention coordinates in the parse
       * event's `fieldBoundingBoxes` map (same shape as Extract: JSON Pointer key →
       * array of `{page, left, top, width, height}` with coordinates normalized to [0,
       * 1]). Keys are `/sections/{N}` and `/entities/{N}/occurrences/{M}` into the parse
       * output. Only applies to the open-ended discovery path (no `schema`) and to
       * vision input types. Bedrock-backed parse functions silently return an empty map
       * (no native bbox support). Defaults to false.
       */
      enableBoundingBoxes?: boolean;
    }
  }
}

export interface FunctionListParams extends FunctionsPageParams {
  displayName?: string;

  functionIDs?: Array<string>;

  functionNames?: Array<string>;

  sortOrder?: 'asc' | 'desc';

  tags?: Array<string>;

  types?: Array<FunctionType>;

  workflowIDs?: Array<string>;

  workflowNames?: Array<string>;
}

export interface FunctionCompareMetricsParams {
  /**
   * Name of the function to compare versions for
   */
  functionName: string;

  /**
   * **Baseline version number for comparison**
   *
   * If not provided, defaults to the previous version (current - 1).
   */
  baselineVersionNum?: number;

  /**
   * **Comparison version number**
   *
   * If not provided, defaults to the current version.
   */
  comparisonVersionNum?: number;

  /**
   * **Whether to compare regression test data only**
   *
   * If true, only compares transformations marked as regression tests.
   */
  isRegression?: boolean;
}

export interface FunctionEstimateReviewRequirementsParams {
  /**
   * Name of the function to analyze
   */
  functionName: string;

  /**
   * Confidence levels for statistical analysis as integers representing percentages
   * (e.g., [90, 95, 99] for 90%, 95%, 99%). IMPORTANT: Only integers are accepted,
   * floats like 0.95 will be rejected.
   */
  confidenceLevels?: Array<number>;

  /**
   * Confidence interval calculation method (default "wald").
   *
   * - "wald": Normal approximation method (faster, standard)
   * - "wilson": Wilson score interval (more robust for extreme rates)
   */
  confidenceMethod?: 'wald' | 'wilson';

  /**
   * Optional evaluation version to filter evaluations by. Must be one of the
   * supported versions. If not provided, defaults to "0.1.0-gemini".
   */
  evaluationVersion?: '0.1.0-gemini';

  /**
   * Optional function version number to analyze. If not provided, uses the
   * latest/current version of the function.
   */
  functionVersionNum?: number;

  /**
   * Internal flag indicating if the request is from a regression test
   */
  isRegression?: boolean;

  /**
   * Margin of error for statistical calculations
   */
  marginOfError?: number;

  /**
   * Maximum confidence threshold to analyze
   */
  thresholdMax?: number;

  /**
   * Minimum confidence threshold to analyze
   */
  thresholdMin?: number;

  /**
   * Step size for threshold analysis (smaller = more granular)
   */
  thresholdStep?: number;
}

export interface FunctionGetMetricsParams {
  /**
   * Cursor — a `functionID` defining your place in the list.
   */
  endingBefore?: string;

  functionIDs?: Array<string>;

  functionNames?: Array<string>;

  limit?: number;

  /**
   * Sort direction over the result set (default `asc`). Pagination works
   * symmetrically in both directions via `startingAfter` / `endingBefore`.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Cursor — a `functionID` defining your place in the list.
   */
  startingAfter?: string;

  types?: Array<FunctionType>;
}

Functions.Copy = Copy;
Functions.Versions = Versions;
Functions.Regression = Regression;

export declare namespace Functions {
  export {
    type ClassificationListItem as ClassificationListItem,
    type CreateFunction as CreateFunction,
    type EnrichConfig as EnrichConfig,
    type EnrichStep as EnrichStep,
    type Function as Function,
    type FunctionAudit as FunctionAudit,
    type FunctionResponse as FunctionResponse,
    type FunctionType as FunctionType,
    type ListFunctionsResponse as ListFunctionsResponse,
    type ParseConfig as ParseConfig,
    type SendDestinationType as SendDestinationType,
    type SplitFunctionSemanticPageItemClass as SplitFunctionSemanticPageItemClass,
    type UpdateFunction as UpdateFunction,
    type UserActionSummary as UserActionSummary,
    type WorkflowUsageInfo as WorkflowUsageInfo,
    type FunctionCompareMetricsResponse as FunctionCompareMetricsResponse,
    type FunctionEstimateReviewRequirementsResponse as FunctionEstimateReviewRequirementsResponse,
    type FunctionGetMetricsResponse as FunctionGetMetricsResponse,
    type FunctionsFunctionsPage as FunctionsFunctionsPage,
    type FunctionCreateParams as FunctionCreateParams,
    type FunctionUpdateParams as FunctionUpdateParams,
    type FunctionListParams as FunctionListParams,
    type FunctionCompareMetricsParams as FunctionCompareMetricsParams,
    type FunctionEstimateReviewRequirementsParams as FunctionEstimateReviewRequirementsParams,
    type FunctionGetMetricsParams as FunctionGetMetricsParams,
  };

  export {
    Copy as Copy,
    type FunctionCopyRequest as FunctionCopyRequest,
    type CopyCreateParams as CopyCreateParams,
  };

  export {
    Versions as Versions,
    type FunctionVersion as FunctionVersion,
    type ListFunctionVersionsResponse as ListFunctionVersionsResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
  };

  export {
    Regression as Regression,
    type RegressionApplyCorrectionsResponse as RegressionApplyCorrectionsResponse,
    type RegressionRunResponse as RegressionRunResponse,
    type RegressionApplyCorrectionsParams as RegressionApplyCorrectionsParams,
    type RegressionRunParams as RegressionRunParams,
  };
}
