// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Monitor, evaluate, and iterate on the quality of every function in your
 * environment. Function Accuracy bundles two complementary loops:
 *
 * ## Evaluations (`/v3/eval`)
 *
 * Trigger and retrieve per-transformation evaluations. Evaluations run
 * asynchronously and score each transformation's output against the
 * function's schema for confidence, per-field hallucination detection,
 * and relevance. Supported for `extract`, `transform`, `analyze`, and
 * `join` events.
 *
 * 1. **Trigger** — `POST /v3/eval` queues jobs for a batch of transformation IDs.
 * 2. **Poll** — `GET /v3/eval/results` returns the current state of each
 *    requested ID, partitioned into `results`, `pending`, and `failed`.
 *    Accepts either `eventIDs` (preferred) or `transformationIDs` as a
 *    comma-separated query parameter, and always keys the response by
 *    event KSUID.
 *
 * Up to 100 IDs may be submitted per request.
 *
 * ## Metrics, review, regression (`/v3/functions/{metrics,review,regression,compare}`)
 *
 * Roll evaluation results and user corrections up into actionable
 * function-level signal:
 *
 * - **`GET /v3/functions/metrics`** — aggregate accuracy, precision,
 *   recall, F1, and confusion-matrix counts per function.
 * - **`POST /v3/functions/review`** — sample-size estimation,
 *   confidence-bucketed distribution, PR-AUC, and per-threshold
 *   confidence intervals (Wald or Wilson) for picking review cutoffs.
 * - **`POST /v3/functions/regression`** — replay corrected historical
 *   inputs against a new function version, producing a labeled
 *   regression dataset.
 * - **`POST /v3/functions/regression/corrections`** — propagate
 *   baseline corrections onto the regression dataset so it can be
 *   scored.
 * - **`POST /v3/functions/compare`** — compute aggregate and
 *   field-level lift between any two versions, optionally scoped to
 *   the regression dataset.
 *
 * All five endpoints support `extract` end-to-end on both the vision
 * and OCR paths, alongside the legacy `transform` / `analyze` / `join`
 * types.
 */
export class Results extends APIResource {
  /**
   * **Fetch evaluation results for a batch of events.**
   *
   * Pass either `eventIDs` (preferred — the externally-stable V3 identifier) or
   * `transformationIDs` as a comma-separated query parameter. Exactly one of the two
   * must be provided. Up to 100 IDs per request.
   *
   * For each requested ID the response reports one of three states: a completed
   * `result`, still-`pending`, or `failed`. Results, pending, and failed entries are
   * all keyed by event KSUID regardless of which input form was used.
   *
   * @example
   * ```ts
   * const evaluationResults =
   *   await client.eval.results.retrieveResults();
   * ```
   */
  retrieveResults(
    query: ResultRetrieveResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EvaluationResults> {
    return this._client.get('/v3/eval/results', { query, ...options });
  }
}

/**
 * Batched response containing the evaluation state for every requested ID,
 * partitioned into completed `results`, still-running `pending`, and terminal
 * `failed` groups. All identifiers in the response are event KSUIDs regardless of
 * whether the request used `eventIDs` or `transformationIDs`.
 */
export interface EvaluationResults {
  /**
   * Completed evaluation results, keyed by event KSUID.
   *
   * An event appears here only if its evaluation completed successfully.
   * Still-running evaluations appear in `pending`; failed evaluations appear in
   * `failed`.
   */
  results: unknown;

  /**
   * Reserved map of event KSUID to error message for validation failures on the
   * request itself. Populated only in edge cases.
   */
  errors?: unknown;

  /**
   * Events whose evaluation failed or was not found.
   */
  failed?: Array<EvaluationResults.Failed>;

  /**
   * Events whose evaluation is still running.
   */
  pending?: Array<EvaluationResults.Pending>;
}

export namespace EvaluationResults {
  /**
   * An event whose evaluation failed or was not found.
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

    /**
     * Event KSUID.
     */
    eventID: string;
  }

  /**
   * An event whose evaluation is still running.
   */
  export interface Pending {
    /**
     * Server timestamp when the evaluation was queued.
     */
    createdAt: string;

    /**
     * Event KSUID.
     */
    eventID: string;
  }
}

export interface ResultRetrieveResultsParams {
  /**
   * Optional evaluation version filter.
   */
  evaluationVersion?: string;

  /**
   * Comma-separated list of event KSUIDs to fetch results for. Between 1 and 100 IDs
   * per request. Mutually exclusive with `transformationIDs`.
   */
  eventIDs?: string;

  /**
   * Comma-separated list of transformation IDs to fetch results for. Between 1 and
   * 100 IDs per request. Mutually exclusive with `eventIDs`. Prefer `eventIDs` for
   * new integrations.
   */
  transformationIDs?: string;
}

export declare namespace Results {
  export {
    type EvaluationResults as EvaluationResults,
    type ResultRetrieveResultsParams as ResultRetrieveResultsParams,
  };
}
