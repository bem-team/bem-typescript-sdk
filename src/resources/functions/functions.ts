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
 * - **Transform**: Extract structured JSON data from unstructured documents (PDFs, emails, images)
 * - **Analyze**: Perform visual analysis on documents to extract layout-aware information
 * - **Route**: Direct data to different processing paths based on conditions
 * - **Split**: Break multi-page documents into individual pages for parallel processing
 * - **Join**: Combine outputs from multiple function calls into a single result
 * - **Payload Shaping**: Transform and restructure data using JMESPath expressions
 * - **Enrich**: Enhance data with semantic search against collections
 *
 * Use these endpoints to create, update, list, and manage your functions.
 */
export class Functions extends APIResource {
  copy: CopyAPI.Copy = new CopyAPI.Copy(this._client);
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create a Function
   */
  create(body: FunctionCreateParams, options?: RequestOptions): APIPromise<FunctionResponse> {
    return this._client.post('/v3/functions', { body, ...options });
  }

  /**
   * Get a Function
   */
  retrieve(functionName: string, options?: RequestOptions): APIPromise<FunctionResponse> {
    return this._client.get(path`/v3/functions/${functionName}`, options);
  }

  /**
   * Update a Function
   */
  update(
    pathFunctionName: string,
    body: FunctionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<FunctionResponse> {
    return this._client.patch(path`/v3/functions/${pathFunctionName}`, { body, ...options });
  }

  /**
   * List Functions
   */
  list(
    query: FunctionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FunctionsFunctionsPage, Function> {
    return this._client.getAPIList('/v3/functions', FunctionsPage<Function>, { query, ...options });
  }

  /**
   * Delete a Function
   */
  delete(functionName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/functions/${functionName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type FunctionsFunctionsPage = FunctionsPage<Function>;

export type CreateFunction =
  | CreateFunction.TransformFunction
  | CreateFunction.AnalyzeFunction
  | CreateFunction.RouteFunction
  | CreateFunction.SplitFunction
  | CreateFunction.JoinFunction
  | CreateFunction.PayloadShapingFunction
  | CreateFunction.EnrichFunction;

export namespace CreateFunction {
  export interface TransformFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'transform';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Whether tabular chunking is enabled on the pipeline. This processes tables in
     * CSV/Excel in row batches, rather than all rows at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface AnalyzeFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'analyze';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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

  export interface RouteFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'route';

    /**
     * Description of router. Can be used to provide additional context on router's
     * purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * List of routes.
     */
    routes?: Array<FunctionsAPI.RouteListItem>;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
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
   * When enabled, each result includes a `cosineDistance` field.
   */
  includeCosineDistance?: boolean;

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
 * A function that transforms and customizes input payloads using JMESPath
 * expressions. Payload shaping allows you to extract specific data, perform
 * calculations, and reshape complex input structures into simplified, standardized
 * output formats tailored to your downstream systems or business requirements.
 */
export type Function =
  | Function.TransformFunction
  | Function.AnalyzeFunction
  | Function.RouteFunction
  | Function.SplitFunction
  | Function.JoinFunction
  | Function.PayloadShapingFunction
  | Function.EnrichFunction;

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

  export interface AnalyzeFunction {
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

  export interface RouteFunction {
    /**
     * Description of router. Can be used to provide additional context on router's
     * purpose and expected inputs.
     */
    description: string;

    /**
     * Email address automatically created by bem. You can forward emails with or
     * without attachments, to be routed.
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
     * List of routes.
     */
    routes: Array<FunctionsAPI.RouteListItem>;

    type: 'route';

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
   * A function that transforms and customizes input payloads using JMESPath
   * expressions. Payload shaping allows you to extract specific data, perform
   * calculations, and reshape complex input structures into simplified, standardized
   * output formats tailored to your downstream systems or business requirements.
   */
  function: Function;
}

/**
 * The type of the function.
 */
export type FunctionType =
  | 'transform'
  | 'route'
  | 'split'
  | 'join'
  | 'analyze'
  | 'payload_shaping'
  | 'enrich';

export interface ListFunctionsResponse {
  functions?: Array<Function>;

  /**
   * The total number of results available.
   */
  totalCount?: number;
}

export interface RouteListItem {
  name: string;

  description?: string;

  functionID?: string;

  functionName?: string;

  isErrorFallback?: boolean;

  origin?: RouteListItem.Origin;

  regex?: RouteListItem.Regex;
}

export namespace RouteListItem {
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
 * A function that transforms and customizes input payloads using JMESPath
 * expressions. Payload shaping allows you to extract specific data, perform
 * calculations, and reshape complex input structures into simplified, standardized
 * output formats tailored to your downstream systems or business requirements.
 */
export type UpdateFunction =
  | UpdateFunction.TransformFunction
  | UpdateFunction.AnalyzeFunction
  | UpdateFunction.RouteFunction
  | UpdateFunction.SplitFunction
  | UpdateFunction.JoinFunction
  | UpdateFunction.PayloadShapingFunction
  | UpdateFunction.UpsertEnrichFunction;

export namespace UpdateFunction {
  export interface TransformFunction {
    type: 'transform';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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
     * Whether tabular chunking is enabled on the pipeline. This processes tables in
     * CSV/Excel in row batches, rather than all rows at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface AnalyzeFunction {
    type: 'analyze';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface RouteFunction {
    type: 'route';

    /**
     * Description of router. Can be used to provide additional context on router's
     * purpose and expected inputs.
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
     * List of routes.
     */
    routes?: Array<FunctionsAPI.RouteListItem>;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
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
  | FunctionCreateParams.CreateTransformFunction
  | FunctionCreateParams.CreateAnalyzeFunction
  | FunctionCreateParams.CreateRouteFunction
  | FunctionCreateParams.CreateSplitFunction
  | FunctionCreateParams.CreateJoinFunction
  | FunctionCreateParams.CreatePayloadShapingFunction
  | FunctionCreateParams.CreateEnrichFunction;

export declare namespace FunctionCreateParams {
  export interface CreateTransformFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'transform';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * Desired output structure defined in standard JSON Schema convention.
     */
    outputSchema?: unknown;

    /**
     * Name of output schema object.
     */
    outputSchemaName?: string;

    /**
     * Whether tabular chunking is enabled on the pipeline. This processes tables in
     * CSV/Excel in row batches, rather than all rows at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface CreateAnalyzeFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'analyze';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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

  export interface CreateRouteFunction {
    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    type: 'route';

    /**
     * Description of router. Can be used to provide additional context on router's
     * purpose and expected inputs.
     */
    description?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    /**
     * List of routes.
     */
    routes?: Array<RouteListItem>;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
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
}

export type FunctionUpdateParams =
  | FunctionUpdateParams.UpsertTransformFunction
  | FunctionUpdateParams.UpsertAnalyzeFunction
  | FunctionUpdateParams.UpsertRouteFunction
  | FunctionUpdateParams.UpsertSplitFunction
  | FunctionUpdateParams.UpsertJoinFunction
  | FunctionUpdateParams.UpsertPayloadShapingFunction
  | FunctionUpdateParams.UpsertEnrichFunction;

export declare namespace FunctionUpdateParams {
  export interface UpsertTransformFunction {
    type: 'transform';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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
     * Whether tabular chunking is enabled on the pipeline. This processes tables in
     * CSV/Excel in row batches, rather than all rows at once.
     */
    tabularChunkingEnabled?: boolean;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertAnalyzeFunction {
    type: 'analyze';

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

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
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
  }

  export interface UpsertRouteFunction {
    type: 'route';

    /**
     * Description of router. Can be used to provide additional context on router's
     * purpose and expected inputs.
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
     * List of routes.
     */
    routes?: Array<RouteListItem>;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;
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
    type CreateFunction as CreateFunction,
    type EnrichConfig as EnrichConfig,
    type EnrichStep as EnrichStep,
    type Function as Function,
    type FunctionAudit as FunctionAudit,
    type FunctionResponse as FunctionResponse,
    type FunctionType as FunctionType,
    type ListFunctionsResponse as ListFunctionsResponse,
    type RouteListItem as RouteListItem,
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
