// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FunctionsAPI from './functions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Functions are the core building blocks of data transformation in Bem. Each function type serves a specific purpose:
 *
 * - **Transform**: Extract structured JSON data from unstructured documents (PDFs, emails, images)
 * - **Analyze**: Perform visual analysis on documents to extract layout-aware information
 * - **Route**: Direct data to different processing paths based on conditions
 * - **Split**: Break multi-page documents into individual pages for parallel processing
 * - **Join**: Combine outputs from multiple function calls into a single result
 * - **Payload Shaping**: Transform and restructure data using JMESPath expressions
 * - **Enrich**: Enhance data with semantic search against collections
 *
 * Use these endpoints to create, update, list, and manage your functions.
 */
export class Copy extends APIResource {
  /**
   * Copy a Function
   */
  create(body: CopyCreateParams, options?: RequestOptions): APIPromise<FunctionsAPI.FunctionResponse> {
    return this._client.post('/v3/functions/copy', { body, ...options });
  }
}

/**
 * Request to copy an existing function with a new name and optional
 * customizations.
 */
export interface FunctionCopyRequest {
  /**
   * Name of the function to copy from. Must be a valid existing function name.
   */
  sourceFunctionName: string;

  /**
   * Name for the new copied function. Must be unique within the target environment.
   */
  targetFunctionName: string;

  /**
   * Optional array of tags for the copied function. If not provided, defaults to the
   * source function's tags.
   */
  tags?: Array<string>;

  /**
   * Optional display name for the copied function. If not provided, defaults to the
   * source function's display name with " (Copy)" appended.
   */
  targetDisplayName?: string;

  /**
   * Optional environment name to copy the function to. If not provided, the function
   * will be copied within the same environment.
   */
  targetEnvironment?: string;
}

export interface CopyCreateParams {
  /**
   * Name of the function to copy from. Must be a valid existing function name.
   */
  sourceFunctionName: string;

  /**
   * Name for the new copied function. Must be unique within the target environment.
   */
  targetFunctionName: string;

  /**
   * Optional array of tags for the copied function. If not provided, defaults to the
   * source function's tags.
   */
  tags?: Array<string>;

  /**
   * Optional display name for the copied function. If not provided, defaults to the
   * source function's display name with " (Copy)" appended.
   */
  targetDisplayName?: string;

  /**
   * Optional environment name to copy the function to. If not provided, the function
   * will be copied within the same environment.
   */
  targetEnvironment?: string;
}

export declare namespace Copy {
  export { type FunctionCopyRequest as FunctionCopyRequest, type CopyCreateParams as CopyCreateParams };
}
