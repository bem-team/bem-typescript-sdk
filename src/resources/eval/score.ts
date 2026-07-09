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
   * `matchConfig` controls comparator behavior:
   *
   * - `numericTolerance`: relative tolerance for numeric fields (0 = exact)
   * - `stringMatch`: `exact` (default) or `fuzzy` (Levenshtein ratio)
   * - `arrayMatch`: `by-index` (default; only mode in P0)
   * - `ignorePaths`: JSON Pointer paths to skip, supports `*` wildcards
   *
   * @example
   * ```ts
   * const score = await client.eval.score.create({
   *   functionName: 'functionName',
   *   pairs: [
   *     {
   *       expected: {},
   *       input: {
   *         inputContent: 'inputContent',
   *         inputType: 'csv',
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  create(body: ScoreCreateParams, options?: RequestOptions): APIPromise<ScoreCreateResponse> {
    return this._client.post('/v3/eval/score', { body, ...options });
  }

  /**
   * **Get the status and per-pair results of a score run.**
   *
   * Returns `aggregate` only once `status` reaches `completed`. `perPair` is
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
 * Comparator configuration. All fields optional; conservative defaults.
 */
export interface EvalMatchConfig {
  /**
   * P0 supports only `by-index`.
   */
  arrayMatch?: 'by-index';

  /**
   * Levenshtein-ratio threshold used when `stringMatch == "fuzzy"`. Range `[0, 1]`.
   * Default `0.85`.
   */
  fuzzyThreshold?: number;

  /**
   * JSON Pointer paths to skip during comparison. The asterisk character matches
   * arbitrary object keys / array indices.
   *
   * Example values: /metadata, /lineItems with asterisk segment, etc.
   */
  ignorePaths?: Array<string>;

  /**
   * Relative tolerance for numeric fields. `0` (default) means exact equality;
   * `0.01` means ±1%.
   */
  numericTolerance?: number;

  /**
   * `exact` (default) or `fuzzy`.
   */
  stringMatch?: 'exact' | 'fuzzy';
}

/**
 * Full status payload returned by `GET /v3/eval/score/{scoreRunID}`.
 */
export interface EvalScoreRun {
  functionName: string;

  functionVersionNum: number;

  /**
   * Comparator configuration. All fields optional; conservative defaults.
   */
  matchConfig: EvalMatchConfig;

  /**
   * Per-pair results. `fieldResults` appears once a pair has been compared.
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
       * Classification:
       *
       * - `exact`: both present and deep-equal
       * - `within_tolerance`: both numbers, within configured tolerance
       * - `fuzzy_match`: both strings, Levenshtein ratio above threshold
       * - `miss`: expected present, actual absent or different
       * - `extra`: actual present, expected absent
       */
      match: 'exact' | 'within_tolerance' | 'fuzzy_match' | 'miss' | 'extra';

      /**
       * JSON Pointer to the leaf.
       */
      path: string;

      actual?: unknown;

      /**
       * Populated for numeric comparisons; `actual - expected`.
       */
      delta?: number;

      expected?: unknown;
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
    exactMatches: number;

    extras: number;

    f1: number;

    fuzzyMatches: number;

    misses: number;

    precision: number;

    recall: number;

    totalFieldsActual: number;

    totalFieldsExpected: number;

    withinTolerance: number;
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
   * Up to 1000 pairs per request.
   */
  pairs: Array<ScoreCreateParams.Pair>;

  /**
   * Optional version number to score against. P0: only the function's current
   * version is accepted; passing a different version returns 422.
   */
  functionVersionNum?: number;

  /**
   * Comparator configuration. All fields optional; conservative defaults.
   */
  matchConfig?: EvalMatchConfig;
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
    type EvalMatchConfig as EvalMatchConfig,
    type EvalScoreRun as EvalScoreRun,
    type EvalScoreRunStatus as EvalScoreRunStatus,
    type FileInput as FileInput,
    type ScoreCreateResponse as ScoreCreateResponse,
    type ScoreCreateParams as ScoreCreateParams,
  };
}
