// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, ViewsPage, type ViewsPageParams } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Views are tabular projections over the `transformations` your functions
 * produce — a saved query that turns raw extracted JSON into a
 * filterable, paginatable, aggregatable table.
 *
 * ## Anatomy
 *
 * A view declares:
 * - One or more **functions** to read from (by `functionID` or `functionName`).
 * - A list of **columns**, each pinned to a `valueSchemaPath` (a JSON
 *   Pointer into the function's output schema).
 * - Optional **filters** (string equality, numeric comparators,
 *   null-checks) and **aggregations** (`count`, `count_distinct`,
 *   `sum`, `average`, `min`, `max`).
 *
 * Views are versioned: every update produces a new version, and the
 * previous version remains immutable and addressable. Function types
 * that produce transformations with an output schema — `extract`,
 * `transform`, `analyze`, `join` — are all queryable through views;
 * `extract` works uniformly across vision and OCR inputs.
 *
 * ## Reading data
 *
 * - **`POST /v3/views/table-data`** — paginated rows of column values.
 *   Each row reports the underlying event's `eventID` (the
 *   externally-stable KSUID used everywhere else in V3) plus the
 *   projected column values.
 * - **`POST /v3/views/aggregation-data`** — group-by-able aggregate
 *   values across the same query surface.
 *
 * Both endpoints take a `timeWindow` to bound the transformation set
 * and require at least one `function` to read from.
 */
export class Views extends APIResource {
  /**
   * **Create a view.**
   *
   * A view is a tabular projection over the `transformations` produced by one or
   * more functions. Each column declares a `valueSchemaPath` — a JSON Pointer path
   * into the function's output schema — and the view can additionally carry filters
   * and aggregations.
   *
   * Supported for every function type that produces correctable transformations and
   * an output schema: `extract`, `transform`, `analyze`, `join`. Extract works on
   * both vision (PDF/PNG/JPEG/HEIC/HEIF/WebP) and OCR-routed inputs — the resulting
   * rows surface through views uniformly.
   *
   * The new view is created at `versionNum: 1`. Subsequent updates produce new
   * versions; the version-1 configuration remains addressable.
   */
  create(body: ViewCreateParams, options?: RequestOptions): APIPromise<View> {
    return this._client.post('/v3/views', { body, ...options });
  }

  /**
   * **Retrieve a view by ID.**
   *
   * Returns the view's current version. To inspect a historical version, fetch the
   * list of versions on the View object and re-request with the desired version
   * pinned (versions are immutable once created).
   */
  retrieve(viewID: string, options?: RequestOptions): APIPromise<View> {
    return this._client.get(path`/v3/views/${viewID}`, options);
  }

  /**
   * **Update a view. Updates create a new version.**
   *
   * The previous version remains addressable and immutable. The new configuration is
   * fully replacing — pass the complete view body, not a patch. The version number
   * is auto-incremented.
   */
  update(viewID: string, body: ViewUpdateParams, options?: RequestOptions): APIPromise<View> {
    return this._client.put(path`/v3/views/${viewID}`, { body, ...options });
  }

