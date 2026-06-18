// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Reviewer assignments link users to the entity types they are responsible
 * for reviewing, scoped to an account+environment. These are dashboard-only
 * endpoints: an assignment needs a user identity, which only the dashboard
 * (JWT) surface carries.
 *
 * - **`POST /v3/entity-types/{typeID}/reviewers`** assigns a user as a
 *   reviewer of the type. The assignment is idempotent: re-assigning an
 *   existing reviewer returns the existing assignment. Requires the `admin`
 *   role.
 * - **`GET /v3/entity-types/{typeID}/reviewers`** lists the users assigned
 *   to review the type, with each user's email and role. Requires the
 *   `operator` role.
 * - **`DELETE /v3/entity-types/{typeID}/reviewers/{userID}`** removes an
 *   assignment. Requires the `admin` role.
 * - **`GET /v3/users/{userID}/reviewer-assignments`** is the reverse lookup:
 *   the entity types a user reviews. A user may read their own assignments;
 *   reading another user's assignments requires the `admin` role.
 */
export class Reviewers extends APIResource {
  /**
   * List Reviewers
   *
   * @example
   * ```ts
   * const reviewers = await client.entityTypes.reviewers.list(
   *   'typeID',
   * );
   * ```
   */
  list(typeID: string, options?: RequestOptions): APIPromise<ReviewerListResponse> {
    return this._client.get(path`/v3/entity-types/${typeID}/reviewers`, options);
  }

  /**
   * Assign a Reviewer
   *
   * @example
   * ```ts
   * const response = await client.entityTypes.reviewers.assign(
   *   'typeID',
   *   { userID: 'usr_2xyz...' },
   * );
   * ```
   */
  assign(
    typeID: string,
    body: ReviewerAssignParams,
    options?: RequestOptions,
  ): APIPromise<ReviewerAssignResponse> {
    return this._client.post(path`/v3/entity-types/${typeID}/reviewers`, { body, ...options });
  }

  /**
   * Remove a Reviewer
   *
   * @example
   * ```ts
   * await client.entityTypes.reviewers.remove('userID', {
   *   typeID: 'typeID',
   * });
   * ```
   */
  remove(userID: string, params: ReviewerRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { typeID } = params;
    return this._client.delete(path`/v3/entity-types/${typeID}/reviewers/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Response body for listing the reviewers of an entity type.
 */
export interface ReviewerListResponse {
  reviewers: Array<ReviewerListResponse.Reviewer>;
}

export namespace ReviewerListResponse {
  /**
   * A reviewer assignment links a user to an entity type they are responsible for
   * reviewing. The assignment is scoped to an account+environment and is unique per
   * (entity type, user).
   */
  export interface Reviewer {
    /**
     * When the assignment was created (RFC 3339).
     */
    createdAt: string;

    /**
     * The assigned user's email.
     */
    email: string;

    /**
     * Stable public identifier for the assignment (`etr_...`).
     */
    reviewerID: string;

    /**
     * The assigned user's account role (for example `operator`, `admin`).
     */
    role: string;

    /**
     * Public identifier of the assigned user (`usr_...`).
     */
    userID: string;
  }
}

/**
 * A reviewer assignment links a user to an entity type they are responsible for
 * reviewing. The assignment is scoped to an account+environment and is unique per
 * (entity type, user).
 */
export interface ReviewerAssignResponse {
  /**
   * When the assignment was created (RFC 3339).
   */
  createdAt: string;

  /**
   * The assigned user's email.
   */
  email: string;

  /**
   * Stable public identifier for the assignment (`etr_...`).
   */
  reviewerID: string;

  /**
   * The assigned user's account role (for example `operator`, `admin`).
   */
  role: string;

  /**
   * Public identifier of the assigned user (`usr_...`).
   */
  userID: string;
}

export interface ReviewerAssignParams {
  /**
   * Public ID (`usr_...`) of the user to assign. Must belong to the account.
   */
  userID: string;
}

export interface ReviewerRemoveParams {
  /**
   * Entity type public ID (`ety_...`).
   */
  typeID: string;
}

export declare namespace Reviewers {
  export {
    type ReviewerListResponse as ReviewerListResponse,
    type ReviewerAssignResponse as ReviewerAssignResponse,
    type ReviewerAssignParams as ReviewerAssignParams,
    type ReviewerRemoveParams as ReviewerRemoveParams,
  };
}
