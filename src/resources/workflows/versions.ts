// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkflowsAPI from './workflows';
import { WorkflowsWorkflowVersionsPage } from './workflows';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, WorkflowVersionsPage, type WorkflowVersionsPageParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
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
export class Versions extends APIResource {
  /**
   * **Retrieve a specific historical version of a workflow.**
   *
   * Versions are immutable. Use this endpoint to see what a workflow looked like at
   * the moment a particular call was made — every call record carries the workflow
   * `versionNum` it ran against.
   */
  retrieve(
    versionNum: number,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<VersionRetrieveResponse> {
    const { workflowName } = params;
    return this._client.get(path`/v3/workflows/${workflowName}/versions/${versionNum}`, options);
  }

  /**
   * **List every version of a workflow.**
   *
   * Versions are immutable. Each row captures what the workflow looked like between
   * updates: graph topology, metadata, and timestamps. Returns newest-first by
   * default. Cursor pagination via `startingAfter` / `endingBefore` over
   * `versionNum`.
   */
  list(
    workflowName: string,
    query: VersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<WorkflowsWorkflowVersionsPage, WorkflowsAPI.Workflow> {
    return this._client.getAPIList(
      path`/v3/workflows/${workflowName}/versions`,
      WorkflowVersionsPage<WorkflowsAPI.Workflow>,
      { query, ...options },
    );
  }
}

export interface VersionRetrieveResponse {
  /**
   * Error message if the workflow version retrieval failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: WorkflowsAPI.Workflow;
}

export interface VersionRetrieveParams {
  workflowName: string;
}

export interface VersionListParams extends WorkflowVersionsPageParams {
  sortOrder?: 'asc' | 'desc';
}

export declare namespace Versions {
  export {
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
  };
}

export { type WorkflowsWorkflowVersionsPage };
