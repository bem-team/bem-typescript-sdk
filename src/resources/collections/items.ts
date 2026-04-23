// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Collections are named groups of embedded items used by Enrich functions for semantic search.
 *
 * Each collection is referenced by a `collectionName`, which supports dot notation for
 * hierarchical paths (e.g. `customers.premium.vip`). Names must contain only letters,
 * digits, underscores, and dots, and each segment must start with a letter or underscore.
 *
 * ## Items
 *
 * Items carry either a string or a JSON object in their `data` field. When items are added
 * or updated, their `data` is embedded asynchronously — `POST /v3/collections/items` and
 * `PUT /v3/collections/items` return immediately with a `pending` status and an `eventID`
 * that can be correlated with webhook notifications once processing completes.
 *
 * ## Listing and hierarchy
 *
 * Use `GET /v3/collections` with `parentCollectionName` to list collections under a path,
 * or `collectionNameSearch` for a case-insensitive substring match. `GET /v3/collections/items`
 * retrieves a specific collection's items; pass `includeSubcollections=true` to fold in items
 * from all descendant collections.
 *
 * ## Token counting
 *
 * Use `POST /v3/collections/token-count` to check whether texts fit within the embedding
 * model's 8,192-token-per-text limit before submitting them for embedding.
 */
export class Items extends APIResource {
  /**
   * Get a Collection
   *
   * @example
   * ```ts
   * const item = await client.collections.items.retrieve({
   *   collectionName: 'collectionName',
   * });
   * ```
   */
  retrieve(query: ItemRetrieveParams, options?: RequestOptions): APIPromise<ItemRetrieveResponse> {
    return this._client.get('/v3/collections/items', { query, ...options });
  }

