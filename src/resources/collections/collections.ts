// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ItemsAPI from './items';
import {
  ItemAddParams,
  ItemAddResponse,
  ItemDeleteParams,
  ItemRetrieveParams,
  ItemRetrieveResponse,
  ItemUpdateParams,
  ItemUpdateResponse,
  Items,
} from './items';
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
export class Collections extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Create a Collection
   *
   * @example
   * ```ts
   * const collection = await client.collections.create({
   *   collectionName: 'product_catalog',
   * });
   * ```
   */
  create(body: CollectionCreateParams, options?: RequestOptions): APIPromise<CollectionCreateResponse> {
    return this._client.post('/v3/collections', { body, ...options });
  }

  /**
   * List Collections
   *
   * @example
   * ```ts
   * const collections = await client.collections.list();
   * ```
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CollectionListResponse> {
    return this._client.get('/v3/collections', { query, ...options });
  }

  /**
   * Delete a Collection
   *
   * @example
   * ```ts
   * await client.collections.delete({
   *   collectionName: 'collectionName',
   * });
   * ```
   */
  delete(params: CollectionDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { collectionName } = params;
    return this._client.delete('/v3/collections', {
      query: { collectionName },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Count the number of tokens in the provided texts using the BGE M3 tokenizer.
   * This is useful for checking if texts will fit within the embedding model's token
   * limit (8,192 tokens per text) before sending them for embedding.
   *
   * @example
   * ```ts
   * const response = await client.collections.countTokens({
   *   texts: ['string'],
   * });
   * ```
   */
  countTokens(
    body: CollectionCountTokensParams,
    options?: RequestOptions,
  ): APIPromise<CollectionCountTokensResponse> {
    return this._client.post('/v3/collections/token-count', { body, ...options });
  }
}

/**
 * Collection details
 */
export interface CollectionCreateResponse {
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
  items?: Array<CollectionCreateResponse.Item>;

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

export namespace CollectionCreateResponse {
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
 * Response for listing collections
 */
export interface CollectionListResponse {
  /**
   * List of collections
   */
  collections: Array<CollectionListResponse.Collection>;

  /**
   * Number of collections per page
   */
  limit: number;

  /**
   * Current page number
   */
  page: number;

  /**
   * Total number of collections
   */
  totalCount: number;

  /**
   * Total number of pages
   */
  totalPages: number;
}

export namespace CollectionListResponse {
  /**
   * Collection metadata without items
   */
  export interface Collection {
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
     * When the collection was last updated
     */
    updatedAt?: string;
  }
}

/**
 * Response for the token count endpoint.
 */
export interface CollectionCountTokensResponse {
  /**
   * Maximum tokens allowed per text by the embedding model.
   */
  max_token_limit?: number;

  /**
   * Number of input texts that exceed `max_token_limit`.
   */
  texts_exceeding_limit?: number;

  /**
   * Per-text tokenization results in the same order as the request.
   */
  token_counts?: Array<CollectionCountTokensResponse.TokenCount>;

  /**
   * Sum of `token_count` across all texts.
   */
  total_tokens?: number;
}

export namespace CollectionCountTokensResponse {
  /**
   * Per-text token count result.
   */
  export interface TokenCount {
    /**
     * Character count of the input text.
     */
    char_count?: number;

    /**
     * True if `token_count` exceeds the embedding model's per-text limit.
     */
    exceeds_limit?: boolean;

    /**
     * Zero-based position of this entry in the request `texts` array.
     */
    index?: number;

    /**
     * Number of tokens produced by the tokenizer.
     */
    token_count?: number;
  }
}

export interface CollectionCreateParams {
  /**
   * Unique name/path for the collection. Supports dot notation for hierarchical
   * paths.
   *
   * - Only letters (a-z, A-Z), digits (0-9), underscores (\_), and dots (.) are
   *   allowed
   * - Each segment (between dots) must start with a letter or underscore (not a
   *   digit)
   * - Segments cannot consist only of digits
   * - Each segment must be 1-256 characters
   * - No leading, trailing, or consecutive dots
   * - Invalid names are rejected with a 400 Bad Request error
   *
   * **Valid Examples:**
   *
   * - 'product_catalog'
   * - 'orders.line_items.sku'
   * - 'customer_data'
   * - 'price_v2'
   *
   * **Invalid Examples:**
   *
   * - 'product-catalog' (contains hyphen)
   * - '123items' (starts with digit)
   * - 'items..data' (consecutive dots)
   * - 'order#123' (contains invalid character #)
   */
  collectionName: string;
}

export interface CollectionListParams {
  /**
   * Optional substring search filter for collection names (case-insensitive). For
   * example, "premium" will match "customers.premium", "products.premium", etc.
   */
  collectionNameSearch?: string;

  /**
   * Number of collections per page
   */
  limit?: number;

  /**
   * Page number for pagination
   */
  page?: number;

  /**
   * Optional filter to list only collections under a specific parent collection
   * path. For example, "customers" will return "customers", "customers.premium",
   * "customers.premium.vip", etc.
   */
  parentCollectionName?: string;
}

export interface CollectionDeleteParams {
  /**
   * The name/path of the collection to delete. Must use only letters, digits,
   * underscores, and dots. Each segment must start with a letter or underscore.
   */
  collectionName: string;
}

export interface CollectionCountTokensParams {
  /**
   * One or more texts to tokenize.
   */
  texts: Array<string>;
}

Collections.Items = Items;

export declare namespace Collections {
  export {
    type CollectionCreateResponse as CollectionCreateResponse,
    type CollectionListResponse as CollectionListResponse,
    type CollectionCountTokensResponse as CollectionCountTokensResponse,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionListParams as CollectionListParams,
    type CollectionDeleteParams as CollectionDeleteParams,
    type CollectionCountTokensParams as CollectionCountTokensParams,
  };

  export {
    Items as Items,
    type ItemRetrieveResponse as ItemRetrieveResponse,
    type ItemUpdateResponse as ItemUpdateResponse,
    type ItemAddResponse as ItemAddResponse,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemAddParams as ItemAddParams,
  };
}
