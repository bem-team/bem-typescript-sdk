// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ScoreAPI from './score';
import * as OutputsAPI from '../outputs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
export class Score extends APIResource {
  /**
   * **Score a function against a list of (input, expected) pairs.**
   *
   * Submits a batch of `(input, expected)` pairs, runs the named function over each
   * input, and returns per-pair + aggregate accuracy metrics comparing the
   * function's actual output to the provided expected JSON.
   *
   * Scoring runs asynchronously. The response carries a `scoreRunID`; poll
   * `GET /v3/eval/score/{scoreRunID}` until `status` is one of `completed`, `error`,
   * or `cancelled`.
   *
   * This request says only _what to extract_. How the output is compared against the
   * expected value happens on the GET, recomputed from stored JSON each time.
   *
   * @example
   * ```ts
   * const score = await client.eval.score.create({
   *   functionName: 'functionName',
   * });
   * ```
   */
  create(body: ScoreCreateParams, options?: RequestOptions): APIPromise<ScoreCreateResponse> {
    return this._client.post('/v3/eval/score', { body, ...options });
  }

  /**
   * **Get the status and per-pair results of a score run.**
   *
   * The comparison happens here, not in the run: the function's output is compared
   * against the expected value on every read, under the configuration supplied
   * below. Re-reading the same run with different settings returns different metrics
   * and costs nothing — no model calls are repeated.
   *
   * Comparison is exact and takes no configuration: a value matches the expected one
   * or it is a miss. It is still redone on every read, so the numbers reflect the
   * stored data as it is now.
   *
   * Returns `aggregate` once `status` reaches `completed` or `error`. `perPair` is
   * populated incrementally — each pair's `fieldResults` appears as its underlying
   * function call terminates.
   *
   * @example
   * ```ts
   * const evalScoreRun = await client.eval.score.retrieve(
   *   'scoreRunID',
   * );
   * ```
   */
  retrieve(scoreRunID: string, options?: RequestOptions): APIPromise<EvalScoreRun> {
    return this._client.get(path`/v3/eval/score/${scoreRunID}`, options);
  }

  /**
   * **Cancel an in-flight score run.**
   *
   * Transitions the run to `cancelled`. Function calls already in flight are allowed
   * to finish (best-effort cancellation via the job queue); results from completed
   * pairs may still appear in subsequent GETs.
   *
   * @example
   * ```ts
   * const evalScoreRun = await client.eval.score.cancel(
   *   'scoreRunID',
   * );
   * ```
   */
  cancel(scoreRunID: string, options?: RequestOptions): APIPromise<EvalScoreRun> {
    return this._client.post(path`/v3/eval/score/${scoreRunID}/cancel`, options);
  }
}

/**
 * Full status payload returned by `GET /v3/eval/score/{scoreRunID}`.
 *
 * Scoring takes no configuration: a value matches the expected one or it is a
 * miss. The comparison is still recomputed on every read from the stored JSON, so
 * the numbers reflect the data as it is now rather than as it was when the run
 * executed.
 */
export interface EvalScoreRun {
  functionName: string;

  functionVersionNum: number;

  /**
   * Per-pair results. `fieldResults` appears once a pair has an output to compare.
   */
  perPair: Array<EvalScoreRun.PerPair>;

  /**
   * Counts across all pairs.
   */
  progress: EvalScoreRun.Progress;

  scoreRunID: string;

  /**
   * Status values for an eval-score run.
   */
  status: EvalScoreRunStatus;

  /**
   * Aggregate accuracy metrics.
   */
  aggregate?: EvalScoreRun.Aggregate;
}

export namespace EvalScoreRun {
  /**
   * Per-pair result.
   */
  export interface PerPair {
    pairIndex: number;

    /**
     * Per-pair status.
     */
    status: 'pending' | 'running' | 'completed' | 'failed';

    /**
     * The function call that produced the actual output, if any.
     */
    callID?: string;

    /**
     * Error message if the underlying function call failed.
     */
    errorMessage?: string;

    /**
     * Per-leaf comparator output. Present only after the pair has been compared.
     */
    fieldResults?: Array<PerPair.FieldResult>;
  }

  export namespace PerPair {
    /**
     * One leaf in `expected ∪ actual`.
     */
    export interface FieldResult {
      /**
       * Classification, in the same vocabulary the model-comparison endpoint reports.
       * Comparison is exact — a value matches or it does not:
       *
       * - `match`: both present and deep-equal
       * - `mismatch`: both present, different
       * - `missing`: expected present, actual absent
       * - `extra`: actual present, expected absent
       */
      match: 'match' | 'mismatch' | 'missing' | 'extra';