  /**
   * Update existing items in a Collection
   *
   * @example
   * ```ts
   * const item = await client.collections.items.update({
   *   collectionName: 'product_catalog',
   *   items: [
   *     {
   *       collectionItemID: 'clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP',
   *       data: 'SKU-12345: Updated Industrial Widget - Premium Edition',
   *     },
   *     {
   *       collectionItemID: 'clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ',
   *       data: {
   *         sku: 'SKU-67890',
   *         name: 'Updated Premium Gear',
   *         category: 'Hardware',
   *         price: 399.99,
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  update(body: ItemUpdateParams, options?: RequestOptions): APIPromise<ItemUpdateResponse> {
    return this._client.put('/v3/collections/items', { body, ...options });
  }

  /**
   * Delete an item from a Collection
   *
   * @example
   * ```ts
   * await client.collections.items.delete({
   *   collectionItemID: 'collectionItemID',
   *   collectionName: 'collectionName',
   * });
   * ```
   */
  delete(params: ItemDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { collectionItemID, collectionName } = params;
    return this._client.delete('/v3/collections/items', {
      query: { collectionItemID, collectionName },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Add new items to a Collection
   *
   * @example
   * ```ts
   * const response = await client.collections.items.add({
   *   collectionName: 'product_catalog',
   *   items: [
   *     {
   *       data: {
   *         sku: 'SKU-11111',
   *         name: 'Deluxe Component',
   *         category: 'Hardware',
   *         price: 299.99,
   *       },
   *     },
   *     {
   *       data: {
   *         sku: 'SKU-22222',
   *         name: 'Standard Part',
   *         category: 'Tools',
   *         price: 49.99,
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  add(body: ItemAddParams, options?: RequestOptions): APIPromise<ItemAddResponse> {
    return this._client.post('/v3/collections/items', { body, ...options });
  }
}

/**
 * Collection details
 */
export interface ItemRetrieveResponse {
  /**
   * Unique identifier for the collection
   */
  collectionID: string;

  /**
   * The collection name/path. Only letters, digits, underscores, and dots are
   * allowed.
   */
  collectionName: string;

  /**
   * When the collection was created
   */
  createdAt: string;

  /**
   * Number of items in the collection
   */
  itemCount: number;

  /**
   * List of items in the collection (when fetching collection details)
   */
  items?: Array<ItemRetrieveResponse.Item>;

  /**
   * Number of items per page
   */
  limit?: number;

  /**
   * Current page number
   */
  page?: number;

  /**
   * Total number of pages
   */
  totalPages?: number;

  /**
   * When the collection was last updated
   */
  updatedAt?: string;
}

export namespace ItemRetrieveResponse {
  /**
   * A single item in a collection
   */
  export interface Item {
    /**
     * Unique identifier for the item
     */
    collectionItemID: string;

    /**
     * When the item was created
     */
    createdAt: string;

    /**
     * The data stored in this item
     */
    data: string | unknown;

    /**
     * When the item was last updated
     */
    updatedAt: string;
  }
}

/**
 * Response after queuing items for async update
 */
export interface ItemUpdateResponse {
  /**
   * Event ID for tracking this operation. Use this to correlate with webhook
   * notifications.
   */
  eventID: string;

  /**
   * Status message
   */
  message: string;

  /**
   * Processing status
   */
  status: 'pending';

  /**
   * Array of items that were updated (only present in synchronous mode, deprecated)
   */
  items?: Array<ItemUpdateResponse.Item>;

  /**
   * Number of items updated (only present in synchronous mode, deprecated)
   */
  updatedCount?: number;
}

export namespace ItemUpdateResponse {
  /**
   * A single item in a collection
   */
  export interface Item {
    /**
     * Unique identifier for the item
     */
    collectionItemID: string;

    /**
     * When the item was created
     */
    createdAt: string;

    /**
     * The data stored in this item
     */
    data: string | unknown;

    /**
     * When the item was last updated
     */
    updatedAt: string;
  }
}

/**
 * Response after queuing items for async processing
 */
export interface ItemAddResponse {
  /**
   * Event ID for tracking this operation. Use this to correlate with webhook
   * notifications.
   */
  eventID: string;

  /**
   * Status message
   */
  message: string;

  /**
   * Processing status
   */
  status: 'pending';

  /**
   * Number of new items added (only present in synchronous mode, deprecated)
   */
  addedCount?: number;

  /**
   * Array of items that were added (only present in synchronous mode, deprecated)
   */
  items?: Array<ItemAddResponse.Item>;
}

export namespace ItemAddResponse {
  /**
   * A single item in a collection
   */
  export interface Item {
    /**
     * Unique identifier for the item
     */
    collectionItemID: string;

    /**
     * When the item was created
     */
    createdAt: string;

    /**
     * The data stored in this item
     */
    data: string | unknown;

    /**
     * When the item was last updated
     */
    updatedAt: string;
  }
}

export interface ItemRetrieveParams {
  /**
   * The name/path of the collection. Must use only letters, digits, underscores, and
   * dots. Each segment must start with a letter or underscore.
   */
  collectionName: string;

  /**
   * When true, includes items from all subcollections under the specified collection
   * path. For example, querying "customers" with this flag will return items from
   * "customers", "customers.premium", "customers.premium.vip", etc.
   */
  includeSubcollections?: boolean;

  /**
   * Number of items per page
   */
  limit?: number;

  /**
   * Page number for pagination
   */
  page?: number;
}

export interface ItemUpdateParams {
  /**
   * The name/path of the collection. Must use only letters, digits, underscores, and
   * dots. Each segment must start with a letter or underscore.
   */
  collectionName: string;

  /**
   * Array of items to update (maximum 100 items per request)
   */
  items: Array<ItemUpdateParams.Item>;
}

export namespace ItemUpdateParams {
  /**
   * Data for updating an existing item in a collection
   */
  export interface Item {
    /**
     * Unique identifier for the item to update
     */
    collectionItemID: string;

    /**
     * The updated data to be embedded and stored (string or JSON object)
     */
    data: string | unknown;
  }
}

export interface ItemDeleteParams {
  /**
   * The unique identifier of the item to delete
   */
  collectionItemID: string;

  /**
   * The name/path of the collection. Must use only letters, digits, underscores, and
   * dots. Each segment must start with a letter or underscore.
   */
  collectionName: string;
}

export interface ItemAddParams {
  /**
   * The name/path of the collection. Must use only letters, digits, underscores, and
   * dots. Each segment must start with a letter or underscore.
   */
  collectionName: string;

  /**
   * Array of items to add (maximum 100 items per request)
   */
  items: Array<ItemAddParams.Item>;
}

export namespace ItemAddParams {
  /**
   * Data for creating a new item in a collection
   */
  export interface Item {
    /**
     * The data to be embedded and stored (string or JSON object)
     */
    data: string | unknown;
  }
}

export declare namespace Items {
  export {
    type ItemRetrieveResponse as ItemRetrieveResponse,
    type ItemUpdateResponse as ItemUpdateResponse,
    type ItemAddResponse as ItemAddResponse,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemAddParams as ItemAddParams,
  };
}
