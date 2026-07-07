// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SynonymsAPI from './synonyms';
import { SynonymAddParams, SynonymAddResponse, SynonymRemoveParams, Synonyms } from './synonyms';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entities extends APIResource {
  synonyms: SynonymsAPI.Synonyms = new SynonymsAPI.Synonyms(this._client);

  /**
   * Update Entity
   *
   * @example
   * ```ts
   * const entity = await client.entities.update('id', {
   *   status: 'approved',
   * });
   * ```
   */
  update(id: string, body: EntityUpdateParams, options?: RequestOptions): APIPromise<EntityUpdateResponse> {
    return this._client.patch(path`/v3/entities/${id}`, { body, ...options });
  }

  /**
   * Bulk Seed Entities
   *
   * @example
   * ```ts
   * const response = await client.entities.bulkCreate({
   *   entities: [
   *     {
   *       canonical: 'Acme Corporation',
   *       type: 'organization',
   *       description: 'Industrial conglomerate',
   *       synonyms: ['ACME', 'Acme Corp'],
   *       attributes: { headquarters: 'Springfield' },
   *     },
   *   ],
   *   onConflict: 'merge',
   * });
   * ```
   */
  bulkCreate(body: EntityBulkCreateParams, options?: RequestOptions): APIPromise<EntityBulkCreateResponse> {
    return this._client.post('/v3/entities/bulk', { body, ...options });
  }

  /**
   * Bulk Validate Entities
   *
   * @example
   * ```ts
   * const response = await client.entities.bulkValidate({
   *   entityIDs: ['ent_2abc', 'ent_2def'],
   *   status: 'approved',
   * });
   * ```
   */
  bulkValidate(
    body: EntityBulkValidateParams,
    options?: RequestOptions,
  ): APIPromise<EntityBulkValidateResponse> {
    return this._client.post('/v3/entities/bulk-validate', { body, ...options });
  }

  /**
   * Get an Entity's Relations
   *
   * @example
   * ```ts
   * const response = await client.entities.retrieveRelations(
   *   'id',
   * );
   * ```
   */
  retrieveRelations(
    id: string,
    query: EntityRetrieveRelationsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EntityRetrieveRelationsResponse> {
    return this._client.get(path`/v3/entities/${id}/relations`, { query, ...options });
  }

  /**
   * Get Seed Job Status
   *
   * @example
   * ```ts
   * const response = await client.entities.retrieveSeedStatus(
   *   'id',
   * );
   * ```
   */
  retrieveSeedStatus(id: string, options?: RequestOptions): APIPromise<EntityRetrieveSeedStatusResponse> {
    return this._client.get(path`/v3/entities/seed/${id}`, options);
  }
}

/**
 * An entity record, including its curation status and assigned type.
 */
export interface EntityUpdateResponse {
  /**
   * The canonical (longest / most descriptive) surface form.
   */
  canonical: string;

  /**
   * Creation timestamp.
   */
  createdAt: string;

  /**
   * Public ID (`ent_...`).
   */
  entityID: string;

  /**
   * Total mentions across parsed documents.
   */
  mentionCount: number;

  /**
   * Curation lifecycle state.
   */
  status: 'extracted' | 'proposed' | 'approved' | 'rejected';

  /**
   * Distinct surface forms resolved to this entity.
   */
  surfaceForms: Array<string>;

  /**
   * The entity's effective type name (assigned type if set, else inferred).
   */
  type: string;

  /**
   * Last-update timestamp.
   */
  updatedAt: string;

  /**
   * Free-form description.
   */
  description?: string;

  /**
   * `ety_...` public ID of the assigned type, when one is set.
   */
  typeID?: string;

  /**
   * When the entity was approved/rejected. Present only once validated.
   */
  validatedAt?: string;

  /**
   * `usr_...` public ID of the validating user (dashboard transitions only).
   */
  validatedByUserID?: string;
}

/**
 * `200` response for a synchronously processed (small) batch.
 */
export interface EntityBulkCreateResponse {
  /**
   * Per-row outcomes, in request order.
   */
  results: Array<EntityBulkCreateResponse.Result>;

  /**
   * Per-outcome tally across a batch.
   */
  summary: EntityBulkCreateResponse.Summary;
}

export namespace EntityBulkCreateResponse {
  /**
   * The outcome of seeding one row.
   */
  export interface Result {
    /**
     * The canonical name from the input row.
     */
    canonical: string;

    /**
     * What happened to this row: `created` (new entity), `merged-with` (matched an
     * existing entity), or `rejected` (see `reason`).
     */
    outcome: 'created' | 'merged-with' | 'rejected';

    /**
     * Public ID (`ent_...`) of the created or merged entity. Absent when rejected.
     */
    entityID?: string;

    /**
     * Human-readable explanation when `outcome` is `rejected`.
     */
    reason?: string;
  }

  /**
   * Per-outcome tally across a batch.
   */
  export interface Summary {
    /**
     * Number of rows that created a new entity.
     */
    created: number;

    /**
     * Number of rows merged into an existing entity.
     */
    merged: number;

    /**
     * Number of rows rejected.
     */
    rejected: number;
  }
}

/**
 * `200` response for `POST /v3/entities/bulk-validate`.
 */
export interface EntityBulkValidateResponse {
  /**
   * Per-row outcomes, in request order.
   */
  results: Array<EntityBulkValidateResponse.Result>;

  /**
   * Per-outcome tally across a bulk-validate batch.
   */
  summary: EntityBulkValidateResponse.Summary;
}

export namespace EntityBulkValidateResponse {
  /**
   * The outcome of validating one row.
   */
  export interface Result {
    /**
     * The `ent_...` ID from the request.
     */
    entityID: string;

    /**
     * `validated` (transition applied), `skipped` (not found or not authorized), or
     * `rejected-row` (the transition itself was illegal, e.g. already terminal).
     */
    outcome: 'validated' | 'skipped' | 'rejected-row';

    /**
     * Explanation for a `skipped` or `rejected-row` outcome.
     */
    reason?: string;
  }

  /**
   * Per-outcome tally across a bulk-validate batch.
   */
  export interface Summary {
    /**
     * Rows whose transition was illegal.
     */
    rejectedRow: number;

    /**
     * Rows skipped (not found / not authorized).
     */
    skipped: number;

    /**
     * Rows whose transition was applied.
     */
    validated: number;
  }
}

/**
 * Response body for `GET /v3/entities/{id}/relations`.
 */
export interface EntityRetrieveRelationsResponse {
  /**
   * Edges pointing at the queried entity.
   */
  inbound: Array<EntityRetrieveRelationsResponse.Inbound>;

  /**
   * Edges pointing away from the queried entity.
   */
  outbound: Array<EntityRetrieveRelationsResponse.Outbound>;

  /**
   * Opaque cursor for the next page of edges, or absent on the last page. Pass it
   * back as `cursor`.
   */
  nextCursor?: string;
}

export namespace EntityRetrieveRelationsResponse {
  /**
   * One edge pointing AT the queried entity (some other entity is the source).
   */
  export interface Inbound {
    /**
     * First-seen timestamp of the edge (RFC 3339).
     */
    firstSeenAt: string;

    /**
     * How many times this edge has been observed across parsed documents.
     */
    mentionCount: number;

    /**
     * Free-form relation label (e.g. `author_of`, `affiliated_with`).
     */
    relationType: string;

    /**
     * A compact view of an entity sitting on the far end of a relation edge — the
     * stable public id, the canonical name, and the effective type. The full entity is
     * fetched separately via the entity detail / File System endpoints.
     */
    sourceEntity: Inbound.SourceEntity;
  }

  export namespace Inbound {
    /**
     * A compact view of an entity sitting on the far end of a relation edge — the
     * stable public id, the canonical name, and the effective type. The full entity is
     * fetched separately via the entity detail / File System endpoints.
     */
    export interface SourceEntity {
      /**
       * Stable public identifier for the entity (`ent_...`).
       */
      id: string;

      /**
       * Canonical (most descriptive) surface form of the entity.
       */
      canonical: string;

      /**
       * Hops from the queried entity. This endpoint returns direct relations, so this is
       * 1 (a self-loop's far end is the queried entity itself, 0).
       */
      depth: number;

      /**
       * Effective entity type.
       */
      type: string;
    }
  }

  /**
   * One edge pointing AWAY from the queried entity (it is the source).
   */
  export interface Outbound {
    /**
     * First-seen timestamp of the edge (RFC 3339).
     */
    firstSeenAt: string;

    /**
     * How many times this edge has been observed across parsed documents.
     */
    mentionCount: number;

    /**
     * Free-form relation label (e.g. `author_of`, `affiliated_with`).
     */
    relationType: string;

    /**
     * A compact view of an entity sitting on the far end of a relation edge — the
     * stable public id, the canonical name, and the effective type. The full entity is
     * fetched separately via the entity detail / File System endpoints.
     */
    targetEntity: Outbound.TargetEntity;
  }

  export namespace Outbound {
    /**
     * A compact view of an entity sitting on the far end of a relation edge — the
     * stable public id, the canonical name, and the effective type. The full entity is
     * fetched separately via the entity detail / File System endpoints.
     */
    export interface TargetEntity {
      /**
       * Stable public identifier for the entity (`ent_...`).
       */
      id: string;

      /**
       * Canonical (most descriptive) surface form of the entity.
       */
      canonical: string;

      /**
       * Hops from the queried entity. This endpoint returns direct relations, so this is
       * 1 (a self-loop's far end is the queried entity itself, 0).
       */
      depth: number;

      /**
       * Effective entity type.
       */
      type: string;
    }
  }
}

/**
 * `GET /v3/entities/seed/{id}` response.
 */
export interface EntityRetrieveSeedStatusResponse {
  /**
   * Rows that created a new entity.
   */
  createdCount: number;

  /**
   * Rows merged into an existing entity.
   */
  mergedCount: number;

  /**
   * Rows rejected.
   */
  rejectedCount: number;

  /**
   * Public ID (`esj_...`) of the seed job.
   */
  seedJobID: string;

  /**
   * Lifecycle state.
   */
  status: 'pending' | 'processing' | 'completed' | 'failed';

  /**
   * Total rows in the submitted batch.
   */
  totalRows: number;

  /**
   * Terminal error message when `status` is `failed`.
   */
  error?: string;

  /**
   * Per-row outcomes. Present only once `status` is `completed`.
   */
  results?: Array<EntityRetrieveSeedStatusResponse.Result>;
}

export namespace EntityRetrieveSeedStatusResponse {
  /**
   * The outcome of seeding one row.
   */
  export interface Result {
    /**
     * The canonical name from the input row.
     */
    canonical: string;

    /**
     * What happened to this row: `created` (new entity), `merged-with` (matched an
     * existing entity), or `rejected` (see `reason`).
     */
    outcome: 'created' | 'merged-with' | 'rejected';

    /**
     * Public ID (`ent_...`) of the created or merged entity. Absent when rejected.
     */
    entityID?: string;

    /**
     * Human-readable explanation when `outcome` is `rejected`.
     */
    reason?: string;
  }
}

export interface EntityUpdateParams {
  /**
   * Surface forms to attach as `customer_defined` synonyms.
   */
  addSynonyms?: Array<string>;

  /**
   * The `ety_...` public ID of the type to assign (overriding the bem-inferred
   * type). The empty string clears the assignment. Omit to leave unchanged.
   */
  assignedTypeID?: string;

  /**
   * Replace the entity's canonical surface form (re-derives its normalized form).
   */
  canonical?: string;

  /**
   * Optional BCP 47 locale tag stamped on any added synonyms.
   */
  locale?: string;

  /**
   * `esn_...` synonym IDs to soft-delete. Only `customer_defined` / `sme_approved`
   * synonyms may be removed; an `extracted` synonym is rejected with `409`.
   */
  removeSynonymIDs?: Array<string>;

  /**
   * Transition the entity's curation status. Only `approved` or `rejected` are
   * accepted, and only from `extracted` or `proposed` (any other transition is
   * rejected with `409`).
   */
  status?: 'approved' | 'rejected';
}

export interface EntityBulkCreateParams {
  /**
   * The entities to seed. Must be non-empty.
   */
  entities: Array<EntityBulkCreateParams.Entity>;

  /**
   * Optional bucket public ID (`bkt_...`) to seed into. Omit to use the
   * account+environment default bucket.
   */
  bucket?: string;

  /**
   * Conflict strategy for an entity that already exists. Only `merge` is supported
   * and it is the default: synonyms are added additively, a longer description
   * replaces the old one, and attributes are merged with new keys winning.
   */
  onConflict?: 'merge';
}

export namespace EntityBulkCreateParams {
  /**
   * One entity to seed in a `POST /v3/entities/bulk` batch.
   */
  export interface Entity {
    /**
     * The canonical (longest / most descriptive) surface form for the entity, e.g.
     * `Acme Corporation`. Required. Normalized (lowercased, whitespace-folded) for the
     * uniqueness key.
     */
    canonical: string;

    /**
     * The entity type name, e.g. `instrument` or `organization`. Required. Resolved
     * against your taxonomy and created if it does not yet exist.
     */
    type: string;

    /**
     * Optional per-entity structured attribute values, e.g.
     * `{ "manufacturer": "Acme", "dosageMg": 50 }`. When the entity's type declares an
     * attribute schema, keys not present in that schema cause the row to be rejected.
     */
    attributes?: unknown;

    /**
     * Optional free-form description of the entity.
     */
    description?: string;

    /**
     * Optional additional surface forms to attach as `customer_defined` synonyms.
     */
    synonyms?: Array<string>;
  }
}

export interface EntityBulkValidateParams {
  /**
   * The `ent_...` IDs to transition. Must be non-empty.
   */
  entityIDs: Array<string>;

  /**
   * Terminal status to apply to every entity.
   */
  status: 'approved' | 'rejected';
}

export interface EntityRetrieveRelationsParams {
  /**
   * Optional bucket public ID (`bkt_...`) to scope the read to one bucket. Omit for
   * the unscoped (all account+environment) view.
   */
  bucket?: string;

  /**
   * Cursor: return edges whose KSUID sorts after this value.
   */
  cursor?: string;

  /**
   * Which edges to return relative to the entity. Defaults to `both`.
   */
  direction?: 'inbound' | 'outbound' | 'both';

  /**
   * Maximum number of edges to return (default 50, max 200).
   */
  limit?: number;

  /**
   * Exact-match filter on the relation label.
   */
  relationType?: string;
}

Entities.Synonyms = Synonyms;

export declare namespace Entities {
  export {
    type EntityUpdateResponse as EntityUpdateResponse,
    type EntityBulkCreateResponse as EntityBulkCreateResponse,
    type EntityBulkValidateResponse as EntityBulkValidateResponse,
    type EntityRetrieveRelationsResponse as EntityRetrieveRelationsResponse,
    type EntityRetrieveSeedStatusResponse as EntityRetrieveSeedStatusResponse,
    type EntityUpdateParams as EntityUpdateParams,
    type EntityBulkCreateParams as EntityBulkCreateParams,
    type EntityBulkValidateParams as EntityBulkValidateParams,
    type EntityRetrieveRelationsParams as EntityRetrieveRelationsParams,
  };

  export {
    Synonyms as Synonyms,
    type SynonymAddResponse as SynonymAddResponse,
    type SynonymAddParams as SynonymAddParams,
    type SynonymRemoveParams as SynonymRemoveParams,
  };
}
