// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from './functions';
import { APIPromise } from '../../core/api-promise';
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
export class Versions extends APIResource {
  /**
   * Get a Function Version
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
   * List Function Versions
   */
  list(functionName: string, options?: RequestOptions): APIPromise<ListFunctionVersionsResponse> {
    return this._client.get(path`/v3/functions/${functionName}/versions`, options);
  }
}

/**
 * A version of a payload shaping function that transforms and customizes input
 * payloads using JMESPath expressions. Payload shaping allows you to extract
 * specific data, perform calculations, and reshape complex input structures into
 * simplified, standardized output formats tailored to your downstream systems or
 * business requirements.
 */
export type FunctionVersion =
  | FunctionVersion.TransformFunctionVersion
  | FunctionVersion.AnalyzeFunctionVersion
  | FunctionVersion.RouteFunctionVersion
  | FunctionVersion.SendFunctionVersion
  | FunctionVersion.SplitFunctionVersion
  | FunctionVersion.JoinFunctionVersion
  | FunctionVersion.EnrichFunctionVersion
  | FunctionVersion.PayloadShapingFunctionVersion;

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

  export interface AnalyzeFunctionVersion {
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

  export interface RouteFunctionVersion {
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
   * A version of a payload shaping function that transforms and customizes input
   * payloads using JMESPath expressions. Payload shaping allows you to extract
   * specific data, perform calculations, and reshape complex input structures into
   * simplified, standardized output formats tailored to your downstream systems or
   * business requirements.
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
