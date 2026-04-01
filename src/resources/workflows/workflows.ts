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

export interface Workflow {
  /**
   * Unique identifier of workflow.
   */
  id: string;

  mainFunction: FunctionVersionIdentifier;

  /**
   * Unique name of workflow. Must be UNIQUE on a per-environment basis.
   */
  name: string;

  /**
   * Version number of workflow version.
   */
  versionNum: number;

  /**
   * Audit trail information for the workflow.
   */
  audit?: Workflow.Audit;

  /**
   * The date and time the workflow was created.
   */
  createdAt?: string;

  /**
   * Display name of workflow.
   */
  displayName?: string;

  /**
   * Email address of workflow.
   */
  emailAddress?: string;

  relationships?: Array<Workflow.Relationship>;

  /**
   * Array of tags to categorize and organize workflows.
   */
  tags?: Array<string>;

  /**
   * The date and time the workflow was last updated.
   */
  updatedAt?: string;
}

export namespace Workflow {
  /**
   * Audit trail information for the workflow.
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

  export interface Relationship {
    destinationFunction: WorkflowsAPI.FunctionVersionIdentifier;

    sourceFunction: WorkflowsAPI.FunctionVersionIdentifier;

    /**
     * Name of destination.
     */
    destinationName?: string;
  }
}

export interface WorkflowRequestRelationship {
  destinationFunction: FunctionVersionIdentifier;

  sourceFunction: FunctionVersionIdentifier;

  /**
   * Name of destination.
   */
  destinationName?: string;
}

export interface WorkflowCreateResponse {
  /**
   * Error message if the workflow creation failed.
   */
  error?: string;

  workflow?: Workflow;
}

export interface WorkflowRetrieveResponse {
  /**
   * Error message if the workflow retrieval failed.
   */
  error?: string;

  workflow?: Workflow;
}

export interface WorkflowUpdateResponse {
  /**
   * Error message if the workflow update failed.
   */
  error?: string;

  workflow?: Workflow;
}

export interface WorkflowCopyResponse {
  /**
   * Information about functions that were copied when copying to a different
   * environment. Empty when copying within the same environment.
   */
  copiedFunctions?: Array<WorkflowCopyResponse.CopiedFunction>;

  /**
   * The environment where the workflow was copied to.
   */
  environment?: string;

  /**
   * Error message if the workflow copy failed.
   */
  error?: string;

  /**
   * The newly created workflow.
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
   * Display name of workflow.
   */
  displayName?: string;

  /**
   * Main function for the workflow. The `mainFunction` and `relationships` fields
   * act as a unit and must be provided together, or neither provided.
   *
   * - If `mainFunction` is provided without `relationships`, relationships will
   *   default to an empty array.
   * - If `relationships` is provided, `mainFunction` must also be provided
   *   (validation error if missing).
   * - If neither is provided, both mainFunction and relationships remain unchanged
   *   from the current workflow version.
   */
  mainFunction?: FunctionVersionIdentifier;

  /**
   * Name of workflow. Can be updated to rename the workflow. Must be unique within
   * the environment and match the pattern ^[a-zA-Z0-9_-]{1,128}$.
   */
  name?: string;

  /**
   * Relationships between functions in the workflow. The `mainFunction` and
   * `relationships` fields act as a unit and must be provided together, or neither
   * provided.
   *
   * - If `relationships` is provided, `mainFunction` must also be provided
   *   (validation error if missing).
   * - If `mainFunction` is provided without `relationships`, relationships will
   *   default to an empty array.
   * - If neither is provided, both mainFunction and relationships remain unchanged
   *   from the current workflow version.
   */
  relationships?: Array<WorkflowRequestRelationship>;

  /**
   * Array of tags to categorize and organize workflows.
   */
  tags?: Array<string>;
}

export interface WorkflowUpdateParams {
  /**
   * Display name of workflow.
   */
  displayName?: string;

  /**
   * Main function for the workflow. The `mainFunction` and `relationships` fields
   * act as a unit and must be provided together, or neither provided.
   *
   * - If `mainFunction` is provided without `relationships`, relationships will
   *   default to an empty array.
   * - If `relationships` is provided, `mainFunction` must also be provided
   *   (validation error if missing).
   * - If neither is provided, both mainFunction and relationships remain unchanged
   *   from the current workflow version.
   */
  mainFunction?: FunctionVersionIdentifier;

  /**
   * Name of workflow. Can be updated to rename the workflow. Must be unique within
   * the environment and match the pattern ^[a-zA-Z0-9_-]{1,128}$.
   */
  name?: string;

  /**
   * Relationships between functions in the workflow. The `mainFunction` and
   * `relationships` fields act as a unit and must be provided together, or neither
   * provided.
   *
   * - If `relationships` is provided, `mainFunction` must also be provided
   *   (validation error if missing).
   * - If `mainFunction` is provided without `relationships`, relationships will
   *   default to an empty array.
   * - If neither is provided, both mainFunction and relationships remain unchanged
   *   from the current workflow version.
   */
  relationships?: Array<WorkflowRequestRelationship>;

  /**
   * Array of tags to categorize and organize workflows.
   */
  tags?: Array<string>;
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
  files?: Array<string>;

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
    type Workflow as Workflow,
    type WorkflowRequestRelationship as WorkflowRequestRelationship,
    type WorkflowCreateResponse as WorkflowCreateResponse,
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
