// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';

/**
 * Infer JSON Schemas from uploaded documents using AI.
 *
 * Upload a file (PDF, image, spreadsheet, email, etc.) and receive a general-purpose JSON Schema
 * that captures the document's structure. The inferred schema can be used directly as the
 * `outputSchema` when creating Transform functions.
 *
 * The schema is designed to be broadly applicable to documents of the same type, not just
 * the specific file uploaded.
 */
export class InferSchema extends APIResource {
  /**
   * **Analyze a file and infer a JSON Schema from its contents.**
   *
   * Accepts a file via multipart form upload and uses Gemini to analyze the
   * document, returning a description of its contents, an inferred JSON Schema
   * capturing all extractable fields, and document classification metadata.
   *
   * The returned schema is designed to be reusable across many similar documents of
   * the same type, not just the specific file uploaded. It can be used directly as
   * the `outputSchema` when creating a Transform function.
   *
   * The endpoint also detects whether the file contains multiple bundled documents
   * and classifies the content nature (textual, visual, audio, video, or mixed).
   *
   * ## Supported file types
   *
   * PDF, PNG, JPEG, HEIC, HEIF, WebP, CSV, XLS, XLSX, DOCX, JSON, HTML, XML, EML,
   * plain text, WAV, MP3, M4A, MP4.
   *
   * ## File size limit
   *
   * Maximum file size is **20 MB**.
   *
   * ## Example
   *
   * ```bash
   * curl -X POST https://api.bem.ai/v3/infer-schema \
   *   -H "x-api-key: YOUR_API_KEY" \
   *   -F "file=@invoice.pdf"
   * ```
   */
  create(body: InferSchemaCreateParams, options?: RequestOptions): APIPromise<InferSchemaCreateResponse> {
    return this._client.post(
      '/v3/infer-schema',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * Response from the infer-schema endpoint.
 */
export interface InferSchemaCreateResponse {
  /**
   * Analysis result returned by the infer-schema endpoint.
   */
  analysis: InferSchemaCreateResponse.Analysis;

  /**
   * Original filename of the uploaded file.
   */
  filename: string;
}

export namespace InferSchemaCreateResponse {
  /**
   * Analysis result returned by the infer-schema endpoint.
   */
  export interface Analysis {
    /**
     * Classification of the primary content. One of: `textual`, `visual`, `audio`,
     * `video`, `mixed`.
     */
    contentNature: string;

    /**
     * MIME content type of the uploaded file.
     */
    contentType: string;

    /**
     * 2-3 sentence description of what the file contains.
     */
    description: string;

    /**
     * List of distinct document types found in the file with counts.
     */
    documentTypes: Array<Analysis.DocumentType>;

    /**
     * Original filename of the uploaded file.
     */
    fileName: string;

    /**
     * High-level file category (e.g. "document", "image", "spreadsheet", "email").
     */
    fileType: string;

    /**
     * Whether the file contains multiple separate documents bundled together.
     */
    isMultiDocument: boolean;

    /**
     * Size of the uploaded file in bytes.
     */
    sizeBytes: number;

    /**
     * Inferred JSON Schema representing all extractable data fields.
     */
    schema?: unknown;
  }

  export namespace Analysis {
    /**
     * Describes a distinct document type found in the file.
     */
    export interface DocumentType {
      /**
       * Number of instances of this document type in the file.
       */
      count: number;

      /**
       * Brief description of this document type.
       */
      description: string;

      /**
       * Short snake_case name (e.g. "invoice", "receipt", "utility_bill").
       */
      name: string;
    }
  }
}

export interface InferSchemaCreateParams {
  /**
   * The file to analyze and infer a JSON schema from.
   */
  file: unknown;
}

export declare namespace InferSchema {
  export {
    type InferSchemaCreateResponse as InferSchemaCreateResponse,
    type InferSchemaCreateParams as InferSchemaCreateParams,
  };
}
