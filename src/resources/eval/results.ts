// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Trigger and retrieve evaluations for completed transformations.
 *
 * Evaluations run asynchronously and score each transformation's output against
 * the function's schema for confidence, per-field hallucination detection, and
 * relevance. Evaluations are supported for `extract`, `transform`, `analyze`,
 * and `join` events.
 *
 * ## Lifecycle
 *
 * 1. **Trigger** — `POST /v3/eval` queues jobs for a batch of transformation IDs
 *    and returns immediately with `queued` / `skipped` counts plus per-ID errors.
 * 2. **Poll** — `POST /v3/eval/results` (body) or `GET /v3/eval/results` (query)
 *    returns the current state of each requested transformation, partitioned
 *    into `results` (completed), `pending` (still running), and `failed`
 *    (terminal failures or unknown transformation IDs).
 *
 * Up to 100 transformation IDs may be submitted per request.
 */
export class Results extends APIResource {
  /**
   * **Fetch evaluation results for a batch of transformations (POST).**
   *
   * For each requested transformation ID the response reports one of three states: a
   * completed `result`, still-`pending`, or `failed`. The POST variant accepts the
   * ID list in the request body; use the `GET` variant with query parameters for
   * simpler clients.
   *
   * @example
   * ```ts
   * const response = await client.eval.results.fetchResults({
   *   transformationIDs: ['tr_01HXAB...', 'tr_01HXCD...'],
   *   evaluationVersion: '0.1.0-gemini',
   * });
   * ```
   */
  fetchResults(
    body: ResultFetchResultsParams,
    options?: RequestOptions,
  ): APIPromise<ResultFetchResultsResponse> {
    return this._client.post('/v3/eval/results', { body, ...options });
  }

  /**
   * **Fetch evaluation results for a batch of transformations.**
   *
   * Identical behavior to the POST variant; accepts transformation IDs as a
   * comma-separated `transformationIDs` query parameter. Limited to 100 IDs per
   * request.
   *
   * @example
   * ```ts
   * const response = await client.eval.results.retrieveResults({
   *   transformationIDs: 'transformationIDs',
   * });
   * ```
   */
  retrieveResults(
    query: ResultRetrieveResultsParams,
    options?: RequestOptions,
  ): APIPromise<ResultRetrieveResultsResponse> {
    return this._client.get('/v3/eval/results', { query, ...options });
  }
}

/**
 * Batched response containing the evaluation state for every requested
 * transformation ID, partitioned into completed `results`, still-running
 * `pending`, and terminal `failed` groups.
 */
export interface ResultFetchResultsResponse {
  /**
   * Completed evaluation results, keyed by transformation ID.
   *
   * A transformation appears here only if its evaluation completed successfully.
   * Still-running evaluations appear in `pending`; failed evaluations appear in
   * `failed`.
   */
  results: unknown;

  /**
   * Reserved map of transformation ID to error message for validation failures on
   * the request itself. Populated only in edge cases.
   */
  errors?: unknown;

  /**
   * Transformations whose evaluation failed or was not found.
   */
  failed?: Array<ResultFetchResultsResponse.Failed>;

  /**
   * Transformations whose evaluation is still running.
   */
  pending?: Array<ResultFetchResultsResponse.Pending>;
}

export namespace ResultFetchResultsResponse {
  /**
   * A transformation whose evaluation failed or was not found.
   */
  export interface Failed {
    /**
     * Server timestamp associated with the failure.
     */
    createdAt: string;

    /**
     * Human-readable failure reason.
     */
    errorMessage: string;

    transformationId: string;
  }

  /**
   * A transformation whose evaluation is still running.
   */
  export interface Pending {
    /**
     * Server timestamp when the evaluation was queued.
     */
    createdAt: string;

    transformationId: string;
  }
}

/**
 * Batched response containing the evaluation state for every requested
 * transformation ID, partitioned into completed `results`, still-running
 * `pending`, and terminal `failed` groups.
 */
export interface ResultRetrieveResultsResponse {
  /**
   * Completed evaluation results, keyed by transformation ID.
   *
   * A transformation appears here only if its evaluation completed successfully.
   * Still-running evaluations appear in `pending`; failed evaluations appear in
   * `failed`.
   */
  results: unknown;

  /**
   * Reserved map of transformation ID to error message for validation failures on
   * the request itself. Populated only in edge cases.
   */
  errors?: unknown;

  /**
   * Transformations whose evaluation failed or was not found.
   */
  failed?: Array<ResultRetrieveResultsResponse.Failed>;

  /**
   * Transformations whose evaluation is still running.
   */
  pending?: Array<ResultRetrieveResultsResponse.Pending>;
}

export namespace ResultRetrieveResultsResponse {
  /**
   * A transformation whose evaluation failed or was not found.
   */
  export interface Failed {
    /**
     * Server timestamp associated with the failure.
     */
    createdAt: string;

    /**
     * Human-readable failure reason.
     */
    errorMessage: string;

    transformationId: string;
  }

  /**
   * A transformation whose evaluation is still running.
   */
  export interface Pending {
    /**
     * Server timestamp when the evaluation was queued.
     */
    createdAt: string;

    transformationId: string;
  }
}

export interface ResultFetchResultsParams {
  /**
   * Transformation IDs to fetch results for. Up to 100 per request.
   */
  transformationIDs: Array<string>;

  /**
   * Optional evaluation version filter.
   */
  evaluationVersion?: string;
}

export interface ResultRetrieveResultsParams {
  /**
   * Comma-separated list of transformation IDs to fetch results for. Between 1 and
   * 100 IDs per request.
   */
  transformationIDs: string;

  /**
   * Optional evaluation version filter.
   */
  evaluationVersion?: string;
}

export declare namespace Results {
  export {
    type ResultFetchResultsResponse as ResultFetchResultsResponse,
    type ResultRetrieveResultsResponse as ResultRetrieveResultsResponse,
    type ResultFetchResultsParams as ResultFetchResultsParams,
    type ResultRetrieveResultsParams as ResultRetrieveResultsParams,
  };
}
