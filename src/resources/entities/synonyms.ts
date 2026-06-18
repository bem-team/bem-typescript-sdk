// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage the human-readable surface forms (synonyms) attached to a canonical
 * entity. Synonyms feed the matcher's exact-match path, so adding the right
 * synonyms improves cross-document entity resolution.
 *
 * - **`POST /v3/entities/{id}/synonyms`** attaches a `customer_defined`
 *   synonym. If the same normalized form already exists as an `extracted`
 *   synonym, it is upgraded to `customer_defined` (so the matcher weights it
 *   higher); an existing customer/SME synonym is returned unchanged.
 * - **`DELETE /v3/entities/{id}/synonyms/{synonymID}`** soft-deletes a
 *   synonym. Only `customer_defined` and `sme_approved` synonyms are
 *   deletable; `extracted` synonyms are resolver-owned and the request is
 *   rejected with `409 Conflict`.
 *
 * A merged-away entity id transparently resolves to its surviving canonical
 * entity, so a synonym added to a stale id lands on the entity that persists.
 */
export class Synonyms extends APIResource {
  /**
   * Add a Synonym to an Entity
   *
   * @example
   * ```ts
   * const response = await client.entities.synonyms.add('id', {
   *   text: 'ACME Corporation',
   *   locale: 'en-US',
   * });
   * ```
   */
  add(id: string, params: SynonymAddParams, options?: RequestOptions): APIPromise<SynonymAddResponse> {
    const { bucket, ...body } = params;
    return this._client.post(path`/v3/entities/${id}/synonyms`, { query: { bucket }, body, ...options });
  }

  /**
   * Remove a Synonym from an Entity
   *
   * @example
   * ```ts
   * await client.entities.synonyms.remove('synonymID', {
   *   id: 'id',
   * });
   * ```
   */
  remove(synonymID: string, params: SynonymRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { id, bucket } = params;
    return this._client.delete(path`/v3/entities/${id}/synonyms/${synonymID}`, {
      query: { bucket },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * One synonym attached to an entity.
 */
export interface SynonymAddResponse {
  /**
   * Creation timestamp of the synonym (RFC 3339).
   */
  createdAt: string;

  /**
   * Lowercased, whitespace-folded form of `text`.
   */
  normalizedText: string;

  /**
   * Provenance of the synonym. `customer_defined` and `sme_approved` synonyms are
   * deletable; `extracted` synonyms are resolver-owned and cannot be deleted.
   */
  source: 'extracted' | 'customer_defined' | 'sme_approved';

  /**
   * Stable public identifier for the synonym (`esn_...`).
   */
  synonymID: string;

  /**
   * The human-readable synonym as authored.
   */
  text: string;

  /**
   * Optional BCP 47 locale tag, when one was supplied.
   */
  locale?: string;
}

export interface SynonymAddParams {
  /**
   * Body param: The human-readable synonym surface form to attach (e.g. `Acme Corp`,
   * `ACME`). It is normalized (lowercased, whitespace-folded) for the uniqueness key
   * and the matcher's exact-match path.
   */
  text: string;

  /**
   * Query param: Optional bucket public ID (`bkt_...`) to scope the entity lookup to
   * one bucket. Omit for the unscoped (all account+environment) view.
   */
  bucket?: string;

  /**
   * Body param: Optional BCP 47 locale tag (e.g. `en-US`) for language-specific
   * synonyms.
   */
  locale?: string;
}

export interface SynonymRemoveParams {
  /**
   * Path param: Entity public ID (`ent_...`). A merged-away id resolves to the
   * surviving entity.
   */
  id: string;

  /**
   * Query param: Optional bucket public ID (`bkt_...`) to scope the entity lookup to
   * one bucket. Omit for the unscoped (all account+environment) view.
   */
  bucket?: string;
}

export declare namespace Synonyms {
  export {
    type SynonymAddResponse as SynonymAddResponse,
    type SynonymAddParams as SynonymAddParams,
    type SynonymRemoveParams as SynonymRemoveParams,
  };
}
