// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from './functions';
import * as CopyAPI from './copy';
import { Copy, CopyCreateParams, FunctionCopyRequest } from './copy';
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

/**
 * Functions are the core building blocks of data transformation in Bem. Each function type serves a specific purpose:
 *
 * - **Extract**: Extract structured JSON data from unstructured documents (PDFs, emails, images, spreadsheets), with optional layout-aware bounding-box extraction
 * - **Route**: Direct data to different processing paths based on conditions
 * - **Split**: Break multi-page documents into individual pages for parallel processing
 * - **Join**: Combine outputs from multiple function calls into a single result
 * - **Parse**: Render documents into a navigable structure of page-aware sections, named entities, and relationships — designed to be walked by an LLM agent via the [File System API](/api/v3/file-system) (`POST /v3/fs`). Two toggles, both `true` by default: `extractEntities` controls per-document entity and relationship extraction; `linkAcrossDocuments` merges entities into one canonical record per real-world thing across the environment, populating cross-document memory.
 * - **Payload Shaping**: Transform and restructure data using JMESPath expressions
 * - **Enrich**: Enhance data with semantic search against collections
 * - **Send**: Deliver workflow outputs to downstream destinations
 *
 * Use these endpoints to create, update, list, and manage your functions.
 */
export class Functions extends APIResource {
  copy: CopyAPI.Copy = new CopyAPI.Copy(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

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
   */
  delete(functionName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/functions/${functionName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
    destinationType?: 'webhook' | 's3' | 'google_drive';

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
     * Configuration for enrich function with semantic search steps.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions use semantic search to augment JSON data with relevant
     * information from collections. They take JSON input (typically from a transform
     * function), extract specified fields, perform vector-based semantic search
     * against collections, and inject the results back into the data.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically uploaded to S3 from a previous function)
     * - Can be chained after transform or other functions that produce JSON output
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog
     * - Enrich customer data with account information
     * - Link order line items to inventory records
     *
     * **Configuration:**
     *
     * - Define one or more enrichment steps
     * - Each step extracts values, searches a collection, and injects results
     * - Steps are executed sequentially
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
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: ParseFunction.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace ParseFunction {
    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    export interface ParseConfig {
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
  }
}

/**
 * Configuration for enrich function with semantic search steps.
 *
 * **How Enrich Functions Work:**
 *
 * Enrich functions use semantic search to augment JSON data with relevant
 * information from collections. They take JSON input (typically from a transform
 * function), extract specified fields, perform vector-based semantic search
 * against collections, and inject the results back into the data.
 *
 * **Input Requirements:**
 *
 * - Must receive JSON input (typically uploaded to S3 from a previous function)
 * - Can be chained after transform or other functions that produce JSON output
 *
 * **Example Use Cases:**
 *
 * - Match product descriptions to SKU codes from a product catalog
 * - Enrich customer data with account information
 * - Link order line items to inventory records
 *
 * **Configuration:**
 *
 * - Define one or more enrichment steps
 * - Each step extracts values, searches a collection, and injects results
 * - Steps are executed sequentially
 */
export interface EnrichConfig {
  /**
   * Array of enrichment steps to execute sequentially
   */
  steps: Array<EnrichStep>;
}

/**
 * Single enrichment step configuration.
 *
 * **Process Flow:**
 *
 * 1. Extract values from `sourceField` using JMESPath
 * 2. Perform search against the specified collection (semantic, exact, or hybrid
 *    based on `searchMode`)
 * 3. Return top K matches sorted by relevance (best match first)
 * 4. Inject results into `targetField`
 *
 * **Search Modes:**
 *
 * - `semantic` (default): Vector similarity search - best for natural language and
 *   conceptual matching
 * - `exact`: Exact keyword matching - best for SKU numbers, IDs, routing numbers
 * - `hybrid`: Combined semantic + keyword search - best for tags and categories
 *
 * **Result Format:**
 *
 * - Results are always returned as an array (list), regardless of `topK` value
 * - Array is sorted by relevance (best match first)
 * - Each result contains `data` (the collection item) and optionally
 *   `cosineDistance`
 * - With `topK=1`: Returns array with single best match:
 *   `[{data: {...}, cosineDistance: 0.15}]`
 * - With `topK>1`: Returns array with multiple matches sorted by relevance
 */
export interface EnrichStep {
  /**
   * Name of the collection to search against. The collection must exist and contain
   * items. Supports hierarchical paths when used with `includeSubcollections`.
   */
  collectionName: string;

  /**
   * JMESPath expression to extract source data for semantic search. Can extract
   * single values or arrays. All extracted values will be used for search.
   */
  sourceField: string;

  /**
   * Field path where enriched results should be placed. Use simple field names
   * (e.g., "enriched_products"). Results are always injected as an array (list),
   * regardless of topK value.
   */
  targetField: string;

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
    destinationType: 'webhook' | 's3' | 'google_drive';

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
     * Configuration for enrich function with semantic search steps.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions use semantic search to augment JSON data with relevant
     * information from collections. They take JSON input (typically from a transform
     * function), extract specified fields, perform vector-based semantic search
     * against collections, and inject the results back into the data.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically uploaded to S3 from a previous function)
     * - Can be chained after transform or other functions that produce JSON output
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog
     * - Enrich customer data with account information
     * - Link order line items to inventory records
     *
     * **Configuration:**
     *
     * - Define one or more enrichment steps
     * - Each step extracts values, searches a collection, and injects results
     * - Steps are executed sequentially
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
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: ParseFunction.ParseConfig;

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
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    export interface ParseConfig {
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
    destinationType?: 'webhook' | 's3' | 'google_drive';

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
     * Configuration for enrich function with semantic search steps.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions use semantic search to augment JSON data with relevant
     * information from collections. They take JSON input (typically from a transform
     * function), extract specified fields, perform vector-based semantic search
     * against collections, and inject the results back into the data.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically uploaded to S3 from a previous function)
     * - Can be chained after transform or other functions that produce JSON output
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog
     * - Enrich customer data with account information
     * - Link order line items to inventory records
     *
     * **Configuration:**
     *
     * - Define one or more enrichment steps
     * - Each step extracts values, searches a collection, and injects results
     * - Steps are executed sequentially
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
    parseConfig?: ParseFunction.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace ParseFunction {
    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    export interface ParseConfig {
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
    destinationType?: 'webhook' | 's3' | 'google_drive';

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
     * Configuration for enrich function with semantic search steps.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions use semantic search to augment JSON data with relevant
     * information from collections. They take JSON input (typically from a transform
     * function), extract specified fields, perform vector-based semantic search
     * against collections, and inject the results back into the data.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically uploaded to S3 from a previous function)
     * - Can be chained after transform or other functions that produce JSON output
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog
     * - Enrich customer data with account information
     * - Link order line items to inventory records
     *
     * **Configuration:**
     *
     * - Define one or more enrichment steps
     * - Each step extracts values, searches a collection, and injects results
     * - Steps are executed sequentially
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
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    parseConfig?: CreateParseFunction.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace CreateParseFunction {
    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    export interface ParseConfig {
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
    destinationType?: 'webhook' | 's3' | 'google_drive';

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
     * Configuration for enrich function with semantic search steps.
     *
     * **How Enrich Functions Work:**
     *
     * Enrich functions use semantic search to augment JSON data with relevant
     * information from collections. They take JSON input (typically from a transform
     * function), extract specified fields, perform vector-based semantic search
     * against collections, and inject the results back into the data.
     *
     * **Input Requirements:**
     *
     * - Must receive JSON input (typically uploaded to S3 from a previous function)
     * - Can be chained after transform or other functions that produce JSON output
     *
     * **Example Use Cases:**
     *
     * - Match product descriptions to SKU codes from a product catalog
     * - Enrich customer data with account information
     * - Link order line items to inventory records
     *
     * **Configuration:**
     *
     * - Define one or more enrichment steps
     * - Each step extracts values, searches a collection, and injects results
     * - Steps are executed sequentially
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
    parseConfig?: UpsertParseFunction.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export namespace UpsertParseFunction {
    /**
     * Per-version configuration for a Parse function.
     *
     * Parse renders document pages (PDF, image) via vision LLM and emits structured
     * JSON. The two toggles below independently control entity extraction (a per-call
     * output concern) and cross-document memory linking (an environment-wide concern).
     */
    export interface ParseConfig {
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

Functions.Copy = Copy;
Functions.Versions = Versions;

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
    type SplitFunctionSemanticPageItemClass as SplitFunctionSemanticPageItemClass,
    type UpdateFunction as UpdateFunction,
    type UserActionSummary as UserActionSummary,
    type WorkflowUsageInfo as WorkflowUsageInfo,
    type FunctionsFunctionsPage as FunctionsFunctionsPage,
    type FunctionCreateParams as FunctionCreateParams,
    type FunctionUpdateParams as FunctionUpdateParams,
    type FunctionListParams as FunctionListParams,
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
}
