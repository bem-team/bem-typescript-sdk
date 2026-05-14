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
export class Regression extends APIResource {
  /**
   * **Copy baseline corrections onto regression transformations.**
   *
   * Looks up regression transformations created against the comparison version
   * (`isRegression: true`, `correctedJSON IS NULL`), finds the matching baseline
   * transformation by `referenceID`, and copies the baseline's `correctedJSON` onto
   * the regression row via the same code path used by
   * `POST /v3/events/{eventID}/feedback`. The applied corrections are immediately
   * scored against the regression output, populating the confusion-matrix metrics
   * used by `function-review` and `function-version-compare`.
   *
   * Works for every function type that produces correctable transformations,
   * including `extract` on both the vision and OCR paths. (Previously the vision
   * path silently dropped `is_regression` during the original regression run, so no
   * rows matched the predicate — that has been fixed.)
   *
   * Returns counts plus the list of **event KSUIDs** whose underlying regression
   * transformation received a correction. Errors (e.g. baseline transformation
   * missing for a given `referenceID`) are returned per-row in the `errors` map,
   * keyed by event KSUID, rather than aborting the whole call.
   *
   * @example
   * ```ts
   * const response =
   *   await client.functions.regression.applyCorrections({
   *     baselineVersionNum: 3,
   *     comparisonVersionNum: 4,
   *     functionName: 'invoice-extractor',
   *   });
   * ```
   */
  applyCorrections(
    body: RegressionApplyCorrectionsParams,
    options?: RequestOptions,
  ): APIPromise<RegressionApplyCorrectionsResponse> {
    return this._client.post('/v3/functions/regression/corrections', { body, ...options });
  }

  /**
   * **Kick off a regression run between two versions of a function.**
   *
   * Replays a sample of corrected historical inputs against the comparison version,
   * producing fresh transformations marked `isRegression: true`. Each new run
   * returns the workflow `callID`s you can monitor via `GET /v3/calls/{callID}`.
   *
   * Supported for every function type that produces correctable transformations:
   * `extract`, `transform`, `analyze`, `join`. For `extract` specifically, the
   * regression sample is dispatched through the same OCR vs. vision path used at
   * original call time (PDF, PNG, JPEG, HEIC, HEIF, WebP go through the vision
   * worker; everything else goes through OCR → transform).
   *
   * The comparison version must share a schema-compatible output shape with the
   * baseline; structural differences are reported as a 400 with the offending
   * field-level diffs.
   *
   * ## Typical flow
   *
   * 1. `POST /v3/functions/regression` — queues calls, returns
   *    `{ originalReferenceID, callID }` per sample.
   * 2. Wait (poll `GET /v3/calls/{callID}` or subscribe to webhooks).
   * 3. `POST /v3/functions/regression/corrections` to copy baseline corrections onto
   *    the new regression transformations.
   * 4. `POST /v3/functions/compare` to compare baseline vs comparison metrics for
   *    the regression dataset.
   *
   * @example
   * ```ts
   * const response = await client.functions.regression.run({
   *   functionName: 'invoice-extractor',
   *   baselineVersionNum: 3,
   *   comparisonVersionNum: 5,
   *   onlyCorrectedData: true,
   *   sampleSize: 100,
   * });
   * ```
   */
  run(body: RegressionRunParams, options?: RequestOptions): APIPromise<RegressionRunResponse> {
    return this._client.post('/v3/functions/regression', { body, ...options });
  }
}

/**
 * V3 response from applying baseline corrections to regression transformations.
 * Identifiers are surfaced as event KSUIDs — the externally-stable IDs used
 * everywhere else in V3 — in place of the internal transformation IDs returned by
 * the V2 endpoint.
 */
export interface RegressionApplyCorrectionsResponse {
  /**
   * Number of corrections that were applied successfully.
   */
  applied: number;

  /**
   * Event KSUIDs whose underlying regression transformation had a baseline
   * correction copied onto it.
   */
  appliedEventIDs: Array<string>;

  /**
   * Map of event KSUID to error message for any regression rows where the correction
   * could not be applied (e.g. baseline transformation not found for the row's
   * reference ID).
   */
  errors: unknown;

  /**
   * Number of regression transformations that were skipped — typically because they
   * already had a correction or did not have a usable reference ID.
   */
  skipped: number;
}

/**
 * **Response from initiating a regression test**
 *
 * Contains the function call IDs created for async processing and tracking
 * information. Use the returned function call IDs to monitor progress and retrieve
 * results.
 */
