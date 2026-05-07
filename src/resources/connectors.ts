// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Connectors are integrations that trigger a Bem workflow from an external system.
 *
 * A connector binds an inbound source — currently Box or a Paragon-managed integration such as
 * Google Drive — to a specific workflow (by `workflowName` or `workflowID`). When the source
 * observes a new file, Bem invokes the bound workflow against that file.
 *
 * Use these endpoints to create, list, and remove connectors. The fields used at create time
 * depend on the connector `type`: Box connectors require Box credentials and a folder to watch,
 * while Paragon connectors carry a `paragonIntegration` identifier and an integration-specific
 * `paragonConfiguration` object (for example, `{ "folderId": "..." }` for Google Drive).
 */
export class Connectors extends APIResource {
  /**
   * Create a Connector
   *
   * @example
   * ```ts
   * const connector = await client.connectors.create({
   *   name: 'Box → Invoice workflow',
   *   type: 'paragon',
   *   paragonConfiguration: {
   *     folderId: 'YOUR_GOOGLE_DRIVE_FOLDER_ID',
   *   },
   *   paragonIntegration: 'googledrive',
   *   workflowID: 'wf_2N6gH8ZKCmvb6BnFcGqhKJ98VzP',
   * });
   * ```
   */
  create(body: ConnectorCreateParams, options?: RequestOptions): APIPromise<Connector> {
    return this._client.post('/v3/connectors', { body, ...options });
  }

  /**
   * List Connectors
   *
   * @example
   * ```ts
   * const connectors = await client.connectors.list();
   * ```
   */
  list(
    query: ConnectorListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectorListResponse> {
    return this._client.get('/v3/connectors', { query, ...options });
  }

  /**
   * Delete a Connector
   *
   * @example
   * ```ts
   * const connector = await client.connectors.delete(
   *   'connectorID',
   * );
   * ```
   */
  delete(connectorID: string, options?: RequestOptions): APIPromise<string> {
    return this._client.delete(path`/v3/connectors/${connectorID}`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
  }
}

/**
 * A Connector represents an integration that triggers a Bem workflow from an
 * external system.
 */
export interface Connector {
  /**
   * Box client ID (from your Box application).
   */
  boxClientID: string;

  /**
   * Box client secret (from your Box application).
   *
   * Note: This value is sensitive and should be stored securely.
   */
  boxClientSecret: string;

  /**
   * Box enterprise ID.
   */
  boxEnterpriseID: string;

  /**
   * Box folder ID to watch for new uploads.
   */
  boxFolderID: string;

  /**
   * Unique identifier for the connector.
   */
  connectorID: string;

  /**
   * Human-friendly name for this connector.
   */
  name: string;

  /**
   * Configuration specific to the type of integration.
   */
  paragonConfiguration: unknown;

  /**
   * Paragon integration, eg. "googledrive".
   */
  paragonIntegration: string;

  /**
   * Paragon sync ID.
   */
  paragonSyncID: string;

  /**
   * Connector type.
   */
  type: ConnectorType;

  /**
   * Workflow API ID that will be triggered by this connector.
   */
  workflowID: string;

  /**
   * Workflow name that will be triggered by this connector.
   */
  workflowName: string;
}

/**
 * Connector type.
 */
export type ConnectorType = 'box' | 'paragon';

/**
 * Response body for listing connectors.
 */
export interface ConnectorListResponse {
  connectors: Array<Connector>;
}

export type ConnectorDeleteResponse = string;

export interface ConnectorCreateParams {
  /**
   * Human-friendly name for this connector.
   */
  name: string;

  /**
   * Connector type.
   */
  type: ConnectorType;

  /**
   * Box client ID (from your Box application).
   */
  boxClientID?: string;

  /**
   * Box client secret (from your Box application).
   */
  boxClientSecret?: string;

  /**
   * Box enterprise ID.
   */
  boxEnterpriseID?: string;

  /**
   * Box folder ID to watch for new uploads.
   */
  boxFolderID?: string;

  /**
   * Configuration specific to the type of integration.
   */
  paragonConfiguration?: unknown;

  /**
   * Paragon integration, eg. "googledrive".
   */
  paragonIntegration?: string;

  /**
   * One of `workflowID` or `workflowName` must be provided.
   *
   * If both are provided, they must refer to the same workflow.
   */
  workflowID?: string;

  /**
   * One of `workflowID` or `workflowName` must be provided.
   *
   * If both are provided, they must refer to the same workflow.
   */
  workflowName?: string;
}

export interface ConnectorListParams {
  /**
   * Filter connectors by workflow API ID (e.g. `wf_...`).
   *
   * If both `workflowID` and `workflowName` are provided, results must match both.
   */
  workflowID?: string;

  /**
   * Filter connectors by workflow name (exact match).
   *
   * If both `workflowID` and `workflowName` are provided, results must match both.
   */
  workflowName?: string;
}

export declare namespace Connectors {
  export {
    type Connector as Connector,
    type ConnectorType as ConnectorType,
    type ConnectorListResponse as ConnectorListResponse,
    type ConnectorDeleteResponse as ConnectorDeleteResponse,
    type ConnectorCreateParams as ConnectorCreateParams,
    type ConnectorListParams as ConnectorListParams,
  };
}
