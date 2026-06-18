// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * The reviewer-facing read surface for entity curation, available on the
 * dashboard (JWT) only.
 *
 * - **`GET /v3/review-queue`** returns a cursor-paginated set of entities
 *   awaiting curation, scoped to your account+environment (and optional
 *   `bucket`). Each row is a full entity plus a small preview (up to 2) of
 *   its first mentions, so a reviewer can triage without opening every
 *   entity.
 *
 * Filters AND together. `status` (repeatable) defaults to the pre-terminal
 * states `extracted` + `proposed` when omitted. `type` (repeatable `ety_…`
 * IDs) matches the entity's *effective* type — its assigned type id, or, for
 * entities with no assigned type, its bem-inferred type name. `assignedTo`
 * (`me` or a `usr_…` ID) restricts to entities whose effective type the user
 * reviews. `since` (RFC3339) filters by creation time. Pagination is
 * cursor-based on `entityID` ascending; default limit 50, maximum 200.
 */
export class ReviewQueue extends APIResource {
  /**
   * **List entities awaiting curation, for a human reviewer's queue.**
   *
   * Returns a cursor-paginated set of entities scoped to your account+environment
   * (and optional `bucket`), each carrying a small preview of its first mentions so
   * a reviewer can triage without opening every entity. All filters AND together.
   *
   * - **`status`** (repeatable) restricts to the given lifecycle states. Omitting it
   *   defaults to the pre-terminal states `extracted` and `proposed`.
   * - **`type`** (repeatable, `ety_...` IDs) matches the entity's _effective_ type:
   *   an entity matches when its assigned type is one of these IDs, or it has no
   *   assigned type and its bem-inferred type name matches one of them.
   * - **`assignedTo`** (`me` or a `usr_...` ID) restricts to entities whose
   *   effective type the given user reviews. `me` resolves to the calling user.
   * - **`since`** (RFC3339) restricts to entities created at or after the time.
   *
   * Pagination is cursor-based on `entityID` ascending; default limit is 50,
   * maximum 200.
   */
  list(
    query: ReviewQueueListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ReviewQueueListResponse> {
    return this._client.get('/v3/review-queue', { query, ...options });
  }
}

/**
 * `GET /v3/review-queue` response. Cursor-paginated by `entityID` ascending.
 */
export interface ReviewQueueListResponse {
  /**
   * The page of entities awaiting curation.
   */
  entities: Array<ReviewQueueListResponse.Entity>;

  /**
   * Whether more rows exist beyond this page.
   */
  hasMore: boolean;

  /**
   * Opaque cursor to pass as `?cursor=` for the next page. Empty when `hasMore` is
   * false.
   */
  nextCursor?: string;
}

export namespace ReviewQueueListResponse {
  /**
   * One row of the review queue: an entity plus a small preview of its mentions.
   */
  export interface Entity {
    /**
     * The canonical (longest / most descriptive) surface form.
     */
    canonical: string;

    /**
     * When the entity was created.
     */
    createdAt: string;

    /**
     * Public ID (`ent_...`) of the entity.
     */
    entityID: string;

    /**
     * Total mentions across all parsed documents.
     */
    mentionCount: number;

    /**
     * A capped preview (up to 2) of the entity's first mentions, ordered by page then
     * time, so a reviewer can triage without opening each entity.
     */
    previewMentions: Array<Entity.PreviewMention>;

    /**
     * Curation lifecycle state: `extracted`, `proposed`, `approved`, `rejected`.
     */
    status: string;

    /**
     * Distinct surface forms that have resolved to this entity.
     */
    surfaceForms: Array<string>;

    /**
     * The effective type name (assigned override if set, else bem-inferred).
     */
    type: string;

    /**
     * When the entity was last updated.
     */
    updatedAt: string;

    /**
     * Free-form description of the entity, when present.
     */
    description?: string;

    /**
     * Public ID (`ety_...`) of the customer-assigned type, when one is set.
     */
    typeID?: string;

    /**
     * When a human approved/rejected the entity. Omitted while un-validated.
     */
    validatedAt?: string;

    /**
     * Public ID (`usr_...`) of the user who validated the entity, when known.
     */
    validatedByUserID?: string;
  }

  export namespace Entity {
    /**
     * A single per-document occurrence of an entity, used in review-queue previews.
     */
    export interface PreviewMention {
      /**
       * When this mention was recorded.
       */
      createdAt: string;

      /**
       * Public ID (`ent_...`) of the entity this mention resolves to.
       */
      entityID: string;

      /**
       * Public ID (`emn_...`) of this mention.
       */
      mentionID: string;

      /**
       * 1-indexed page number within the source document.
       */
      page: number;

      /**
       * The user-provided document handle this mention came from.
       */
      referenceID: string;

      /**
       * The exact surface string Parse extracted on the page.
       */
      surface: string;

      /**
       * The parse-emitted section label this mention sat under, when present.
       */
      sectionLabel?: string;

      /**
       * Public ID of the parse transformation that produced this mention, when known.
       */
      transformationID?: string;
    }
  }
}

export interface ReviewQueueListParams {
  /**
   * `me` or a `usr_...` ID — restrict to entities whose effective type that user
   * reviews.
   */
  assignedTo?: string;

  /**
   * Optional bucket public ID (`bkt_...`) to scope to. Omit for all buckets.
   */
  bucket?: string;

  /**
   * Cursor — an `entityID` defining your place in the list.
   */
  cursor?: string;

  limit?: number;

  /**
   * RFC3339 timestamp — restrict to entities created at or after this time.
   */
  since?: string;

  /**
   * Restrict to these lifecycle states. Defaults to `extracted` + `proposed`.
   */
  status?: Array<string>;

  /**
   * Restrict to entities whose effective type is one of these `ety_...` IDs.
   */
  type?: Array<string>;
}

export declare namespace ReviewQueue {
  export {
    type ReviewQueueListResponse as ReviewQueueListResponse,
    type ReviewQueueListParams as ReviewQueueListParams,
  };
}