export interface RegressionRunResponse {
  /**
   * **Name of the function being tested**
   *
   * Echoes back the function name from the request for confirmation.
   */
  functionName: string;

  /**
   * **Detailed regression test results and tracking information**
   *
   * Contains function call IDs for monitoring progress. When all function calls
   * complete, use the transformation endpoints to retrieve and analyze the actual
   * results.
   */
  result: RegressionRunResponse.Result;
}

export namespace RegressionRunResponse {
  /**
   * **Detailed regression test results and tracking information**
   *
   * Contains function call IDs for monitoring progress. When all function calls
   * complete, use the transformation endpoints to retrieve and analyze the actual
   * results.
   */
  export interface Result {
    /**
     * **Name of the function being tested**
     *
     * The function for which regression testing was initiated.
     */
    functionName: string;

    /**
     * **Total number of samples being tested**
     *
     * This represents the number of historical transformations found with corrections
     * that will be retested with the latest function version.
     */
    totalSamples: number;

    /**
     * **Calls created for regression testing**
     *
     * Each object contains the original reference ID and the new call ID created for
     * testing. Use these call IDs with standard call endpoints to monitor progress:
     *
     * - `GET /v2/calls/{callID}` - Check individual status
     * - `GET /v2/calls?referenceIDs=regression-*` - List all regression calls
     */
    calls?: Array<Result.Call>;
  }

  export namespace Result {
    /**
     * **Call created for regression testing**
     *
     * Links the original historical reference ID to the new call ID created for
     * testing. Use the call ID with standard call endpoints to monitor progress and
     * retrieve results.
     */
    export interface Call {
      /**
       * **New call ID created for regression testing**
       *
       * Use this ID with standard call endpoints:
       *
       * - `GET /v2/calls/{callID}` - Check status and retrieve results
       * - The call will have reference ID matching the original transformation
       */
      callID: string;

      /**
       * **Original reference ID from historical transformation data**
       *
       * This is the reference ID that was used when the historical transformation was
       * originally created. It provides traceability back to the original business
       * context (e.g., invoice number, document ID).
       */
      originalReferenceID: string;
    }
  }
}

export interface RegressionApplyCorrectionsParams {
  /**
   * **Baseline version number (source of corrected data)**
   *
   * The function version number that contains transformations with corrected JSON
   * that should be copied to regression transformations.
   */
  baselineVersionNum: number;

  /**
   * **Comparison version number (target for applying corrections)**
   *
   * The function version number of regression transformations that should receive
   * the corrected JSON from the baseline version.
   */
  comparisonVersionNum: number;

  /**
   * **Name of the function to apply corrections for**
   *
   * Must be an existing function with both baseline and regression transformation
   * data.
   */
  functionName: string;
}

export interface RegressionRunParams {
  /**
   * **Name of the function to test for regressions**
   *
   * Must be an existing function with historical transformation data containing user
   * corrections. The function must be currently active and callable.
   */
  functionName: string;

  /**
   * **Function version number to use as baseline for comparison**
   *
   * - Defaults to `currentVersionNum - 1` (previous version)
   * - Must be a valid, existing version number for the function
   * - Used to retrieve historical transformation data for comparison
   * - Cannot be the same as `comparisonVersionNum`
   */
  baselineVersionNum?: number;

  /**
   * **Function version number to test against the baseline**
   *
   * - Defaults to current version number (latest version)
   * - Must be a valid, existing version number for the function
   * - This version will be used to create new function calls for testing
   * - Cannot be the same as `baselineVersionNum`
   */
  comparisonVersionNum?: number;

  /**
   * **Whether to only test transformations with user corrections**
   *
   * - Defaults to `true` (recommended)
   * - When `true`: Only uses transformations with `correctedJSON` as ground truth
   * - When `false`: May include transformations without corrections (less reliable)
   * - Corrected data provides the most accurate regression testing results
   */
  onlyCorrectedData?: boolean;

  /**
   * **Number of historical samples to test**
   *
   * - Defaults to 50 samples
   * - Minimum: 1, Maximum: 1000
   * - Only transformations with `correctedJSON` (user corrections) are eligible
   * - Actual sample size may be smaller if insufficient corrected data exists
   * - Larger samples provide more statistical confidence but take longer to process
   */
  sampleSize?: number;
}

export declare namespace Regression {
  export {
    type RegressionApplyCorrectionsResponse as RegressionApplyCorrectionsResponse,
    type RegressionRunResponse as RegressionRunResponse,
    type RegressionApplyCorrectionsParams as RegressionApplyCorrectionsParams,
    type RegressionRunParams as RegressionRunParams,
  };
}
