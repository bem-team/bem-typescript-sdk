// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Subscriptions wire up notifications for the events your functions and collections produce.
 *
 * Most subscriptions target a single function (by `functionName` or `functionID`) or a single
 * collection (by `collectionName` or `collectionID`) and select a `type` corresponding to the
 * event you want to receive — for example `transform`, `route`, `join`, `evaluation`, `error`,
 * `enrich`, or `collection_processing`.
 *
 * Entity-lifecycle events are account-wide and target no function or collection. Set `type` to
 * one of the following and provide a `webhookURL` (these event types support webhook delivery
 * only):
 *
 * - `entity_proposed` — an entity entered the `proposed` curation status (queued for review).
 * - `entity_validated` — an entity was approved/validated by a reviewer.
 * - `entity_rejected` — an entity was rejected by a reviewer.
 *
 * Each entity-lifecycle delivery is a JSON POST describing the transition (`entityID`,
 * `typeName`, `priorStatus`, `newStatus`, optional `actorUserID` and `reason`, and a
 * `timestamp`).
 *
 * Deliveries can be sent to any combination of:
 *
 * - `webhookURL` — HTTPS endpoint that receives a JSON POST per event.
 * - `s3Bucket` + `s3FilePath` — sync output JSON into an AWS S3 prefix you own.
 * - `googleDriveFolderID` — drop output JSON into a Google Drive folder.
 *
 * Use `disabled: true` to pause delivery without deleting the subscription. Updates follow
 * conventional PATCH semantics — only the fields you include are changed.
 */
export class Subscriptions extends APIResource {
  /**
   * Creates a new subscription to listen to transform or error events.
   */
  create(body: SubscriptionCreateParams, options?: RequestOptions): APIPromise<SubscriptionV3> {
    return this._client.post('/v3/subscriptions', { body, ...options });
  }

  /**
   * Get a Subscription
   */
  retrieve(subscriptionID: string, options?: RequestOptions): APIPromise<SubscriptionV3> {
    return this._client.get(path`/v3/subscriptions/${subscriptionID}`, options);
  }

  /**
   * Updates an existing subscription. Follow conventional PATCH behavior, so only
   * included fields will be updated.
   */
  update(
    subscriptionID: string,
    body: SubscriptionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SubscriptionV3> {
    return this._client.patch(path`/v3/subscriptions/${subscriptionID}`, { body, ...options });
  }

  /**
   * List Subscriptions
   */
  list(
    query: SubscriptionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SubscriptionListResponse> {
    return this._client.get('/v3/subscriptions', { query, ...options });
  }

  /**
   * Deletes an existing subscription.
   */
  delete(subscriptionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/subscriptions/${subscriptionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SubscriptionV3 {
  /**
   * Name of subscription.
   */
  name: string;

  /**
   * The unique identifier of the subscription.
   */
  subscriptionID: string;

  /**
   * Type of subscription.
   */
  type:
    | 'transform'
    | 'analyze'
    | 'route'
    | 'join'
    | 'split_collection'
    | 'split_item'
    | 'evaluation'
    | 'error'
    | 'payload_shaping'
    | 'enrich'
    | 'collection_processing';

  /**
   * Unique identifier of collection this subscription listens to.
   */
  collectionID?: string;

  /**
   * Name of collection this subscription listens to.
   */
  collectionName?: string;

  /**
   * Toggles whether subscription is active or not.
   */
  disabled?: boolean;

  /**
   * Unique identifier of function this subscription listens to.
   */
  functionID?: string;

  /**
   * Unique name of function this subscription listens to.
   */
  functionName?: string;

  /**
   * Google Drive folder ID for syncing output data to Google Drive.
   */
  googleDriveFolderID?: string;

  /**
   * S3 bucket name for syncing output data to AWS S3.
   */
  s3Bucket?: string;

  /**
   * S3 file path for syncing output data to AWS S3.
   */
  s3FilePath?: string;

  /**
   * URL bem will send webhook requests to.
   */
  webhookURL?: string;
}

export type SubscriptionListResponse = Array<SubscriptionV3>;

export interface SubscriptionCreateParams {
  /**
   * Name of subscription.
   */
  name: string;

  /**
   * Type of subscription.
   */
  type:
    | 'transform'
    | 'analyze'
    | 'route'
    | 'join'
    | 'split_collection'
    | 'split_item'
    | 'evaluation'
    | 'error'
    | 'payload_shaping'
    | 'enrich'
    | 'collection_processing';

  /**
   * Unique identifier of collection this subscription listens to (alternative to
   * collectionName).
   */
  collectionID?: string;

  /**
   * Name of collection this subscription listens to (required for collection-based
   * subscriptions).
   */
  collectionName?: string;

  /**
   * Toggles whether subscription is active or not.
   */
  disabled?: boolean;

  /**
   * Unique identifier of function this subscription listens to (alternative to
   * functionName).
   */
  functionID?: string;

  /**
   * Unique name of function this subscription listens to (required for
   * function-based subscriptions).
   */
  functionName?: string;

  /**
   * Google Drive folder ID for syncing output data to Google Drive.
   */
  googleDriveFolderID?: string;

  /**
   * S3 bucket name for syncing output data to AWS S3.
   */
  s3Bucket?: string;

  /**
   * S3 file path for syncing output data to AWS S3.
   */
  s3FilePath?: string;

  /**
   * URL bem will send webhook requests to.
   */
  webhookURL?: string;
}

export interface SubscriptionUpdateParams {
  /**
   * Toggles whether subscription is active or not.
   */
  disabled?: boolean;

  /**
   * Unique name of function this subscription listens to.
   */
  functionName?: string;

  /**
   * Google Drive folder ID for syncing output data to Google Drive.
   */
  googleDriveFolderID?: string;

  /**
   * Name of subscription.
   */
  name?: string;

  /**
   * S3 bucket name for syncing output data to AWS S3.
   */
  s3Bucket?: string;

  /**
   * S3 file path for syncing output data to AWS S3.
   */
  s3FilePath?: string;

  /**
   * Type of subscription.
   */
  type?:
    | 'transform'
    | 'analyze'
    | 'route'
    | 'join'
    | 'split_collection'
    | 'split_item'
    | 'evaluation'
    | 'error'
    | 'payload_shaping'
    | 'enrich'
    | 'collection_processing';

  /**
   * URL bem will send webhook requests to.
   */
  webhookURL?: string;
}

export interface SubscriptionListParams {
  /**
   * A cursor to use in pagination. `endingBefore` is a task ID that defines your
   * place in the list. For example, if you make a list request and receive 50
   * objects, starting with `sub_2c9AXIj48cUYJtCuv1gsQtHGDzK`, your subsequent call
   * can include `endingBefore=sub_2c9AXIj48cUYJtCuv1gsQtHGDzK` to fetch the previous
   * page of the list.
   */
  endingBefore?: string;

  /**
   * Filters to subscriptions linked to included array of function names.
   */
  functionNames?: Array<string>;

  /**
   * This specifies a limit on the number of objects to return, ranging between 1
   * and 100.
   */
  limit?: number;

  /**
   * A cursor to use in pagination. `startingAfter` is a task ID that defines your
   * place in the list. For example, if you make a list request and receive 50
   * objects, ending with `sub_2c9AXIj48cUYJtCuv1gsQtHGDzK`, your subsequent call can
   * include `startingAfter=sub_2c9AXIj48cUYJtCuv1gsQtHGDzK` to fetch the next page
   * of the list.
   */
  startingAfter?: string;
}

export declare namespace Subscriptions {
  export {
    type SubscriptionV3 as SubscriptionV3,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
  };
}