  /**
   * **List views in the current environment, optionally filtered by the functions
   * they read from.**
   *
   * Views are tabular projections over `transformations` rows: each view names one
   * or more functions and a list of columns (JSON-pointer paths into
   * `extractedJson`), and produces a uniform table that can be filtered, paginated,
   * and aggregated.
   *
   * Filters AND together when combined. Pagination is cursor-based on `viewID`;
   * default limit is 50, maximum 100.
   */
  list(
    query: ViewListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ViewsViewsPage, View> {
    return this._client.getAPIList('/v3/views', ViewsPage<View>, { query, ...options });
  }

  /**
   * **Delete a view and every one of its versions.**
   *
   * Permanent. Any cached data-table or aggregation result clients have fetched
   * remains valid, but subsequent calls to `POST /v3/views/table-data` or
   * `POST /v3/views/aggregation-data` for this view will fail.
   */
  delete(viewID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/views/${viewID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * **Generate aggregation results for a view.**
   *
   * Executes each aggregation declared on the view against the `transformations`
   * rows produced by the named functions inside the supplied `timeWindow`, applying
   * the view's filters. Supported aggregation functions: `count`, `count_distinct`,
   * `sum`, `average`, `min`, `max`. Grouped aggregations return up to 200 groups per
   * aggregation; non-grouped aggregations return a single group with an empty
   * `groupName`.
   *
   * As with table-data, the `functions` field is required.
   */
  generateAggregationData(
    body: ViewGenerateAggregationDataParams,
    options?: RequestOptions,
  ): APIPromise<ViewGenerateAggregationDataResponse> {
    return this._client.post('/v3/views/aggregation-data', { body, ...options });
  }

  /**
   * **Generate paginated table data for a view.**
   *
   * Executes the view's query against `transformations` rows produced by the named
   * functions inside the supplied `timeWindow`, applies the view's filters, and
   * returns matching rows. Each row reports the event `eventID` (externally-stable
   * KSUID) plus the projected column values.
   *
   * The `functions` field is required — at least one `functionID` or `functionName`
   * must be supplied. `limit` defaults to 50 with a maximum of 200; `offset` is
   * zero-based. The response's `totalCount` reflects the match count before
   * pagination, so paging can be driven off it.
   */
  generateTableData(
    body: ViewGenerateTableDataParams,
    options?: RequestOptions,
  ): APIPromise<ViewGenerateTableDataResponse> {
    return this._client.post('/v3/views/table-data', { body, ...options });
  }
}

export type ViewsViewsPage = ViewsPage<View>;

export interface FunctionIdentifier {
  /**
   * Unique identifier of function. Provide either id or name, not both.
   */
  id?: string;

  /**
   * Name of function. Must be UNIQUE on a per-environment basis. Provide either id
   * or name, not both.
   */
  name?: string;
}

/**
 * Time window for filtering transformations in a view
 */
export interface TimeWindow {
  /**
   * End of the time window in ISO 8601 (RFC 3339) format in UTC
   */
  end: string;

  /**
   * Start of the time window in ISO 8601 (RFC 3339) format in UTC
   */
  start: string;
}

/**
 * A view is a table visualization of transformations that allows customers to have
 * insight into their transformations
 */
export interface View {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * Current version number of the view
   */
  currentVersionNum: number;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Unique identifier of the view
   */
  viewID: string;

  /**
   * Description of the view
   */
  description?: string | null;
}

/**
 * An aggregation definition for a view
 */
export interface ViewAggregation {
  /**
   * Aggregation function to apply to a view column
   */
  function: 'count' | 'count_distinct' | 'sum' | 'average' | 'min' | 'max';

  /**
   * Name of the aggregation
   */
  name: string;

  /**
   * Name of the column to aggregate (required for count_distinct, sum, average, min,
   * max functions)
   */
  aggregateColumnName?: string | null;

  /**
   * How to display the aggregation results
   */
  displayType?: 'table' | 'bar_chart' | 'pie_chart';

  /**
   * Name of the column to group by (optional, for grouped aggregations)
   */
  groupByColumnName?: string | null;
}

/**
 * A column definition in a view
 */
export interface ViewColumn {
  /**
   * Order in which this column should be displayed (0-based index)
   */
  displayOrderIndex: number;

  /**
   * Name of the column
   */
  name: string;

  /**
   * JSON path to the value in the transformation output schema (e.g.,
   * ["invoiceDetails", "invoiceNumber"])
   */
  valueSchemaPath: Array<string>;
}

/**
 * Request to create a new view or update an existing view
 */
export interface ViewCreate {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Description of the view
   */
  description?: string;
}

/**
 * A filter to apply to a view column
 */
export interface ViewFilter {
  /**
   * Name of the column to filter on
   */
  columnName: string;

  /**
   * Type of filter to apply to a view column
   */
  filterType:
    | 'equals_string'
    | 'equals_number'
    | 'less_than_number'
    | 'less_than_equal_number'
    | 'greater_than_number'
    | 'greater_than_equal_number'
    | 'is_null'
    | 'is_not_null';

  /**
   * Numeric value for the filter (required for number filter types)
   */
  number?: number | null;

  /**
   * String value for the filter (required for string filter types)
   */
  string?: string | null;
}

/**
 * Response containing aggregation data for a view
 */
export interface ViewGenerateAggregationDataResponse {
  /**
   * Array of aggregation results
   */
  aggregations: Array<ViewGenerateAggregationDataResponse.Aggregation>;
}

export namespace ViewGenerateAggregationDataResponse {
  /**
   * Aggregation result for a single aggregation definition
   */
  export interface Aggregation {
    /**
     * Array of group results (single group for non-grouped aggregations)
     */
    groups: Array<Aggregation.Group>;

    /**
     * Name of the aggregation
     */
    name: string;
  }

  export namespace Aggregation {
    /**
     * A single group result in an aggregation response
     */
    export interface Group {
      /**
       * Name of the group (empty string for non-grouped aggregations)
       */
      groupName: string;

      /**
       * Aggregated value for this group
       */
      value: number;
    }
  }
}

/**
 * Response containing paginated view table data
 */
export interface ViewGenerateTableDataResponse {
  /**
   * Array of rows matching the view configuration
   */
  rows: Array<ViewGenerateTableDataResponse.Row>;

  /**
   * Total number of rows matching the view (before pagination)
   */
  totalCount: number;
}

export namespace ViewGenerateTableDataResponse {
  /**
   * A single row in the view table data response
   */
  export interface Row {
    /**
     * Column entries for this row
     */
    columns: Array<Row.Column>;

    /**
     * Externally-stable KSUID of the event whose underlying transformation produced
     * this row.
     */
    eventID: string;
  }

  export namespace Row {
    /**
     * A single column entry in a view table data row
     */
    export interface Column {
      /**
       * Name of the column
       */
      columnName: string;

      /**
       * Value of the column (can be any JSON type)
       */
      value: string | number | boolean | unknown | Array<unknown>;
    }
  }
}

export interface ViewCreateParams {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Description of the view
   */
  description?: string;
}

export interface ViewUpdateParams {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Description of the view
   */
  description?: string;
}

export interface ViewListParams extends ViewsPageParams {
  /**
   * Return only views that read from at least one of the named functions.
   */
  functionIDs?: Array<string>;

  /**
   * Return only views that read from at least one of the named functions.
   */
  functionNames?: Array<string>;

  /**
   * Sort order over view IDs (default `asc`).
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Return only the specified view IDs.
   */
  viewIDs?: Array<string>;

  /**
   * Case-insensitive substring search over view names.
   */
  viewNameSubstring?: string;
}

export interface ViewGenerateAggregationDataParams {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Time window for filtering transformations in a view
   */
  timeWindow: TimeWindow;

  /**
   * Description of the view
   */
  description?: string;
}

export interface ViewGenerateTableDataParams {
  /**
   * List of aggregations defined for the view
   */
  aggregations: Array<ViewAggregation>;

  /**
   * List of columns in the view
   */
  columns: Array<ViewColumn>;

  /**
   * List of filters applied to the view
   */
  filters: Array<ViewFilter>;

  /**
   * List of functions that this view queries transformations from
   */
  functions: Array<FunctionIdentifier>;

  /**
   * Name of the view
   */
  name: string;

  /**
   * Time window for filtering transformations in a view
   */
  timeWindow: TimeWindow;

  /**
   * Description of the view
   */
  description?: string;

  /**
   * Maximum number of rows to return (default: 50, max: 200)
   */
  limit?: number | null;

  /**
   * Number of rows to skip for pagination
   */
  offset?: number | null;
}

export declare namespace Views {
  export {
    type FunctionIdentifier as FunctionIdentifier,
    type TimeWindow as TimeWindow,
    type View as View,
    type ViewAggregation as ViewAggregation,
    type ViewColumn as ViewColumn,
    type ViewCreate as ViewCreate,
    type ViewFilter as ViewFilter,
    type ViewGenerateAggregationDataResponse as ViewGenerateAggregationDataResponse,
    type ViewGenerateTableDataResponse as ViewGenerateTableDataResponse,
    type ViewsViewsPage as ViewsViewsPage,
    type ViewCreateParams as ViewCreateParams,
    type ViewUpdateParams as ViewUpdateParams,
    type ViewListParams as ViewListParams,
    type ViewGenerateAggregationDataParams as ViewGenerateAggregationDataParams,
    type ViewGenerateTableDataParams as ViewGenerateTableDataParams,
  };
}