      /**
       * JSON Pointer to the leaf.
       */
      path: string;

      actual?: unknown;

      /**
       * Populated for every non-identical numeric pair; `actual - expected`. Reported as
       * evidence only — numbers have no threshold, so a delta tells you how far off a
       * value was without ever excusing it.
       */
      delta?: number;

      expected?: unknown;

      /**
       * Populated for every non-identical string pair; the Levenshtein ratio in
       * `[0, 1]`. Reported as evidence: it says how close a wrong value was, which never
       * makes it right.
       */
      similarity?: number;
    }
  }

  /**
   * Counts across all pairs.
   */
  export interface Progress {
    completed: number;

    failed: number;

    total: number;
  }

  /**
   * Aggregate accuracy metrics.
   */
  export interface Aggregate {
    extras: number;

    f1: number;

    matches: number;

    mismatches: number;

    missing: number;

    precision: number;

    recall: number;

    totalFieldsActual: number;

    totalFieldsExpected: number;
  }
}

/**
 * Status values for an eval-score run.
 */
export type EvalScoreRunStatus = 'pending' | 'initializing' | 'running' | 'completed' | 'error' | 'cancelled';

/**
 * A single file input with base64-encoded content.
 *
 * When using the Bem CLI, use `@path/to/file` in the `inputContent` field to
 * automatically read and base64-encode the file:
 * `--input.single-file '{"inputContent": "@file.pdf", "inputType": "pdf"}' --wait`
 */
export interface FileInput {
  /**
   * Base64-encoded file content. In the Bem CLI, use `@path/to/file` to embed file
   * contents automatically.
   */
  inputContent: string;

  /**
   * The input type of the content you're sending for transformation.
   *
   * `jfif` is accepted as an alias for `jpeg` — JFIF is the same format under a
   * different extension — and is normalized to `jpeg`, so responses and webhooks
   * report `jpeg` for a JFIF upload. The undeclared alias `jpg` behaves the same
   * way.
   */
  inputType: OutputsAPI.InputType;
}

/**
 * Returned by `POST /v3/eval/score`.
 */
export interface ScoreCreateResponse {
  /**
   * Run identifier. Use with `GET /v3/eval/score/{scoreRunID}`.
   */
  scoreRunID: string;

  /**
   * Status values for an eval-score run.
   */
  status: EvalScoreRunStatus;
}

export interface ScoreCreateParams {
  /**
   * Name of the function to score. Must be of type extract, transform, or analyze.
   */
  functionName: string;

  /**
   * A saved Golden Data Set (`gds_…`) to score against. Mutually exclusive with
   * `pairs`; provide exactly one. Its input / corrected / schema columns are
   * resolved by column role. When it carries a `schema`-role column, scoring types
   * each row against that ground-truth schema instead of the function's own schema —
   * so results hold up as functions/schemas evolve.
   */
  datasetID?: string;

  /**
   * Optional version number to score against. P0: only the function's current
   * version is accepted; passing a different version returns 422.
   */
  functionVersionNum?: number;

  /**
   * Inline `(input, expected)` pairs to score, up to 1000 per request. Mutually
   * exclusive with `datasetID`; provide exactly one.
   */
  pairs?: Array<ScoreCreateParams.Pair>;
}

export namespace ScoreCreateParams {
  /**
   * One `(input, expected)` pair.
   */
  export interface Pair {
    /**
     * Expected output for this input, as a JSON value. The comparator walks
     * `expected ∪ actual` and produces a per-leaf classification.
     */
    expected: unknown;

    /**
     * A single file input with base64-encoded content.
     *
     * When using the Bem CLI, use `@path/to/file` in the `inputContent` field to
     * automatically read and base64-encode the file:
     * `--input.single-file '{"inputContent": "@file.pdf", "inputType": "pdf"}' --wait`
     */
    input: ScoreAPI.FileInput;
  }
}

export declare namespace Score {
  export {
    type EvalScoreRun as EvalScoreRun,
    type EvalScoreRunStatus as EvalScoreRunStatus,
    type FileInput as FileInput,
    type ScoreCreateResponse as ScoreCreateResponse,
    type ScoreCreateParams as ScoreCreateParams,
  };
}
