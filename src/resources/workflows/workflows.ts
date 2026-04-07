// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkflowsAPI from './workflows';
import * as CallsAPI from '../calls';
import * as FunctionsAPI from '../functions/functions';
import * as VersionsAPI from './versions';
import {
  VersionListParams,
  VersionListResponse,
  VersionListResponsesWorkflowVersionsPage,
  VersionRetrieveParams,
  VersionRetrieveResponse,
  Versions,
} from './versions';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, WorkflowsPage, type WorkflowsPageParams } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Workflow operations
 */
export class Workflows extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create a Workflow
   */
  create(body: WorkflowCreateParams, options?: RequestOptions): APIPromise<WorkflowCreateResponse> {
    return this._client.post('/v3/workflows', { body, ...options });
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
  ): PagePromise<WorkflowListResponsesWorkflowsPage, WorkflowListResponse> {
    return this._client.getAPIList('/v3/workflows', WorkflowsPage<WorkflowListResponse>, {
      query,
      ...options,
    });
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
   * **Invoke a workflow by submitting a multipart form request.**
   *
   * Workflows can only be called via multipart form in V3. Submit the input file
   * along with an optional reference ID for tracking.
   *
   * ## Synchronous vs Asynchronous
   *
   * By default the call is created asynchronously and this endpoint returns
   * `202 Accepted` immediately with a `pending` call object. Set the `wait` field to
   * `true` to block until the call completes (up to 30 seconds):
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
   */
  call(
    workflowName: string,
    body: WorkflowCallParams,
    options?: RequestOptions,
  ): APIPromise<CallsAPI.CallGetResponse> {
    return this._client.post(
      path`/v3/workflows/${workflowName}/call`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Copy a Workflow
   */
  copy(body: WorkflowCopyParams, options?: RequestOptions): APIPromise<WorkflowCopyResponse> {
    return this._client.post('/v3/workflows/copy', { body, ...options });
  }
}

export type WorkflowListResponsesWorkflowsPage = WorkflowsPage<WorkflowListResponse>;

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

export interface WorkflowCreateResponse {
  /**
   * Error message if the workflow creation failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: WorkflowCreateResponse.Workflow;
}

export namespace WorkflowCreateResponse {
  /**
   * V3 read representation of a workflow version.
   */
  export interface Workflow {
    /**
     * Unique identifier of the workflow.
     */
    id: string;

    /**
     * The date and time the workflow was created.
     */
    createdAt: string;

    /**
     * All directed edges in this workflow version's DAG.
     */
    edges: Array<Workflow.Edge>;

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
    nodes: Array<Workflow.Node>;

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
    audit?: Workflow.Audit;

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
     * Read representation of a directed edge between call-site nodes.
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
       * Labelled outlet on the source node, if any.
       */
      destinationName?: string;
    }

    /**
     * Read representation of a call-site node.
     */
    export interface Node {
      /**
       * Function (and version) executing at this call site.
       */
      function: WorkflowsAPI.FunctionVersionIdentifier;

      /**
       * Name of this call site, unique within the workflow version.
       */
      name: string;
    }

    /**
     * Audit trail information.
     */
    export interface Audit {
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
  }
}

export interface WorkflowRetrieveResponse {
  /**
   * Error message if the workflow retrieval failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: WorkflowRetrieveResponse.Workflow;
}

export namespace WorkflowRetrieveResponse {
  /**
   * V3 read representation of a workflow version.
   */
  export interface Workflow {
    /**
     * Unique identifier of the workflow.
     */
    id: string;

    /**
     * The date and time the workflow was created.
     */
    createdAt: string;

    /**
     * All directed edges in this workflow version's DAG.
     */
    edges: Array<Workflow.Edge>;

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
    nodes: Array<Workflow.Node>;

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
    audit?: Workflow.Audit;

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
     * Read representation of a directed edge between call-site nodes.
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
       * Labelled outlet on the source node, if any.
       */
      destinationName?: string;
    }

    /**
     * Read representation of a call-site node.
     */
    export interface Node {
      /**
       * Function (and version) executing at this call site.
       */
      function: WorkflowsAPI.FunctionVersionIdentifier;

      /**
       * Name of this call site, unique within the workflow version.
       */
      name: string;
    }

    /**
     * Audit trail information.
     */
    export interface Audit {
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
  }
}

export interface WorkflowUpdateResponse {
  /**
   * Error message if the workflow update failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: WorkflowUpdateResponse.Workflow;
}

export namespace WorkflowUpdateResponse {
  /**
   * V3 read representation of a workflow version.
   */
  export interface Workflow {
    /**
     * Unique identifier of the workflow.
     */
    id: string;

    /**
     * The date and time the workflow was created.
     */
    createdAt: string;

    /**
     * All directed edges in this workflow version's DAG.
     */
    edges: Array<Workflow.Edge>;

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
    nodes: Array<Workflow.Node>;

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
    audit?: Workflow.Audit;

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
     * Read representation of a directed edge between call-site nodes.
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
       * Labelled outlet on the source node, if any.
       */
      destinationName?: string;
    }

    /**
     * Read representation of a call-site node.
     */
    export interface Node {
      /**
       * Function (and version) executing at this call site.
       */
      function: WorkflowsAPI.FunctionVersionIdentifier;

      /**
       * Name of this call site, unique within the workflow version.
       */
      name: string;
    }

    /**
     * Audit trail information.
     */
    export interface Audit {
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
  }
}

/**
 * V3 read representation of a workflow version.
 */
export interface WorkflowListResponse {
  /**
   * Unique identifier of the workflow.
   */
  id: string;

  /**
   * The date and time the workflow was created.
   */
  createdAt: string;

  /**
   * All directed edges in this workflow version's DAG.
   */
  edges: Array<WorkflowListResponse.Edge>;

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
  nodes: Array<WorkflowListResponse.Node>;

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
  audit?: WorkflowListResponse.Audit;

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

export namespace WorkflowListResponse {
  /**
   * Read representation of a directed edge between call-site nodes.
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
     * Labelled outlet on the source node, if any.
     */
    destinationName?: string;
  }

  /**
   * Read representation of a call-site node.
   */
  export interface Node {
    /**
     * Function (and version) executing at this call site.
     */
    function: WorkflowsAPI.FunctionVersionIdentifier;

    /**
     * Name of this call site, unique within the workflow version.
     */
    name: string;
  }

  /**
   * Audit trail information.
   */
  export interface Audit {
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
  workflow?: WorkflowCopyResponse.Workflow;
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

  /**
   * V3 read representation of a workflow version.
   */
  export interface Workflow {
    /**
     * Unique identifier of the workflow.
     */
    id: string;

    /**
     * The date and time the workflow was created.
     */
    createdAt: string;

    /**
     * All directed edges in this workflow version's DAG.
     */
    edges: Array<Workflow.Edge>;

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
    nodes: Array<Workflow.Node>;

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
    audit?: Workflow.Audit;

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
     * Read representation of a directed edge between call-site nodes.
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
       * Labelled outlet on the source node, if any.
       */
      destinationName?: string;
    }

    /**
     * Read representation of a call-site node.
     */
    export interface Node {
      /**
       * Function (and version) executing at this call site.
       */
      function: WorkflowsAPI.FunctionVersionIdentifier;

      /**
       * Name of this call site, unique within the workflow version.
       */
      name: string;
    }

    /**
     * Audit trail information.
     */
    export interface Audit {
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
     * Name for this call site. Must be unique within the workflow version. Defaults to
     * the function's own name when omitted.
     */
    name?: string;
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
  }
}

export interface WorkflowUpdateParams {
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
   * Your reference ID for tracking this call.
   */
  callReferenceID?: string;

  /**
   * Single input file (for transform, analyze, route, and split functions).
   */
  file?: unknown;

  /**
   * Multiple input files (for join functions).
   */
  files?: Array<unknown>;

  /**
   * When `true`, the endpoint blocks until the call completes (up to 30 seconds) and
   * returns the finished call object. Default: `false`.
   */
  wait?: string;
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
    type WorkflowCreateResponse as WorkflowCreateResponse,
    type WorkflowRetrieveResponse as WorkflowRetrieveResponse,
    type WorkflowUpdateResponse as WorkflowUpdateResponse,
    type WorkflowListResponse as WorkflowListResponse,
    type WorkflowCopyResponse as WorkflowCopyResponse,
    type WorkflowListResponsesWorkflowsPage as WorkflowListResponsesWorkflowsPage,
    type WorkflowCreateParams as WorkflowCreateParams,
    type WorkflowUpdateParams as WorkflowUpdateParams,
    type WorkflowListParams as WorkflowListParams,
    type WorkflowCallParams as WorkflowCallParams,
    type WorkflowCopyParams as WorkflowCopyParams,
  };

  export {
    Versions as Versions,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionListResponse as VersionListResponse,
    type VersionListResponsesWorkflowVersionsPage as VersionListResponsesWorkflowVersionsPage,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
  };
}
