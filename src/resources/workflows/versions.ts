// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WorkflowsAPI from './workflows';
import { WorkflowsWorkflowVersionsPage } from './workflows';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, WorkflowVersionsPage, type WorkflowVersionsPageParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Workflow operations
 */
export class Versions extends APIResource {
  /**
   * Get a Workflow Version
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
   * List Workflow Versions
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
