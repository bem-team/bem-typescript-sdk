// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { BucketsPage, type BucketsPageParams, PagePromise } from '../core/pagination';
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
   * const bucketV3 = await client.buckets.create({
   *   name: 'invoices',
   *   description: 'Knowledge graph for invoice documents',
   * });
   * ```
   */
  create(body: BucketCreateParams, options?: RequestOptions): APIPromise<BucketV3> {
    return this._client.post('/v3/buckets', { body, ...options });
  }

  /**
   * Get a Bucket
   *
   * @example
   * ```ts
   * const bucketV3 = await client.buckets.retrieve('bucketID');
   * ```
   */
  retrieve(bucketID: string, options?: RequestOptions): APIPromise<BucketV3> {
    return this._client.get(path`/v3/buckets/${bucketID}`, options);
  }

  /**
   * Update a Bucket
   *
   * @example
   * ```ts
   * const bucketV3 = await client.buckets.update('bucketID');
   * ```
   */
  update(bucketID: string, body: BucketUpdateParams, options?: RequestOptions): APIPromise<BucketV3> {
    return this._client.patch(path`/v3/buckets/${bucketID}`, { body, ...options });
  }

  /**
   * List Buckets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const bucketV3 of client.buckets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: BucketListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BucketV3sBucketsPage, BucketV3> {
    return this._client.getAPIList('/v3/buckets', BucketsPage<BucketV3>, { query, ...options });
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

export type BucketV3sBucketsPage = BucketsPage<BucketV3>;

/**
 * A Bucket is a named partition of the knowledge graph within an
 * account+environment. Entities, mentions, and relations are scoped to a bucket so
 * a single account+environment can host multiple isolated graphs.
 *
 * Every account+environment has exactly one default bucket. The default bucket can
 * be renamed but never deleted.
 */
export interface BucketV3 {
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

export interface BucketListParams extends BucketsPageParams {
  /**
   * Case-insensitive substring match on the bucket name.
   */
  nameSubstring?: string;
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
    type BucketV3 as BucketV3,
    type BucketV3sBucketsPage as BucketV3sBucketsPage,
    type BucketCreateParams as BucketCreateParams,
    type BucketUpdateParams as BucketUpdateParams,
    type BucketListParams as BucketListParams,
    type BucketDeleteParams as BucketDeleteParams,
  };
}
