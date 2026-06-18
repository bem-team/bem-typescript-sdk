// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
export class Users extends APIResource {
  /**
   * List a User's Reviewer Assignments
   */
  listReviewerAssignments(
    userID: string,
    options?: RequestOptions,
  ): APIPromise<UserListReviewerAssignmentsResponse> {
    return this._client.get(path`/v3/users/${userID}/reviewer-assignments`, options);
  }
}

/**
 * Response body for the reverse lookup of a user's reviewer assignments.
 */
export interface UserListReviewerAssignmentsResponse {
  assignments: Array<UserListReviewerAssignmentsResponse.Assignment>;
}

export namespace UserListReviewerAssignmentsResponse {
  /**
   * One entity type a user reviews, as returned by the reverse-lookup endpoint. The
   * type is exposed via its public ID plus its name and description.
   */
  export interface Assignment {
    /**
     * When the assignment was created (RFC 3339).
     */
    createdAt: string;

    /**
     * The entity type's description.
     */
    description: string;

    /**
     * The entity type's human-facing name.
     */
    name: string;

    /**
     * Public ID (`ety_...`) of the entity type the user reviews.
     */
    typeID: string;
  }
}

export declare namespace Users {
  export { type UserListReviewerAssignmentsResponse as UserListReviewerAssignmentsResponse };
}
