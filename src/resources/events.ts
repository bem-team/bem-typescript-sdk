// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Submit training corrections for `extract`, `classify`, and `join` events.
 *
 * Feedback is event-centric — each correction is attached to an event by its `eventID`,
 * and the server resolves the correct underlying storage (extract/join transformations
 * or classify route events) from the event's function type.
 *
 * Split and enrich function types do not support feedback.
 */
export class Events extends APIResource {
  /**
   * **Submit a correction for an event.**
   *
   * Accepts training corrections for `extract`, `classify`, and `join` events. For
   * extract/join events, `correction` is a JSON object matching the function's
   * output schema. For classify events, `correction` is a JSON string matching one
   * of the function version's declared classifications.
   *
   * Submitting feedback again for the same event overwrites the previous correction.
   *
   * Unsupported function types (split, enrich) return `400`.
   */
  submitFeedback(
    eventID: string,
    body: EventSubmitFeedbackParams,
    options?: RequestOptions,
  ): APIPromise<EventSubmitFeedbackResponse> {
    return this._client.post(path`/v3/events/${eventID}/feedback`, { body, ...options });
  }
}

/**
 * Echoed response after a correction is recorded.
 */
export interface EventSubmitFeedbackResponse {
  correction: unknown;

  /**
   * Server timestamp when the correction was persisted (RFC 3339).
   */
  createdAt: string;

  eventID: string;

  /**
   * Function types that support feedback submission.
   */
  functionType: 'extract' | 'classify' | 'join';
}

export interface EventSubmitFeedbackParams {
  correction: unknown;

  orderMatching?: boolean;
}

export declare namespace Events {
  export {
    type EventSubmitFeedbackResponse as EventSubmitFeedbackResponse,
    type EventSubmitFeedbackParams as EventSubmitFeedbackParams,
  };
}
