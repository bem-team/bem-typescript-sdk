// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Unix-shell-style nav over parsed documents and the cross-doc memory store.
 *
 * `POST /v3/fs` is a single op-driven endpoint designed for LLM agents
 * and programmatic consumers that want to walk a corpus the way they'd
 * walk a filesystem.
 *
 * ## Doc-level ops (every parsed document)
 *
 * - `ls` — list parsed documents with rich per-doc metadata.
 * - `cat` — read one doc's parse JSON, sliced (`range`) or projected (`select`).
 * - `head` — first N sections of one doc.
 * - `grep` — substring or regex search; `scope`, `path`, `countOnly` available.
 * - `stat` — metadata only (page/section/entity counts, timestamps).
 *
 * ## Memory-level ops (require `linkAcrossDocuments: true` on the parse function)
 *
 * - `find` — list canonical entities across the corpus.
 * - `open` — entity + mentions.
 * - `xref` — for one entity, sections across docs that mention it (with content).
 *
 * Memory ops return an empty list with a `hint` when no docs in this
 * environment have been memory-linked.
 *
 * ## Pagination
 *
 * List ops paginate by cursor — pass the previous response's `nextCursor`
 * back as `cursor`; `hasMore: false` signals the last page. Same idiom as
 * `/v3/calls` and `/v3/outputs`.
 */
export class Fs extends APIResource {
  /**
   * **Navigate parsed documents and the cross-doc memory store via Unix-shell
   * verbs.**
   *
   * `POST /v3/fs` is a single op-driven endpoint that lets an LLM agent (or any
   * programmatic client) walk a corpus the way it would walk a filesystem — `ls` to
   * list, `cat` to read, `grep` to search, `head` for a quick peek, `stat` for
   * metadata, and `find` / `open` / `xref` for the cross-doc entity memory layer.
   *
   * The body always carries an `op` field; other fields apply per op. The response
   * envelope is uniform: `{op, data, hasMore?, nextCursor?, count?, hint?}`.
   *
   * ## Doc-level ops (work on every parsed document)
   *
   * - `ls`: list parsed documents with `pageCount`, `sectionCount`, `entityCount`,
   *   and a short `previewEntities` array.
   * - `cat`: read one doc's full parse JSON, optionally sliced by `range` (page /
   *   pageRange / sectionTypes) or projected by `select` (dotted paths like
   *   `["sections.label", "sections.page"]`).
   * - `head`: first N sections of one doc.
   * - `grep`: substring or regex search across recent parse outputs. `scope`
   *   restricts to `sections` / `entities` / `relationships`. `path` scopes to one
   *   doc. `countOnly: true` returns only the hit count.
   * - `stat`: metadata only — page/section/entity counts, timestamps.
   *
   * ## Memory-level ops (require `linkAcrossDocuments: true` on the parse function)
   *
   * - `find`: list canonical entities, filterable by `type`, `search`, `since`.
   *   Returns an empty list with a `hint` when no docs have been memory-linked.
   * - `open`: fetch one entity plus its mentions across docs.
   * - `xref`: for one entity, return the actual sections (with content) across docs
   *   that mention it. The "where exactly is X discussed" loop in one round trip.
   *
   * ## Pagination
   *
   * List ops (`ls`, `find`) paginate by cursor: pass the last item's `nextCursor`
   * from a previous response to fetch the next page; `hasMore: false` signals the
   * last page. Same idiom as `/v3/calls` and `/v3/outputs`.
   */
  navigate(body: FNavigateParams, options?: RequestOptions): APIPromise<FNavigateResponse> {
    return this._client.post('/v3/fs', { body, ...options });
  }
}

/**
 * Uniform response shape returned for every `op`. `data` is op-specific JSON (a
 * list, an object, or a string), but the wrapper is constant so a client only
 * learns one parse path.
 */
export interface FNavigateResponse {
  /**
   * Op-specific payload. See per-op shapes below.
   */
  data: unknown;

  /**
   * Operations exposed by `POST /v3/fs`.
   *
   * The verbs and their flag names mirror Unix tools so an LLM agent's existing
   * vocabulary maps directly:
   *
   * - `ls` — list parsed documents
   * - `cat` — read one parsed doc (optionally sliced by range / projected by select)
   * - `grep` — substring or regex search across parse outputs
   * - `head` — first N sections of one doc
   * - `stat` — metadata only (page count, section count, parsed at, ...)
   * - `find` — list canonical entities (cross-doc memory)
   * - `open` — entity + mentions
   * - `xref` — entity → sections across docs that mention it
   *
   * Doc-level ops (ls, cat, grep, head, stat) work on every parsed document,
   * regardless of how the parse function was configured.
   *
   * Memory-level ops (find, open, xref) operate on the global entities table which
   * is only populated when the parse function had `linkAcrossDocuments: true`. On
   * environments with no memory-linked docs they return empty data with a hint
   * pointing at the toggle.
   */
  op: 'ls' | 'find' | 'open' | 'cat' | 'grep' | 'xref' | 'stat' | 'head';

