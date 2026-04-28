// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ResultsAPI from './results';
import {
  ResultFetchResultsParams,
  ResultFetchResultsResponse,
  ResultRetrieveResultsParams,
  ResultRetrieveResultsResponse,
  Results,
} from './results';
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
export class Eval extends APIResource {
  results: ResultsAPI.Results = new ResultsAPI.Results(this._client);

  /**
   * **Queue evaluation jobs for a batch of transformations.**
   *
   * Evaluations run asynchronously and score each transformation's output against
   * the function's schema for confidence, hallucination detection, and relevance.
   * Transformations must belong to events of a supported type: `extract`,
   * `transform`, `analyze`, or `join`.
   *
   * Returns immediately with a summary of queued vs. skipped transformations and
   * per-transformation errors. Poll `POST /v3/eval/results` or
   * `GET /v3/eval/results` to retrieve results once evaluations complete.
   *
   * @example
   * ```ts
   * const response = await client.eval.triggerEvaluation({
   *   transformationIDs: ['tr_01HXAB...', 'tr_01HXCD...'],
   *   evaluationVersion: '0.1.0-gemini',
   * });
   * ```
   */
  triggerEvaluation(
    body: EvalTriggerEvaluationParams,
    options?: RequestOptions,
  ): APIPromise<EvalTriggerEvaluationResponse> {
    return this._client.post('/v3/eval', { body, ...options });
  }
}

/**
 * Summary of the trigger call. Evaluations run asynchronously; use
 * `POST /v3/eval/results` or `GET /v3/eval/results` to poll for results.
 */
export interface EvalTriggerEvaluationResponse {
  /**
   * Number of evaluation jobs newly queued.
   */
  queued: number;

  /**
   * Number of transformations skipped because an evaluation job was already pending
   * or already completed for them.
   */
  skipped: number;

  /**
   * Map of transformation ID to human-readable error message for any transformations
   * that could not be queued (e.g. not found, unsupported event type).
   */
  errors?: unknown;
}

export interface EvalTriggerEvaluationParams {
  /**
   * Transformation IDs to evaluate. Up to 100 per request.
   */
  transformationIDs: Array<string>;

  /**
   * Optional evaluation version (e.g. `0.1.0-gemini`). When omitted the server's
   * default evaluation version is used.
   */
  evaluationVersion?: string;
}

Eval.Results = Results;

export declare namespace Eval {
  export {
    type EvalTriggerEvaluationResponse as EvalTriggerEvaluationResponse,
    type EvalTriggerEvaluationParams as EvalTriggerEvaluationParams,
  };

  export {
    Results as Results,
    type ResultFetchResultsResponse as ResultFetchResultsResponse,
    type ResultRetrieveResultsResponse as ResultRetrieveResultsResponse,
    type ResultFetchResultsParams as ResultFetchResultsParams,
    type ResultRetrieveResultsParams as ResultRetrieveResultsParams,
  };
}
