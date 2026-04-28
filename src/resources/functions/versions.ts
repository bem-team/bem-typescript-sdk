// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from './functions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Functions are the core building blocks of data transformation in Bem. Each function type serves a specific purpose:
 *
 * - **Extract**: Extract structured JSON data from unstructured documents (PDFs, emails, images, spreadsheets), with optional layout-aware bounding-box extraction
 * - **Route**: Direct data to different processing paths based on conditions
 * - **Split**: Break multi-page documents into individual pages for parallel processing
 * - **Join**: Combine outputs from multiple function calls into a single result
 * - **Payload Shaping**: Transform and restructure data using JMESPath expressions
 * - **Enrich**: Enhance data with semantic search against collections
 * - **Send**: Deliver workflow outputs to downstream destinations
 *
 * Use these endpoints to create, update, list, and manage your functions.
 */
export class Versions extends APIResource {
  /**
   * **Retrieve a specific historical version of a function.**
   *
   * Versions are immutable. Use this endpoint to inspect what a function looked like
   * at the moment a particular call was made — every event and transformation
   * records the function version it ran against.
   */
  retrieve(
    versionNum: number,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<VersionRetrieveResponse> {
    const { functionName } = params;
    return this._client.get(path`/v3/functions/${functionName}/versions/${versionNum}`, options);
  }

  /**
   * **List every version of a function.**
   *
   * Returns the full version history, newest-first. Each row captures the
   * configuration the function had between updates. Useful for audits ("when did
   * this schema change?") and for diffing two versions before promoting an update to
   * production.
   */
  list(functionName: string, options?: RequestOptions): APIPromise<ListFunctionVersionsResponse> {
    return this._client.get(path`/v3/functions/${functionName}/versions`, options);
  }
}

/**
 * V3 read-side union for function versions. Same shape as the shared
 * `FunctionVersion` union but with `classify` in place of `route`.
 */
export type FunctionVersion =
  | FunctionVersion.TransformFunctionVersion
  | FunctionVersion.ExtractFunctionVersion
  | FunctionVersion.AnalyzeFunctionVersion
  | FunctionVersion.ClassifyFunctionVersion
  | FunctionVersion.SendFunctionVersion
  | FunctionVersion.SplitFunctionVersion
  | FunctionVersion.JoinFunctionVersion
  | FunctionVersion.EnrichFunctionVersion
  | FunctionVersion.PayloadShapingFunctionVersion
  | FunctionVersion.ParseFunctionVersion;

export namespace FunctionVersion {
  export interface TransformFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface ExtractFunctionVersion {
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

    /**
     * Whether tabular chunking is enabled. When true, tables in CSV/Excel files are
     * processed in row batches rather than all at once.
     */
    tabularChunkingEnabled: boolean;

    type: 'extract';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface AnalyzeFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface ClassifyFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface SendFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    googleDriveFolderId?: string;

    s3Bucket?: string;

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
     * Whether webhook deliveries are signed with an HMAC-SHA256 `bem-signature`
     * header.
     */
    webhookSigningEnabled?: boolean;

    webhookUrl?: string;
  }

  export interface SplitFunctionVersion {
    /**
     * Unique identifier of function.
     */
    functionID: string;

    /**
     * Name of function. Must be UNIQUE on a per-environment basis.
     */
    functionName: string;

    splitType: 'print_page' | 'semantic_page';

    type: 'split';

    /**
     * Version number of function.
     */
    versionNum: number;

    /**
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

    /**
     * Display name of function. Human-readable name to help you identify the function.
     */
    displayName?: string;

    printPageSplitConfig?: SplitFunctionVersion.PrintPageSplitConfig;

    semanticPageSplitConfig?: SplitFunctionVersion.SemanticPageSplitConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export namespace SplitFunctionVersion {
    export interface PrintPageSplitConfig {
      nextFunctionID?: string;
    }

    export interface SemanticPageSplitConfig {
      itemClasses?: Array<FunctionsAPI.SplitFunctionSemanticPageItemClass>;
    }
  }

  export interface JoinFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface EnrichFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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
   * A version of a payload shaping function that transforms and customizes input
   * payloads using JMESPath expressions. Payload shaping allows you to extract
   * specific data, perform calculations, and reshape complex input structures into
   * simplified, standardized output formats tailored to your downstream systems or
   * business requirements.
   */
  export interface PayloadShapingFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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

  export interface ParseFunctionVersion {
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
     * Audit trail information for the function version.
     */
    audit?: FunctionsAPI.FunctionAudit;

    /**
     * The date and time the function version was created.
     */
    createdAt?: string;

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
    parseConfig?: ParseFunctionVersion.ParseConfig;

    /**
     * Array of tags to categorize and organize functions.
     */
    tags?: Array<string>;

    /**
     * List of workflows that use this function.
     */
    usedInWorkflows?: Array<FunctionsAPI.WorkflowUsageInfo>;
  }

  export namespace ParseFunctionVersion {
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

export interface ListFunctionVersionsResponse {
  /**
   * The total number of results available.
   */
  totalCount?: number;

  versions?: Array<FunctionVersion>;
}

/**
 * Single-function-version response wrapper used by V3 endpoints.
 */
export interface VersionRetrieveResponse {
  /**
   * V3 read-side union for function versions. Same shape as the shared
   * `FunctionVersion` union but with `classify` in place of `route`.
   */
  function: FunctionVersion;
}

export interface VersionRetrieveParams {
  functionName: string;
}

export declare namespace Versions {
  export {
    type FunctionVersion as FunctionVersion,
    type ListFunctionVersionsResponse as ListFunctionVersionsResponse,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
  };
}
