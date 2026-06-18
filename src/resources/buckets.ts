// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Buckets are named partitions of the knowledge graph within an
 * account+environment. Entities, mentions, and relations are scoped to a
 * bucket so a single account+environment can host multiple isolated graphs
 * — for example one per data source or workspace.
 *
 * Every account+environment has exactly one **default** bucket, used by
 * unscoped flows. The default bucket can be renamed but never deleted.
 *
 * Use these endpoints to create, list, fetch, rename, and delete buckets:
 *
 * - **`POST /v3/buckets`** creates a non-default bucket.
 * - **`GET /v3/buckets`** lists buckets with cursor pagination
 *   (`startingAfter` / `endingBefore` over `bucketID`).
 * - **`PATCH /v3/buckets/{bucketID}`** updates `name` and/or `description`.
 * - **`DELETE /v3/buckets/{bucketID}`** soft-deletes a bucket. A non-empty
 *   bucket is rejected with `409 Conflict` unless `?cascade=true` is
 *   passed; the default bucket can never be deleted.
 */
export class Buckets extends APIResource {
  /**
   * Create a Bucket
   *
   * @example
   * ```ts
   * const bucket = await client.buckets.create({
   *   name: 'invoices',
   *   description: 'Knowledge graph for invoice documents',
   * });
   * ```
   */
  create(body: BucketCreateParams, options?: RequestOptions): APIPromise<BucketCreateResponse> {
    return this._client.post('/v3/buckets', { body, ...options });
  }

  /**
   * Get a Bucket
   *
   * @example
   * ```ts
   * const bucket = await client.buckets.retrieve('bucketID');
   * ```
   */
  retrieve(bucketID: string, options?: RequestOptions): APIPromise<BucketRetrieveResponse> {
    return this._client.get(path`/v3/buckets/${bucketID}`, options);
  }

