// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkflowsAPI from './workflows';
import * as CallsAPI from '../calls';
import * as FunctionsAPI from '../functions/functions';
import * as VersionsAPI from './versions';
import { VersionListParams, VersionRetrieveParams, VersionRetrieveResponse, Versions } from './versions';
import { APIPromise } from '../../core/api-promise';
import {
  PagePromise,
  WorkflowVersionsPage,
  WorkflowsPage,
  type WorkflowsPageParams,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Workflows orchestrate one or more functions into a directed acyclic graph (DAG) for document processing.
 *
 * Use these endpoints to create, update, list, and manage workflows, and to invoke them
 * with file input via `POST /v3/workflows/{workflowName}/call`.
 *
 * The call endpoint accepts files as either multipart form data or JSON with base64-encoded
 * content. In the Bem CLI, use `@path/to/file` inside JSON values to automatically read and
 * encode files:
 *
 * ```
 * bem workflows call --workflow-name my-workflow \
 *   --input.single-file '{"inputContent": "@file.pdf", "inputType": "pdf"}' \
 *   --wait
 * ```
 */
export class Workflows extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create a Workflow
   */
  create(body: WorkflowCreateParams, options?: RequestOptions): APIPromise<Workflow> {
    return (
      this._client.post('/v3/workflows', { body, ...options }) as APIPromise<{ workflow: Workflow }>
    )._thenUnwrap((obj) => obj.workflow);
  }

  /**
   * Get a Workflow
   */
  retrieve(workflowName: string, options?: RequestOptions): APIPromise<WorkflowRetrieveResponse> {
    return this._client.get(path`/v3/workflows/${workflowName}`, options);
  }

  /**
   * Update a Workflow
   */
  update(
    workflowName: string,
    body: WorkflowUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowUpdateResponse> {
    return this._client.patch(path`/v3/workflows/${workflowName}`, { body, ...options });
  }

  /**
   * List Workflows
   */
  list(
    query: WorkflowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkflowsWorkflowsPage, Workflow> {
    return this._client.getAPIList('/v3/workflows', WorkflowsPage<Workflow>, { query, ...options });
  }

  /**
   * Delete a Workflow
   */
  delete(workflowName: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/workflows/${workflowName}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * **Invoke a workflow.**
   *
   * Submit the input file as either a multipart form request or a JSON request with
   * base64-encoded file content. The workflow name is derived from the URL path.
   *
   * ## Input Formats
   *
   * - **Multipart form** (`multipart/form-data`): attach the file directly via the
   *   `file` or `files` fields. Set `wait` in the form body to control synchronous
   *   behaviour.
   * - **JSON** (`application/json`): base64-encode the file content and set it in
   *   `input.singleFile.inputContent` or `input.batchFiles.inputs[*].inputContent`.
   *   Pass `wait=true` as a query parameter to control synchronous behaviour.
   *
   * ## Synchronous vs Asynchronous
   *
   * By default the call is created asynchronously and this endpoint returns
   * `202 Accepted` immediately with a `pending` call object. Set `wait` to `true` to
   * block until the call completes (up to 30 seconds):
   *
   * - On success: returns `200 OK` with the completed call, `outputs` populated
   * - On failure: returns `500 Internal Server Error` with the call and an `error`
   *   message
   * - On timeout: returns `202 Accepted` with the still-running call
   *
   * ## Tracking
   *
   * Poll `GET /v3/calls/{callID}` to check status, or configure a webhook
   * subscription to receive events when the call finishes.
   *
   * ## CLI Usage
   *
   * Use `@path/to/file` inside JSON string values to embed file contents
   * automatically. Binary files (PDF, images, audio) are base64-encoded; text files
   * are embedded as strings.
   *
   * Single file (synchronous):
   *
   * ```bash
   * bem workflows call \
   *   --workflow-name my-workflow \
   *   --input.single-file '{"inputContent": "@invoice.pdf", "inputType": "pdf"}' \
   *   --wait
   * ```
   *
   * Single file (asynchronous, returns callID immediately):
   *
   * ```bash
   * bem workflows call \
   *   --workflow-name my-workflow \
   *   --input.single-file '{"inputContent": "@invoice.pdf", "inputType": "pdf"}'
   * ```
   *
   * Batch files:
   *
   * ```bash
   * bem workflows call \
   *   --workflow-name my-workflow \
   *   --input.batch-files '{"inputs": [{"inputContent": "@a.pdf", "inputType": "pdf"}, {"inputContent": "@b.png", "inputType": "png"}]}'
   * ```
   *
   * Alternative: pass the full `--input` flag as JSON:
   *
   * ```bash
   * bem workflows call \
   *   --workflow-name my-workflow \
   *   --input '{"singleFile": {"inputContent": "@invoice.pdf", "inputType": "pdf"}}' \
   *   --wait
   * ```
   *
   * **Important:** `--wait` is a boolean flag. Use `--wait` or `--wait=true`. Do
   * **not** use `--wait true` (with a space) — the `true` will be parsed as an
   * unexpected positional argument.
   *
   * Supported `inputType` values: csv, docx, email, heic, heif, html, jpeg, json,
   * m4a, mp3, pdf, png, text, wav, webp, xls, xlsx, xml.
   */
  call(
    workflowName: string,
    params: WorkflowCallParams,
    options?: RequestOptions,
  ): APIPromise<CallsAPI.CallGetResponse> {
    const { wait, ...body } = params;
    return this._client.post(
      path`/v3/workflows/${workflowName}/call`,
      maybeMultipartFormRequestOptions({ query: { wait }, body, ...options }, this._client),
    );
  }

  /**
   * Copy a Workflow
   */
  copy(body: WorkflowCopyParams, options?: RequestOptions): APIPromise<WorkflowCopyResponse> {
    return this._client.post('/v3/workflows/copy', { body, ...options });
  }
}

export type WorkflowsWorkflowsPage = WorkflowsPage<Workflow>;

export type WorkflowsWorkflowVersionsPage = WorkflowVersionsPage<Workflow>;

export interface FunctionVersionIdentifier {
  /**
   * Unique identifier of function. Provide either id or name, not both.
   */
  id?: string;

  /**
   * Name of function. Must be UNIQUE on a per-environment basis. Provide either id
   * or name, not both.
   */
  name?: string;

  /**
   * Version number of function.
   */
  versionNum?: number;
}

/**
 * V3 read representation of a workflow version.
 */
export interface Workflow {
  /**
   * Unique identifier of the workflow.
   */
  id: string;

  /**
   * Connectors currently attached to this workflow. For version-scoped reads
   * (`/versions/{n}`) this is always empty — connectors are current-state and not
   * part of version history.
   */
  connectors: Array<Workflow.Connector>;

  /**
   * The date and time the workflow was created.
   */
  createdAt: string;

  /**
   * All directed edges in this workflow version's DAG.
   */
  edges: Array<WorkflowEdgeResponse>;

  /**
   * Name of the entry-point call-site node.
   */
  mainNodeName: string;

  /**
   * Unique name of the workflow within the environment.
   */
  name: string;

  /**
   * All call-site nodes in this workflow version's DAG.
   */
  nodes: Array<WorkflowNodeResponse>;

  /**
   * The date and time the workflow was last updated.
   */
  updatedAt: string;

  /**
   * Version number of this workflow version.
   */
  versionNum: number;

  /**
   * Audit trail information.
   */
  audit?: WorkflowAudit;

  /**
   * Human-readable display name.
   */
  displayName?: string;

  /**
   * Inbound email address associated with the workflow, if any.
   */
  emailAddress?: string;

  /**
   * Tags associated with the workflow.
   */
  tags?: Array<string>;
}

export namespace Workflow {
  /**
   * A connector attached to a workflow. Ingestion point that triggers the workflow.
   */
  export interface Connector {
    /**
     * Unique connector API ID.
     */
    connectorID: string;

    /**
     * Human-friendly connector name.
     */
    name: string;

    /**
     * Discriminator for a workflow connector. V3 supports `paragon` only.
     */
    type: 'paragon';

    /**
     * Paragon-integration configuration on a workflow connector.
     */
    paragon?: Connector.Paragon;
  }

  export namespace Connector {
    /**
     * Paragon-integration configuration on a workflow connector.
     */
    export interface Paragon {
      /**
       * Opaque per-integration configuration (e.g. `{"folderId": "..."}`).
       */
      configuration: unknown;

      /**
       * Paragon integration key (e.g. "googledrive").
       */
      integration: string;

      /**
       * Paragon sync ID managed by the server. Read-only.
       */
      syncID: string;
    }
  }
}

export interface WorkflowAudit {
  /**
   * Information about who created the current version.
   */
  versionCreatedBy?: FunctionsAPI.UserActionSummary;

  /**
   * Information about who created the workflow.
   */
  workflowCreatedBy?: FunctionsAPI.UserActionSummary;

  /**
   * Information about who last updated the workflow.
   */
  workflowLastUpdatedBy?: FunctionsAPI.UserActionSummary;
}

/**
 * Read representation of a directed edge between call-site nodes.
 */
export interface WorkflowEdgeResponse {
  /**
   * Name of the destination node.
   */
  destinationNodeName: string;

  /**
   * Name of the source node.
   */
  sourceNodeName: string;

  /**
   * Labelled outlet on the source node, if any.
   */
  destinationName?: string;

  /**
   * Opaque free-form JSON object attached to this edge on create/update. Returned
   * verbatim; never interpreted by the server.
   */
  metadata?: unknown;
}

/**
 * Read representation of a call-site node.
 */
export interface WorkflowNodeResponse {
  /**
   * Function (and version) executing at this call site.
   */
  function: FunctionVersionIdentifier;

  /**
   * Name of this call site, unique within the workflow version.
   */
  name: string;

  /**
   * Opaque free-form JSON object attached to this node on create/update. Returned
   * verbatim; never interpreted by the server.
   */
  metadata?: unknown;
}

export interface WorkflowRetrieveResponse {
  /**
   * Error message if the workflow retrieval failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: Workflow;
}

export interface WorkflowUpdateResponse {
  /**
   * Per-connector failures from the diff/apply phase. Empty or omitted when all
   * operations succeeded.
   */
  connectorErrors?: Array<WorkflowUpdateResponse.ConnectorError>;

  /**
   * Error message if the workflow update failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: Workflow;
}

export namespace WorkflowUpdateResponse {
  /**
   * Per-connector failure surfaced alongside a successful workflow DAG save.
   */
  export interface ConnectorError {
    /**
     * Machine-readable error code.
     */
    code: string;

    /**
     * Human-readable error message.
     */
    message: string;

    /**
     * Which diff operation was attempted.
     */
    operation: 'create' | 'update' | 'delete';

    /**
     * Populated for update/delete failures.
     */
    connectorID?: string;

    /**
     * Populated for create failures.
     */
    name?: string;
  }
}

export interface WorkflowCopyResponse {
  /**
   * Functions that were copied when copying to a different environment. Empty when
   * copying within the same environment.
   */
  copiedFunctions?: Array<WorkflowCopyResponse.CopiedFunction>;

  /**
   * The environment the workflow was copied to.
   */
  environment?: string;

  /**
   * Error message if the workflow copy failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: Workflow;
}

export namespace WorkflowCopyResponse {
  export interface CopiedFunction {
    /**
     * ID of the source function that was copied.
     */
    sourceFunctionID: string;

    /**
     * Name of the source function that was copied.
     */
    sourceFunctionName: string;

    /**
     * Version number of the source function that was copied.
     */
    sourceVersionNum: number;

    /**
     * ID of the newly created function in the target environment.
     */
    targetFunctionID: string;

    /**
     * Name of the newly created function in the target environment.
     */
    targetFunctionName: string;

    /**
     * Version number of the newly created function in the target environment.
     */
    targetVersionNum: number;
  }
}

export interface WorkflowCreateParams {
  /**
   * Name of the entry-point node. Must not be a destination of any edge.
   */
  mainNodeName: string;

  /**
   * Unique name for the workflow. Must match `^[a-zA-Z0-9_-]{1,128}$`.
   */
  name: string;

  /**
   * Call-site nodes in the DAG. At least one is required.
   */
  nodes: Array<WorkflowCreateParams.Node>;

  /**
   * Connectors to attach to the workflow at creation. If any entry fails to
   * provision, the entire workflow creation is rolled back.
   */
  connectors?: Array<WorkflowCreateParams.Connector>;

  /**
   * Human-readable display name.
   */
  displayName?: string;

  /**
   * Directed edges between nodes. Omit or leave empty for single-node workflows.
   */
  edges?: Array<WorkflowCreateParams.Edge>;

  /**
   * Tags to categorize and organize the workflow.
   */
  tags?: Array<string>;
}

export namespace WorkflowCreateParams {
  /**
   * A single function call-site node in a workflow DAG.
   */
  export interface Node {
    /**
     * The function (and version) to execute at this call site.
     */
    function: WorkflowsAPI.FunctionVersionIdentifier;

    /**
     * Opaque free-form JSON object attached to this node. Stored and returned
     * verbatim; the server does not interpret it. Intended for client-side concerns
     * such as canvas display properties (position, color, collapsed state, etc.).
     */
    metadata?: unknown;

    /**
     * Name for this call site. Must be unique within the workflow version. Defaults to
     * the function's own name when omitted.
     */
    name?: string;
  }

  /**
   * Create/update entry for a connector inline with the workflow.
   */
  export interface Connector {
    /**
     * Human-friendly connector name.
     */
    name: string;

    /**
     * Discriminator for a workflow connector. V3 supports `paragon` only.
     */
    type: 'paragon';

    /**
     * Present → update. Absent → create.
     */
    connectorID?: string;

    /**
     * Request-side config block for a Paragon connector. Fields absent on update are
     * unchanged.
     */
    paragon?: Connector.Paragon;
  }

  export namespace Connector {
    /**
     * Request-side config block for a Paragon connector. Fields absent on update are
     * unchanged.
     */
    export interface Paragon {
      /**
       * Opaque per-integration configuration. Required on create.
       */
      configuration?: unknown;

      /**
       * Paragon integration key. Required on create.
       */
      integration?: string;
    }
  }

  /**
   * A directed edge between two named call-site nodes.
   */
  export interface Edge {
    /**
     * Name of the destination node.
     */
    destinationNodeName: string;

    /**
     * Name of the source node.
     */
    sourceNodeName: string;

    /**
     * Labelled outlet on the source node that activates this edge. Omit for the
     * default (unlabelled) outlet.
     */
    destinationName?: string;

    /**
     * Opaque free-form JSON object attached to this edge. Stored and returned
     * verbatim; the server does not interpret it.
     */
    metadata?: unknown;
  }
}

export interface WorkflowUpdateParams {
  /**
   * Declarative, full-desired-state array of connectors. If omitted, existing
   * connectors are left unchanged. If provided, it replaces the current set: entries
   * with `connectorID` are updates, entries without are creates, and existing
   * connectors whose `connectorID` is absent are deleted.
   */
  connectors?: Array<WorkflowUpdateParams.Connector>;

  /**
   * Human-readable display name.
   */
  displayName?: string;

  edges?: Array<WorkflowUpdateParams.Edge>;

  /**
   * `mainNodeName`, `nodes`, and `edges` must be provided together to update the DAG
   * topology. If none are provided the topology is copied unchanged from the current
   * version.
   */
  mainNodeName?: string;

  /**
   * New name for the workflow (renames it). Must match `^[a-zA-Z0-9_-]{1,128}$`.
   */
  name?: string;

  nodes?: Array<WorkflowUpdateParams.Node>;

  /**
   * Tags to categorize and organize the workflow.
   */
  tags?: Array<string>;
}

export namespace WorkflowUpdateParams {
  /**
   * Create/update entry for a connector inline with the workflow.
   */
  export interface Connector {
    /**
     * Human-friendly connector name.
     */
    name: string;

    /**
     * Discriminator for a workflow connector. V3 supports `paragon` only.
     */
    type: 'paragon';

    /**
     * Present → update. Absent → create.
     */
    connectorID?: string;

    /**
     * Request-side config block for a Paragon connector. Fields absent on update are
     * unchanged.
     */
    paragon?: Connector.Paragon;
  }

  export namespace Connector {
    /**
     * Request-side config block for a Paragon connector. Fields absent on update are
     * unchanged.
     */
    export interface Paragon {
      /**
       * Opaque per-integration configuration. Required on create.
       */
      configuration?: unknown;

      /**
       * Paragon integration key. Required on create.
       */
      integration?: string;
    }
  }

  /**
   * A directed edge between two named call-site nodes.
   */
  export interface Edge {
    /**
     * Name of the destination node.
     */
    destinationNodeName: string;

    /**
     * Name of the source node.
     */
    sourceNodeName: string;

    /**
     * Labelled outlet on the source node that activates this edge. Omit for the
     * default (unlabelled) outlet.
     */
    destinationName?: string;

    /**
     * Opaque free-form JSON object attached to this edge. Stored and returned
     * verbatim; the server does not interpret it.
     */
    metadata?: unknown;
  }

  /**
   * A single function call-site node in a workflow DAG.
   */
  export interface Node {
    /**
     * The function (and version) to execute at this call site.
     */
    function: WorkflowsAPI.FunctionVersionIdentifier;

    /**
     * Opaque free-form JSON object attached to this node. Stored and returned
     * verbatim; the server does not interpret it. Intended for client-side concerns
     * such as canvas display properties (position, color, collapsed state, etc.).
     */
    metadata?: unknown;

    /**
     * Name for this call site. Must be unique within the workflow version. Defaults to
     * the function's own name when omitted.
     */
    name?: string;
  }
}

export interface WorkflowListParams extends WorkflowsPageParams {
  displayName?: string;

  functionIDs?: Array<string>;

  functionNames?: Array<string>;

  sortOrder?: 'asc' | 'desc';

  tags?: Array<string>;

  workflowIDs?: Array<string>;

  workflowNames?: Array<string>;
}

export interface WorkflowCallParams {
  /**
   * Body param: Input file(s) for a call. Provide exactly one of `singleFile` or
   * `batchFiles`.
   *
   * In the CLI, use the nested flags `--input.single-file` or `--input.batch-files`
   * with `@path/to/file` for automatic file embedding:
   * `--input.single-file '{"inputContent": "@invoice.pdf", "inputType": "pdf"}' --wait`
   */
  input: WorkflowCallParams.Input;

  /**
   * Query param: Block until the call completes (up to 30 seconds) and return the
   * finished call object. Default: `false`. This is a boolean flag — use `--wait` or
   * `--wait=true`, not `--wait true`.
   */
  wait?: boolean;

  /**
   * Body param: Your reference ID for tracking this call.
   */
  callReferenceID?: string;

  /**
   * Body param: Arbitrary JSON object attached to this call. Stored on the call
   * record and injected into `transformedContent` under the reserved `_metadata` key
   * (alongside `referenceID`). Must be a JSON object. Maximum size: 4 KB.
   */
  metadata?: unknown;
}

export namespace WorkflowCallParams {
  /**
   * Input file(s) for a call. Provide exactly one of `singleFile` or `batchFiles`.
   *
   * In the CLI, use the nested flags `--input.single-file` or `--input.batch-files`
   * with `@path/to/file` for automatic file embedding:
   * `--input.single-file '{"inputContent": "@invoice.pdf", "inputType": "pdf"}' --wait`
   */
  export interface Input {
    /**
     * Multiple files to process in one call. Each item in the `inputs` array has its
     * own `inputContent` and `inputType`.
     */
    batchFiles?: Input.BatchFiles;

    /**
     * A single file input with base64-encoded content.
     *
     * When using the Bem CLI, use `@path/to/file` in the `inputContent` field to
     * automatically read and base64-encode the file:
     * `--input.single-file '{"inputContent": "@file.pdf", "inputType": "pdf"}' --wait`
     */
    singleFile?: Input.SingleFile;
  }

  export namespace Input {
    /**
     * Multiple files to process in one call. Each item in the `inputs` array has its
     * own `inputContent` and `inputType`.
     */
    export interface BatchFiles {
      inputs?: Array<BatchFiles.Input>;
    }

    export namespace BatchFiles {
      export interface Input {
        /**
         * Base64-encoded file content. In the Bem CLI, use `@path/to/file` to embed file
         * contents automatically.
         */
        inputContent: string;

        /**
         * The input type of the content you're sending for transformation.
         */
        inputType:
          | 'csv'
          | 'docx'
          | 'email'
          | 'heic'
          | 'html'
          | 'jpeg'
          | 'json'
          | 'heif'
          | 'm4a'
          | 'mp3'
          | 'pdf'
          | 'png'
          | 'text'
          | 'wav'
          | 'webp'
          | 'xls'
          | 'xlsx'
          | 'xml';

        itemReferenceID?: string;
      }
    }

    /**
     * A single file input with base64-encoded content.
     *
     * When using the Bem CLI, use `@path/to/file` in the `inputContent` field to
     * automatically read and base64-encode the file:
     * `--input.single-file '{"inputContent": "@file.pdf", "inputType": "pdf"}' --wait`
     */
    export interface SingleFile {
      /**
       * Base64-encoded file content. In the Bem CLI, use `@path/to/file` to embed file
       * contents automatically.
       */
      inputContent: string;

      /**
       * The input type of the content you're sending for transformation.
       */
      inputType:
        | 'csv'
        | 'docx'
        | 'email'
        | 'heic'
        | 'html'
        | 'jpeg'
        | 'json'
        | 'heif'
        | 'm4a'
        | 'mp3'
        | 'pdf'
        | 'png'
        | 'text'
        | 'wav'
        | 'webp'
        | 'xls'
        | 'xlsx'
        | 'xml';
    }
  }
}

export interface WorkflowCopyParams {
  /**
   * Name of the source workflow to copy from.
   */
  sourceWorkflowName: string;

  /**
   * Name for the new copied workflow. Must be unique within the target environment.
   */
  targetWorkflowName: string;

  /**
   * Optional version number of the source workflow to copy. If not provided, copies
   * the current version.
   */
  sourceWorkflowVersionNum?: number;

  /**
   * Optional tags for the copied workflow. If not provided, uses the source
   * workflow's tags.
   */
  tags?: Array<string>;

  /**
   * Optional display name for the copied workflow. If not provided, uses the source
   * workflow's display name with " (Copy)" appended.
   */
  targetDisplayName?: string;

  /**
   * Optional target environment name. If provided, copies the workflow to a
   * different environment. When copying to a different environment, all functions
   * used in the workflow will also be copied.
   */
  targetEnvironment?: string;
}

Workflows.Versions = Versions;

export declare namespace Workflows {
  export {
    type FunctionVersionIdentifier as FunctionVersionIdentifier,
    type Workflow as Workflow,
    type WorkflowAudit as WorkflowAudit,
    type WorkflowEdgeResponse as WorkflowEdgeResponse,
    type WorkflowNodeResponse as WorkflowNodeResponse,
    type WorkflowRetrieveResponse as WorkflowRetrieveResponse,
    type WorkflowUpdateResponse as WorkflowUpdateResponse,
    type WorkflowCopyResponse as WorkflowCopyResponse,
    type WorkflowsWorkflowsPage as WorkflowsWorkflowsPage,
    type WorkflowCreateParams as WorkflowCreateParams,
    type WorkflowUpdateParams as WorkflowUpdateParams,
    type WorkflowListParams as WorkflowListParams,
    type WorkflowCallParams as WorkflowCallParams,
    type WorkflowCopyParams as WorkflowCopyParams,
  };

  export {
    Versions as Versions,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
  };
}
