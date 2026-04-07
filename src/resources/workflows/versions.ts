// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from '../functions/functions';
import * as WorkflowsAPI from './workflows';
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
  ): PagePromise<VersionListResponsesWorkflowVersionsPage, VersionListResponse> {
    return this._client.getAPIList(
      path`/v3/workflows/${workflowName}/versions`,
      WorkflowVersionsPage<VersionListResponse>,
      { query, ...options },
    );
  }
}

export type VersionListResponsesWorkflowVersionsPage = WorkflowVersionsPage<VersionListResponse>;

export interface VersionRetrieveResponse {
  /**
   * Error message if the workflow version retrieval failed.
   */
  error?: string;

  /**
   * V3 read representation of a workflow version.
   */
  workflow?: VersionRetrieveResponse.Workflow;
}

export namespace VersionRetrieveResponse {
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
export interface VersionListResponse {
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
  edges: Array<VersionListResponse.Edge>;

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
  nodes: Array<VersionListResponse.Node>;

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
  audit?: VersionListResponse.Audit;

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

export namespace VersionListResponse {
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

export interface VersionRetrieveParams {
  workflowName: string;
}

export interface VersionListParams extends WorkflowVersionsPageParams {
  sortOrder?: 'asc' | 'desc';
}

export declare namespace Versions {
  export {
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionListResponse as VersionListResponse,
    type VersionListResponsesWorkflowVersionsPage as VersionListResponsesWorkflowVersionsPage,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
  };
}
