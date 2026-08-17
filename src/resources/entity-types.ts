// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Entity Types are the customer-defined taxonomy for the knowledge graph,
 * scoped to an account+environment. Each type has a unique, immutable name
 * and can be organised into hierarchies via `parentTypeID`. A type may
 * carry per-type structured attribute metadata in `attributeSchema` (for
 * example `{"unit": "mg", "range": [0, 100]}`).
 *
 * Use these endpoints to create, list, fetch, update, and delete entity
 * types:
 *
 * - **`POST /v3/entity-types`** creates a type, optionally under a parent.
 * - **`GET /v3/entity-types`** lists types with cursor pagination
 *   (`startingAfter` / `endingBefore` over `typeID`) and an optional
 *   `parentTypeId` filter for direct children.
 * - **`PATCH /v3/entity-types/{typeID}`** updates `description`,
 *   `parentTypeID`, and/or `attributeSchema`. The `name` is immutable.
 * - **`DELETE /v3/entity-types/{typeID}`** soft-deletes a type. The request
 *   is rejected with `409 Conflict` while any live entity is assigned to
 *   the type or any live child type points at it.
 */
export class EntityTypes extends APIResource {
  /**
   * Create an Entity Type
   *
   * @example
   * ```ts
   * const entityType = await client.entityTypes.create({
   *   name: 'Drug',
   *   description: 'A pharmaceutical compound',
   * });
   * ```
   */
  create(body: EntityTypeCreateParams, options?: RequestOptions): APIPromise<EntityType> {
    return this._client.post('/v3/entity-types', { body, ...options });
  }

  /**
   * Get an Entity Type
   *
   * @example
   * ```ts
   * const entityType = await client.entityTypes.retrieve(
   *   'typeID',
   * );
   * ```
   */
  retrieve(typeID: string, options?: RequestOptions): APIPromise<EntityType> {
    return this._client.get(path`/v3/entity-types/${typeID}`, options);
  }

  /**
   * Update an Entity Type
   *
   * @example
   * ```ts
   * const entityType = await client.entityTypes.update(
   *   'typeID',
   * );
   * ```
   */
  update(typeID: string, body: EntityTypeUpdateParams, options?: RequestOptions): APIPromise<EntityType> {
    return this._client.patch(path`/v3/entity-types/${typeID}`, { body, ...options });
  }

  /**
   * Delete an Entity Type
   *
   * @example
   * ```ts
   * await client.entityTypes.delete('typeID');
   * ```
   */
  delete(typeID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/entity-types/${typeID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * An EntityType is a customer-defined type in the knowledge-graph taxonomy, scoped
 * to an account+environment. Types may be organised into hierarchies via
 * `parentTypeID`, and may carry per-type structured attribute metadata in
 * `attributeSchema` (for example `{"unit": "mg", "range": [0, 100]}`).
 */
export interface EntityType {
  /**
   * Creation timestamp (RFC 3339).
   */
  createdAt: string;

  /**
   * Optional human-facing note about the type.
   */
  description: string;

  /**
   * Human-facing type name. Unique within an account+environment, and immutable once
   * set.
   */
  name: string;

  /**
   * Public ID (`ety_...`) of the parent type, or an empty string when the type is
   * top-level.
   */
  parentTypeID: string;

  /**
   * Stable public identifier for the entity type (`ety_...`).
   */
  typeID: string;

  /**
   * Last-update timestamp (RFC 3339).
   */
  updatedAt: string;

  /**
   * Optional per-type structured attribute metadata.
   */
  attributeSchema?: unknown;
}

export interface EntityTypeCreateParams {
  /**
   * Type name. Required and unique within the account+environment.
   */
  name: string;

  /**
   * Optional per-type structured attribute metadata.
   */
  attributeSchema?: unknown;

  /**
   * Optional description.
   */
  description?: string;

  /**
   * Optional public ID (`ety_...`) of the parent type. Must belong to the same
   * account+environment.
   */
  parentTypeID?: string;
}

export interface EntityTypeUpdateParams {
  /**
   * New per-type structured attribute metadata.
   */
  attributeSchema?: unknown;

  /**
   * New description.
   */
  description?: string;

  /**
   * New parent type public ID (`ety_...`), or an empty string to clear the parent
   * (promote to top-level). Must belong to the same account+environment and may not
   * be the type itself.
   */
  parentTypeID?: string;
}

export declare namespace EntityTypes {
  export {
    type EntityType as EntityType,
    type EntityTypeCreateParams as EntityTypeCreateParams,
    type EntityTypeUpdateParams as EntityTypeUpdateParams,
  };
}