  /**
   * Set for ops that return a count rather than a list (`grep` with
   * `countOnly=true`) or as a sanity check on lists.
   */
  count?: number;

  /**
   * True when more pages exist for cursor-paginated ops.
   */
  hasMore?: boolean;

  /**
   * Optional human-readable note. Surfaced on memory-level ops (`find` / `open` /
   * `xref`) when the corpus has no memory-linked docs, pointing users at the
   * `linkAcrossDocuments` toggle on the parse function.
   */
  hint?: string;

  /**
   * Cursor to pass as `cursor` in the next request to fetch the next page. Empty
   * when `hasMore=false`.
   */
  nextCursor?: string;
}

export interface FNavigateParams {
  /**
   * Operations exposed by `POST /v3/fs`.
   *
   * The verbs and their flag names mirror Unix tools so an LLM agent's existing
   * vocabulary maps directly:
   *
   * - `ls` — list parsed documents
   * - `cat` — read one parsed doc (optionally sliced by range / projected by select)
   * - `grep` — substring or regex search across parse outputs
   * - `head` — first N sections of one doc
   * - `stat` — metadata only (page count, section count, parsed at, ...)
   * - `find` — list canonical entities (cross-doc memory)
   * - `open` — entity + mentions
   * - `xref` — entity → sections across docs that mention it
   *
   * Doc-level ops (ls, cat, grep, head, stat) work on every parsed document,
   * regardless of how the parse function was configured.
   *
   * Memory-level ops (find, open, xref) operate on the global entities table which
   * is only populated when the parse function had `linkAcrossDocuments: true`. On
   * environments with no memory-linked docs they return empty data with a hint
   * pointing at the toggle.
   */
  op: 'ls' | 'find' | 'open' | 'cat' | 'grep' | 'xref' | 'stat' | 'head';

  /**
   * When true, return only the hit count without snippet payload. Cheaper than
   * fetching matches when the agent only wants a yes/no.
   */
  countOnly?: boolean;

  /**
   * Pagination cursor. Pass the last item's ID from a previous response
   * (`nextCursor`) to fetch the next page.
   */
  cursor?: string;

  /**
   * Filter options for `op=ls` and `op=find`.
   */
  filter?: FNavigateParams.Filter;

  /**
   * When true (default), substring/regex matching is case-insensitive.
   */
  ignoreCase?: boolean;

  /**
   * Maximum results to return. Defaults vary per op (25–50).
   */
  limit?: number;

  /**
   * First-N count for `op=head`. Defaults to 10.
   */
  n?: number;

  /**
   * Identifier for ops that operate on a single resource:
   *
   * - cat / head / stat: a parsed document, by `referenceID` or `transformationID`.
   * - open / xref / stat: an entity, by `entityID`.
   */
  path?: string;

  /**
   * Substring or regex pattern for `op=grep`.
   */
  pattern?: string;

  /**
   * Slice the parse output along page or section dimensions. Used with `op=cat`.
   */
  range?: FNavigateParams.Range;

  /**
   * When true, `pattern` is interpreted as a Go regex. Default false.
   */
  regex?: boolean;

  /**
   * Restricts grep to one part of the parse output. One of `"sections"`,
   * `"entities"`, `"relationships"`, `"all"` (default).
   */
  scope?: string;

  /**
   * Project the parse output to specific dotted paths (e.g.
   * `["sections.label", "sections.page"]`), letting an agent map a doc's structure
   * cheaply before reading content. Used with `op=cat`.
   */
  select?: Array<string>;
}

export namespace FNavigateParams {
  /**
   * Filter options for `op=ls` and `op=find`.
   */
  export interface Filter {
    /**
     * Match a parsed doc's source function name exactly.
     */
    functionName?: string;

    /**
     * Substring match on canonical name (entities) or `referenceID` (parsed docs).
     * Case-insensitive.
     */
    search?: string;

    /**
     * Restrict to resources created at or after this timestamp.
     */
    since?: string;

    /**
     * Match an entity's `type` field exactly (e.g. `"drug"`, `"study"`).
     */
    type?: string;
  }

  /**
   * Slice the parse output along page or section dimensions. Used with `op=cat`.
   */
  export interface Range {
    /**
     * Restrict sections to one page (1-indexed).
     */
    page?: number;

    /**
     * Restrict sections to an inclusive page range. Two-element array of `[from, to]`
     * (both 1-indexed).
     */
    pageRange?: Array<number>;

    /**
     * Keep only sections whose `type` matches one of these (e.g. `["table", "list"]`).
     */
    sectionTypes?: Array<string>;
  }
}

export declare namespace Fs {
  export { type FNavigateResponse as FNavigateResponse, type FNavigateParams as FNavigateParams };
}
