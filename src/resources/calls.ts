// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ErrorsAPI from './errors';
import * as OutputsAPI from './outputs';
import * as FunctionsAPI from './functions/functions';
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

  /**
   * **Retrieve the full execution trace of a workflow call.**
   *
   * Returns all function calls and events emitted during the call as flat arrays.
   * The DAG can be reconstructed using `FunctionCallResponseBase.sourceEventID` (the
   * event that spawned each function call) and each event's `functionCallID` (the
   * function call that emitted it).
   *
   * ## Graph structure
   *
   * - A function call with no `sourceEventID` is the root.
   * - An event's `functionCallID` points to the function call that emitted it.
   * - A function call's `sourceEventID` points to the event that triggered it.
   * - `workflowNodeName` identifies the DAG node; `incomingDestinationName`
   *   identifies the labelled outlet used to reach this call (absent for unlabelled
   *   edges and root calls).
   *
   * The trace is available as soon as the call exists and grows as execution
   * proceeds.
   */
  retrieveTrace(callID: string, options?: RequestOptions): APIPromise<CallRetrieveTraceResponse> {
    return this._client.get(path`/v3/calls/${callID}/trace`, options);
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
  outputs: Array<
    | Call.TransformEvent
    | Call.ExtractEvent
    | Call.RouteEvent
    | Call.ClassifyEvent
    | Call.SplitCollectionEvent
    | Call.SplitItemEvent
    | ErrorsAPI.ErrorEvent
    | Call.JoinEvent
    | Call.EnrichEvent
    | Call.CollectionProcessingEvent
    | Call.SendEvent
  >;

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
  export interface TransformEvent {
    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The number of items that were transformed. Used for batch transformations to
     * indicate how many items were transformed.
     */
    itemCount: number;

    /**
     * The offset of the first item that was transformed. Used for batch
     * transformations to indicate which item in the batch this event corresponds to.
     */
    itemOffset: number;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * The transformed content of the input. The structure of this object is defined by
     * the function configuration.
     */
    transformedContent: unknown;

    /**
     * Average confidence score across all extracted fields, in the range [0, 1].
     */
    avgConfidence?: number | null;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Corrected feedback provided for fine-tuning purposes.
     */
    correctedContent?: TransformEvent.Output | unknown | Array<unknown> | string | number | boolean | null;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'transform';

    /**
     * Per-field confidence scores. A JSON object mapping RFC 6901 JSON Pointer paths
     * (e.g. `"/invoiceNumber"`) to float values in the range [0, 1] indicating the
     * model's confidence in each extracted field value.
     */
    fieldConfidences?: unknown;

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    /**
     * Array of transformation inputs with their types and S3 URLs.
     */
    inputs?: Array<TransformEvent.Input> | null;

    /**
     * The input type of the content you're sending for transformation.
     */
    inputType?:
      | 'csv'
      | 'docx'
      | 'email'
      | 'heic'
      | 'html'
      | 'jpeg'
      | 'json'
      | 'heif'
      | 'm4a'
      | 'mp3'
      | 'pdf'
      | 'png'
      | 'text'
      | 'wav'
      | 'webp'
      | 'xls'
      | 'xlsx'
      | 'xml';

    /**
     * List of properties that were invalid in the input.
     */
    invalidProperties?: Array<string>;

    /**
     * Indicates whether this transformation was created as part of a regression test.
     */
    isRegression?: boolean;

    /**
     * Last timestamp indicating when the transform was published via webhook and
     * received a non-200 response. Set to `null` on a subsequent retry if the webhook
     * service receives a 200 response.
     */
    lastPublishErrorAt?: string | null;

    metadata?: TransformEvent.Metadata;

    /**
     * Accuracy, precision, recall, and F1 score when corrected JSON is provided.
     */
    metrics?: TransformEvent.Metrics | null;

    /**
     * Indicates whether array order matters when comparing corrected JSON with
     * extracted JSON.
     */
    orderMatching?: boolean;

    /**
     * ID of pipeline that transformed the original input data.
     */
    pipelineID?: string;

    /**
     * Timestamp indicating when the transform was published via webhook and received a
     * successful 200 response. Value is `null` if the transformation hasn't been sent.
     */
    publishedAt?: string;

    /**
     * Presigned S3 URL for the input content uploaded to S3.
     */
    s3URL?: string | null;

    /**
     * Unique ID for each transformation output generated by bem following Segment's
     * KSUID conventions.
     */
    transformationID?: string;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace TransformEvent {
    export interface Output {
      output?: Array<OutputsAPI.AnyType | null>;
    }

    export interface Input {
      inputContent?: string | null;

      inputType?: string | null;

      jsonInputContent?: unknown | null;

      s3URL?: string | null;
    }

    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }

    /**
     * Accuracy, precision, recall, and F1 score when corrected JSON is provided.
     */
    export interface Metrics {
      differences?: Array<Metrics.Difference>;

      metrics?: Metrics.Metrics;
    }

    export namespace Metrics {
      export interface Difference {
        category?: string;

        correctedVal?: unknown;

        extractedVal?: unknown;

        jsonPointer?: string;
      }

      export interface Metrics {
        accuracy?: number;

        f1Score?: number;

        precision?: number;

        recall?: number;
      }
    }
  }

  /**
   * V3 event variants that do not exist in the shared `Event` union.
   *
   * `ExtractEvent` and `ClassifyEvent` are emitted only by V3-era function types
   * (`extract` and `classify`). The shared `Event` union in
   * `specs/events/models.tsp` predates these types and continues to describe V2 /
   * V1-alpha responses verbatim; V3 response payloads add the new variants via the
   * `EventV3` union below while keeping every shared variant intact for backward
   * compatibility.
   */
  export interface ExtractEvent {
    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The number of items that were transformed. Used for batch transformations to
     * indicate how many items were transformed.
     */
    itemCount: number;

    /**
     * The offset of the first item that was transformed. Used for batch
     * transformations to indicate which item in the batch this event corresponds to.
     */
    itemOffset: number;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * The transformed content of the input. The structure of this object is defined by
     * the function configuration.
     */
    transformedContent: unknown;

    /**
     * Average confidence score across all extracted fields, in the range [0, 1].
     */
    avgConfidence?: number | null;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Corrected feedback provided for fine-tuning purposes.
     */
    correctedContent?: ExtractEvent.Output | unknown | Array<unknown> | string | number | boolean | null;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'extract';

    /**
     * Per-field confidence scores. A JSON object mapping RFC 6901 JSON Pointer paths
     * (e.g. `"/invoiceNumber"`) to float values in the range [0, 1] indicating the
     * model's confidence in each extracted field value.
     */
    fieldConfidences?: unknown;

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    /**
     * Array of transformation inputs with their types and S3 URLs.
     */
    inputs?: Array<ExtractEvent.Input> | null;

    /**
     * The input type of the content you're sending for transformation.
     */
    inputType?:
      | 'csv'
      | 'docx'
      | 'email'
      | 'heic'
      | 'html'
      | 'jpeg'
      | 'json'
      | 'heif'
      | 'm4a'
      | 'mp3'
      | 'pdf'
      | 'png'
      | 'text'
      | 'wav'
      | 'webp'
      | 'xls'
      | 'xlsx'
      | 'xml';

    /**
     * List of properties that were invalid in the input.
     */
    invalidProperties?: Array<string>;

    metadata?: ExtractEvent.Metadata;

    /**
     * Presigned S3 URL for the input content uploaded to S3.
     */
    s3URL?: string | null;

    /**
     * Unique ID for each transformation output generated by bem following Segment's
     * KSUID conventions.
     */
    transformationID?: string;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace ExtractEvent {
    export interface Output {
      output?: Array<OutputsAPI.AnyType | null>;
    }

    export interface Input {
      inputContent?: string | null;

      inputType?: string | null;

      jsonInputContent?: unknown | null;

      s3URL?: string | null;
    }

    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface RouteEvent {
    /**
     * The choice made by the router function.
     */
    choice: string;

    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'route';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: RouteEvent.Metadata;

    /**
     * The presigned S3 URL of the file that was routed.
     */
    s3URL?: string;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace RouteEvent {
    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface ClassifyEvent {
    /**
     * The classification chosen by the classify function.
     */
    choice: string;

    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'classify';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: ClassifyEvent.Metadata;

    /**
     * The presigned S3 URL of the file that was classified.
     */
    s3URL?: string;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace ClassifyEvent {
    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface SplitCollectionEvent {
    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    outputType: 'print_page' | 'semantic_page';

    printPageOutput: SplitCollectionEvent.PrintPageOutput;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    semanticPageOutput: SplitCollectionEvent.SemanticPageOutput;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'split_collection';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: SplitCollectionEvent.Metadata;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace SplitCollectionEvent {
    export interface PrintPageOutput {
      itemCount?: number;

      items?: Array<PrintPageOutput.Item>;
    }

    export namespace PrintPageOutput {
      export interface Item {
        itemOffset?: number;

        itemReferenceID?: string;

        s3URL?: string;
      }
    }

    export interface SemanticPageOutput {
      itemCount?: number;

      items?: Array<SemanticPageOutput.Item>;

      pageCount?: number;
    }

    export namespace SemanticPageOutput {
      export interface Item {
        itemClass?: string;

        itemClassCount?: number;

        itemClassOffset?: number;

        itemOffset?: number;

        itemReferenceID?: string;

        pageEnd?: number;

        pageStart?: number;

        s3URL?: string;
      }
    }

    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface SplitItemEvent {
    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    outputType: 'print_page' | 'semantic_page';

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'split_item';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: SplitItemEvent.Metadata;

    printPageOutput?: SplitItemEvent.PrintPageOutput;

    semanticPageOutput?: SplitItemEvent.SemanticPageOutput;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace SplitItemEvent {
    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }

    export interface PrintPageOutput {
      collectionReferenceID?: string;

      itemCount?: number;

      itemOffset?: number;

      s3URL?: string;
    }

    export interface SemanticPageOutput {
      collectionReferenceID?: string;

      itemClass?: string;

      itemClassCount?: number;

      itemClassOffset?: number;

      itemCount?: number;

      itemOffset?: number;

      pageCount?: number;

      pageEnd?: number;

      pageStart?: number;

      s3URL?: string;
    }
  }

  export interface JoinEvent {
    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * List of properties that were invalid in the input.
     */
    invalidProperties: Array<string>;

    /**
     * The items that were joined.
     */
    items: Array<JoinEvent.Item>;

    /**
     * The type of join that was performed.
     */
    joinType: 'standard';

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * The transformed content of the input. The structure of this object is defined by
     * the function configuration.
     */
    transformedContent: unknown;

    /**
     * Average confidence score across all extracted fields, in the range [0, 1].
     */
    avgConfidence?: number | null;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'join';

    /**
     * Per-field confidence scores. A JSON object mapping RFC 6901 JSON Pointer paths
     * (e.g. `"/invoiceNumber"`) to float values in the range [0, 1] indicating the
     * model's confidence in each extracted field value.
     */
    fieldConfidences?: unknown;

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: JoinEvent.Metadata;

    /**
     * Unique ID for each transformation output generated by bem following Segment's
     * KSUID conventions.
     */
    transformationID?: string;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace JoinEvent {
    export interface Item {
      /**
       * The number of items that were transformed.
       */
      itemCount: number;

      /**
       * The offset of the first item that was transformed. Used for batch
       * transformations to indicate which item in the batch this event corresponds to.
       */
      itemOffset: number;

      /**
       * The unique ID you use internally to refer to this data point.
       */
      itemReferenceID: string;

      /**
       * The presigned S3 URL of the file that was joined.
       */
      s3URL?: string;
    }

    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface EnrichEvent {
    /**
     * The enriched content produced by the enrich function. Contains the input data
     * augmented with results from semantic search against collections.
     */
    enrichedContent: unknown;

    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    eventType?: 'enrich';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: EnrichEvent.Metadata;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace EnrichEvent {
    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface CollectionProcessingEvent {
    /**
     * Unique identifier of the collection.
     */
    collectionID: string;

    /**
     * Name/path of the collection.
     */
    collectionName: string;

    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * The operation performed (add or update).
     */
    operation: 'add' | 'update';

    /**
     * Number of items successfully processed.
     */
    processedCount: number;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Processing status (success or failed).
     */
    status: 'success' | 'failed';

    /**
     * Array of collection item KSUIDs that were added or updated.
     */
    collectionItemIDs?: Array<string>;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    /**
     * Error message if processing failed.
     */
    errorMessage?: string;

    eventType?: 'collection_processing';

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: CollectionProcessingEvent.Metadata;
  }

  export namespace CollectionProcessingEvent {
    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }
  }

  export interface SendEvent {
    /**
     * Outcome of a Send function's delivery attempt.
     */
    deliveryStatus: 'success' | 'skip';

    /**
     * Destination type for a Send function.
     */
    destinationType: 'webhook' | 's3' | 'google_drive';

    /**
     * Unique ID generated by bem to identify the event.
     */
    eventID: string;

    /**
     * Unique identifier of function that this event is associated with.
     */
    functionID: string;

    /**
     * Unique name of function that this event is associated with.
     */
    functionName: string;

    /**
     * The unique ID you use internally to refer to this data point, propagated from
     * the original function input.
     */
    referenceID: string;

    /**
     * Unique identifier of workflow call that this event is associated with.
     */
    callID?: string;

    /**
     * Timestamp indicating when the event was created.
     */
    createdAt?: string;

    /**
     * The full protocol event JSON that was delivered — identical to what subscription
     * publish would deliver for the same event. For ad-hoc calls with a JSON file
     * input, contains the raw input JSON. For ad-hoc calls with a binary file input,
     * contains {"s3URL": "<presigned-url>"}.
     */
    deliveredContent?: unknown;

    eventType?: 'send';

    /**
     * Unique identifier of function call that this event is associated with.
     */
    functionCallID?: string;

    /**
     * The attempt number of the function call that created this event. 1 indexed.
     */
    functionCallTryNumber?: number;

    /**
     * Version number of function that this event is associated with.
     */
    functionVersionNum?: number;

    /**
     * Metadata returned when a Send function delivers to Google Drive.
     */
    googleDriveOutput?: SendEvent.GoogleDriveOutput;

    /**
     * The inbound email that triggered this event.
     */
    inboundEmail?: ErrorsAPI.InboundEmailEvent;

    metadata?: SendEvent.Metadata;

    /**
     * Metadata returned when a Send function delivers to an S3 bucket.
     */
    s3Output?: SendEvent.S3Output;

    /**
     * Metadata returned when a Send function delivers to a webhook.
     */
    webhookOutput?: SendEvent.WebhookOutput;

    /**
     * Unique identifier of workflow that this event is associated with.
     */
    workflowID?: string;

    /**
     * Name of workflow that this event is associated with.
     */
    workflowName?: string;

    /**
     * Version number of workflow that this event is associated with.
     */
    workflowVersionNum?: number;
  }

  export namespace SendEvent {
    /**
     * Metadata returned when a Send function delivers to Google Drive.
     */
    export interface GoogleDriveOutput {
      /**
       * Name of the file created in Google Drive.
       */
      fileName: string;

      /**
       * ID of the Google Drive folder the file was placed in.
       */
      folderID: string;
    }

    export interface Metadata {
      durationFunctionToEventSeconds?: number;
    }

    /**
     * Metadata returned when a Send function delivers to an S3 bucket.
     */
    export interface S3Output {
      /**
       * Name of the S3 bucket the payload was written to.
       */
      bucketName: string;

      /**
       * Object key under which the payload was stored.
       */
      key: string;
    }

    /**
     * Metadata returned when a Send function delivers to a webhook.
     */
    export interface WebhookOutput {
      /**
       * Raw HTTP response body returned by the webhook endpoint.
       */
      httpResponseBody: string;

      /**
       * HTTP status code returned by the webhook endpoint.
       */
      httpStatusCode: number;
    }
  }

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

/**
 * Response from `GET /v3/calls/{callID}/trace`.
 *
 * Contains the full execution DAG as flat arrays of function calls and events.
 * Reconstruct the graph using `FunctionCallResponseBase.sourceEventID` (the event
 * that spawned each function call) and each event's `functionCallID` (the function
 * call that emitted it).
 */
export interface CallRetrieveTraceResponse {
  /**
   * Error message if trace retrieval failed.
   */
  error?: string;

  /**
   * Full execution DAG of a call as flat arrays. Reconstruct the graph using
   * FunctionCallResponseBase.sourceEventID and each event's functionCallID.
   */
  trace?: CallRetrieveTraceResponse.Trace;
}

export namespace CallRetrieveTraceResponse {
  /**
   * Full execution DAG of a call as flat arrays. Reconstruct the graph using
   * FunctionCallResponseBase.sourceEventID and each event's functionCallID.
   */
  export interface Trace {
    /**
     * All events emitted within this call, polymorphic by eventType.
     */
    events: Array<unknown>;

    /**
     * All function calls executed within this call.
     */
    functionCalls: Array<Trace.FunctionCall>;
  }

  export namespace Trace {
    export interface FunctionCall {
      /**
       * Unique identifier for this function call
       */
      functionCallID: string;

      /**
       * ID of the function that was called
       */
      functionID: string;

      /**
       * Name of the function that was called
       */
      functionName: string;

      /**
       * User-provided reference ID for tracking
       */
      referenceID: string;

      /**
       * The date and time this function call started.
       */
      startedAt: string;

      /**
       * The status of the action.
       */
      status: 'pending' | 'running' | 'completed' | 'failed';

      /**
       * The type of the function.
       */
      type: FunctionsAPI.FunctionType;

      /**
       * Array of activity steps for this function call
       */
      activity?: Array<FunctionCall.Activity>;

      /**
       * The date and time this function call finished. Absent while still running.
       */
      finishedAt?: string;

      /**
       * Version number of the function
       */
      functionVersionNum?: number;

      /**
       * The labelled outlet on the upstream node that routed execution to this call.
       * Absent for root calls, unlabelled edges, and pre-migration rows.
       */
      incomingDestinationName?: string;

      /**
       * Array of all file inputs with their S3 URLs
       */
      inputs?: Array<FunctionCall.Input>;

      /**
       * Input type for single file input (set when there's exactly one file input)
       */
      inputType?: string;

      /**
       * Presigned S3 URL for single file input (set when there's exactly one file input)
       */
      s3URL?: string;

      /**
       * ID of the event that spawned this function call (for DAG reconstruction). Nil
       * for the root function call.
       */
      sourceEventID?: string;

      /**
       * ID of the function call that spawned this function call (for DAG reconstruction)
       */
      sourceFunctionCallID?: string;

      /**
       * ID of the workflow call this function call belongs to (top-level execution
       * context)
       */
      workflowCallID?: string;

      /**
       * Name of the workflow DAG call-site node this function call is executing. Absent
       * for non-workflow calls and pre-migration rows.
       */
      workflowNodeName?: string;
    }

    export namespace FunctionCall {
      export interface Activity {
        displayName?: string;

        status?: 'pending' | 'running' | 'completed' | 'failed';
      }

      export interface Input {
        /**
         * Input type of the file
         */
        inputType?: string;

        /**
         * Item reference ID for batch inputs
         */
        itemReferenceID?: string;

        /**
         * Presigned S3 URL for the file input
         */
        s3URL?: string;
      }
    }
  }
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
    type CallRetrieveTraceResponse as CallRetrieveTraceResponse,
    type CallsCallsPage as CallsCallsPage,
    type CallListParams as CallListParams,
  };
}