  /**
   * Update a Bucket
   *
   * @example
   * ```ts
   * const bucket = await client.buckets.update('bucketID');
   * ```
   */
  update(
    bucketID: string,
    body: BucketUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BucketUpdateResponse> {
    return this._client.patch(path`/v3/buckets/${bucketID}`, { body, ...options });
  }

  /**
   * List Buckets
   *
   * @example
   * ```ts
   * const buckets = await client.buckets.list();
   * ```
   */
  list(
    query: BucketListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BucketListResponse> {
    return this._client.get('/v3/buckets', { query, ...options });
  }

  /**
   * Delete a Bucket
   *
   * @example
   * ```ts
   * await client.buckets.delete('bucketID');
   * ```
   */
  delete(
    bucketID: string,
    params: BucketDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { cascade } = params ?? {};
    return this._client.delete(path`/v3/buckets/${bucketID}`, {
      query: { cascade },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A Bucket is a named partition of the knowledge graph within an
 * account+environment. Entities, mentions, and relations are scoped to a bucket so
 * a single account+environment can host multiple isolated graphs.
 *
 * Every account+environment has exactly one default bucket. The default bucket can
 * be renamed but never deleted.
 */
export interface BucketCreateResponse {
  /**
   * Stable public identifier for the bucket (`bkt_...`).
   */
  bucketID: string;

  /**
   * Creation timestamp (RFC 3339).
   */
  createdAt: string;

  /**
   * Optional human-facing note about the bucket.
   */
  description: string;

  /**
   * Whether this is the account+environment's default bucket.
   */
  isDefault: boolean;

  /**
   * Human-facing bucket name. Unique within an account+environment.
   */
  name: string;

  /**
   * Last-update timestamp (RFC 3339).
   */
  updatedAt: string;
}

/**
 * A Bucket is a named partition of the knowledge graph within an
 * account+environment. Entities, mentions, and relations are scoped to a bucket so
 * a single account+environment can host multiple isolated graphs.
 *
 * Every account+environment has exactly one default bucket. The default bucket can
 * be renamed but never deleted.
 */
export interface BucketRetrieveResponse {
  /**
   * Stable public identifier for the bucket (`bkt_...`).
   */
  bucketID: string;

  /**
   * Creation timestamp (RFC 3339).
   */
  createdAt: string;

  /**
   * Optional human-facing note about the bucket.
   */
  description: string;

  /**
   * Whether this is the account+environment's default bucket.
   */
  isDefault: boolean;

  /**
   * Human-facing bucket name. Unique within an account+environment.
   */
  name: string;

  /**
   * Last-update timestamp (RFC 3339).
   */
  updatedAt: string;
}

/**
 * A Bucket is a named partition of the knowledge graph within an
 * account+environment. Entities, mentions, and relations are scoped to a bucket so
 * a single account+environment can host multiple isolated graphs.
 *
 * Every account+environment has exactly one default bucket. The default bucket can
 * be renamed but never deleted.
 */
export interface BucketUpdateResponse {
  /**
   * Stable public identifier for the bucket (`bkt_...`).
   */
  bucketID: string;

  /**
   * Creation timestamp (RFC 3339).
   */
  createdAt: string;

  /**
   * Optional human-facing note about the bucket.
   */
  description: string;

  /**
   * Whether this is the account+environment's default bucket.
   */
  isDefault: boolean;

  /**
   * Human-facing bucket name. Unique within an account+environment.
   */
  name: string;

  /**
   * Last-update timestamp (RFC 3339).
   */
  updatedAt: string;
}

/**
 * Response body for listing buckets.
 */
export interface BucketListResponse {
  buckets: Array<BucketListResponse.Bucket>;

  /**
   * Total number of buckets matching the query, ignoring pagination.
   */
  totalCount: number;
}

export namespace BucketListResponse {
  /**
   * A Bucket is a named partition of the knowledge graph within an
   * account+environment. Entities, mentions, and relations are scoped to a bucket so
   * a single account+environment can host multiple isolated graphs.
   *
   * Every account+environment has exactly one default bucket. The default bucket can
   * be renamed but never deleted.
   */
  export interface Bucket {
    /**
     * Stable public identifier for the bucket (`bkt_...`).
     */
    bucketID: string;

    /**
     * Creation timestamp (RFC 3339).
     */
    createdAt: string;

    /**
     * Optional human-facing note about the bucket.
     */
    description: string;

    /**
     * Whether this is the account+environment's default bucket.
     */
    isDefault: boolean;

    /**
     * Human-facing bucket name. Unique within an account+environment.
     */
    name: string;

    /**
     * Last-update timestamp (RFC 3339).
     */
    updatedAt: string;
  }
}

export interface BucketCreateParams {
  /**
   * Bucket name. Required and unique within the account+environment.
   */
  name: string;

  /**
   * Optional description.
   */
  description?: string;
}

export interface BucketUpdateParams {
  /**
   * New description.
   */
  description?: string;

  /**
   * New name.
   */
  name?: string;
}

export interface BucketListParams {
  /**
   * Cursor: return buckets whose `bucketID` sorts before this value.
   */
  endingBefore?: string;

  /**
   * Maximum number of buckets to return (default 50, max 200).
   */
  limit?: number;

  /**
   * Case-insensitive substring match on the bucket name.
   */
  nameSubstring?: string;

  /**
   * Cursor: return buckets whose `bucketID` sorts after this value.
   */
  startingAfter?: string;
}

export interface BucketDeleteParams {
  /**
   * When `true`, delete the bucket even if it still contains entities (the entities
   * are removed along with it). When omitted or `false`, the request is rejected
   * with `409 Conflict` if the bucket is non-empty.
   *
   * The default bucket can never be deleted regardless of this flag.
   */
  cascade?: boolean;
}

export declare namespace Buckets {
  export {
    type BucketCreateResponse as BucketCreateResponse,
    type BucketRetrieveResponse as BucketRetrieveResponse,
    type BucketUpdateResponse as BucketUpdateResponse,
    type BucketListResponse as BucketListResponse,
    type BucketCreateParams as BucketCreateParams,
    type BucketUpdateParams as BucketUpdateParams,
    type BucketListParams as BucketListParams,
    type BucketDeleteParams as BucketDeleteParams,
  };
}
