// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ErrorsAPI from './errors';
import * as OutputsAPI from './outputs';
import { APIPromise } from '../core/api-promise';
import { CallsPage, type CallsPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * The Calls API provides a unified interface for invoking both **Workflows** and **Functions**.
 *
 * Use this API when you want to:
 * - Execute a complete workflow that chains multiple functions together
 * - Call a single function directly without defining a workflow
 * - Submit batch requests with multiple inputs in a single API call
 * - Track execution status using call reference IDs
 *
 * **Key Difference**: Calls vs Function Calls
 * - **Calls API** (`/v3/calls`): High-level API for invoking workflows or functions by name/ID. Supports batch processing and workflow orchestration.
 * - **Function Calls API** (`/v3/functions/{functionName}/call`): Direct function invocation with function-type-specific arguments. Better for granular control over individual function calls.
 */
export class Calls extends APIResource {
  /**
   * **Retrieve a workflow call by ID.**
   *
   * Returns the full call object including status, workflow details, terminal
   * outputs, and terminal errors. `outputs` and `errors` are both populated once the
   * call finishes — they are not mutually exclusive (a partially-completed workflow
   * may have both).
   *
   * ## Status
   *
   * | Status      | Description                                                 |
   * | ----------- | ----------------------------------------------------------- |
   * | `pending`   | Queued, not yet started                                     |
   * | `running`   | Currently executing                                         |
   * | `completed` | All enclosed function calls finished without errors         |
   * | `failed`    | One or more enclosed function calls produced an error event |
   *
   * Poll this endpoint or configure a webhook subscription to detect completion.
   */
  retrieve(callID: string, options?: RequestOptions): APIPromise<CallGetResponse> {
    return this._client.get(path`/v3/calls/${callID}`, options);
  }

  /**
   * **List workflow calls with filtering and pagination.**
   *
   * Returns calls created via `POST /v3/workflows/{workflowName}/call`.
   *
   * ## Filtering
   *
   * - `callIDs`: Specific call identifiers
   * - `referenceIDs`: Your custom reference IDs
   * - `workflowIDs` / `workflowNames`: Filter by workflow
   *
   * ## Pagination
   *
   * Use `startingAfter` and `endingBefore` cursors with a default limit of 50.
   */
  list(
    query: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CallsCallsPage, Call> {
    return this._client.getAPIList('/v3/calls', CallsPage<Call>, { query, ...options });
  }
}

export type CallsCallsPage = CallsPage<Call>;

/**
 * A workflow call returned by the V3 API.
 *
 * Compared to the V2 `Call` model:
 *
 * - Terminal outputs are split into `outputs` (non-error events) and `errors`
 *   (error events)
 * - `callType` and function-scoped fields are removed — V3 calls are always
 *   workflow calls
 * - The deprecated `functionCalls` field is removed (use
 *   `GET /v3/calls/{callID}/trace`)
 * - `url` and `traceUrl` hint fields are included for resource discovery
 */
export interface Call {
  /**
   * Unique identifier of the call.
   */
  callID: string;

  /**
   * The date and time the call was created.
   */
  createdAt: string;

  /**
   * Terminal error events of this call. Workflow calls are not atomic — `errors` and
   * `outputs` may both be non-empty if some enclosed function calls succeeded and
   * others failed.
   *
   * Retrieve individual errors via `GET /v3/errors/{eventID}`.
   */
  errors: Array<ErrorsAPI.ErrorEvent>;

  /**
   * Terminal non-error outputs of this call: primary events (non-split-collection)
   * that did not trigger any downstream function calls. Workflow calls are not
   * atomic — `outputs` and `errors` may both be non-empty if some enclosed function
   * calls succeeded and others failed.
   *
   * Each element is a polymorphic event object; inspect `eventType` to determine the
   * type. Retrieve individual outputs via `GET /v3/outputs/{eventID}`.
   */
  outputs: Array<OutputsAPI.Event>;

  /**
   * Hint URL for the full execution trace: `GET /v3/calls/{callID}/trace`.
   */
  traceUrl: string;

  /**
   * Hint URL for retrieving this call: `GET /v3/calls/{callID}`.
   */
  url: string;

  /**
   * Your reference ID for this call, propagated from the original request.
   */
  callReferenceID?: string;

  /**
   * The date and time the call finished. Only set once status is `completed` or
   * `failed`.
   */
  finishedAt?: string;

  /**
   * Input to the main function call.
   */
  input?: Call.Input;

  /**
   * Status of call.
   */
  status?: 'pending' | 'running' | 'completed' | 'failed';

  /**
   * Unique identifier of the workflow.
   */
  workflowID?: string;

  /**
   * Name of the workflow.
   */
  workflowName?: string;

  /**
   * Version number of the workflow.
   */
  workflowVersionNum?: number;
}

export namespace Call {
  /**
   * Input to the main function call.
   */
  export interface Input {
    batchFiles?: Input.BatchFiles;

    singleFile?: Input.SingleFile;
  }

  export namespace Input {
    export interface BatchFiles {
      inputs?: Array<BatchFiles.Input>;
    }

    export namespace BatchFiles {
      export interface Input {
        /**
         * Input type of the file
         */
        inputType?: string;

        /**
         * Item reference ID
         */
        itemReferenceID?: string;

        /**
         * Presigned S3 URL for the file
         */
        s3URL?: string;
      }
    }

    export interface SingleFile {
      /**
       * Input type of the file
       */
      inputType?: string;

      /**
       * Presigned S3 URL for the file
       */
      s3URL?: string;
    }
  }
}

export interface CallGetResponse {
  /**
   * A workflow call returned by the V3 API.
   *
   * Compared to the V2 `Call` model:
   *
   * - Terminal outputs are split into `outputs` (non-error events) and `errors`
   *   (error events)
   * - `callType` and function-scoped fields are removed — V3 calls are always
   *   workflow calls
   * - The deprecated `functionCalls` field is removed (use
   *   `GET /v3/calls/{callID}/trace`)
   * - `url` and `traceUrl` hint fields are included for resource discovery
   */
  call?: Call;

  /**
   * Error message if the call retrieval failed, or if the call itself failed when
   * using `wait=true`.
   */
  error?: string;
}

export interface CallListParams extends CallsPageParams {
  callIDs?: Array<string>;

  referenceIDs?: Array<string>;

  /**
   * Case-insensitive substring match against `callReferenceID`.
   */
  referenceIDSubstring?: string;

  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by one or more statuses.
   */
  statuses?: Array<'pending' | 'running' | 'completed' | 'failed'>;

  workflowIDs?: Array<string>;

  workflowNames?: Array<string>;
}

export declare namespace Calls {
  export {
    type Call as Call,
    type CallGetResponse as CallGetResponse,
    type CallsCallsPage as CallsCallsPage,
    type CallListParams as CallListParams,
  };
}
