// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Read the cross-document knowledge graph — the canonical entities and the
 * directed relations between them that the Parse pipeline populates when
 * `linkAcrossDocuments` is enabled.
 *
 * - **`GET /v3/entities/{id}/relations`** returns the inbound and outbound
 *   edges incident to one entity, split by direction. Supports
 *   `direction`, an exact `relationType` filter, and cursor pagination over
 *   edges. A merged-away entity id transparently resolves to its surviving
 *   canonical entity.
 * - **`GET /v3/knowledge-graph`** returns the graph as `{ nodes, edges }`,
 *   paginating over edges. The `nodes` for a page are the distinct endpoint
 *   entities of that page's edges (both endpoints of every edge are
 *   included). Filter with `type[]`, `since`, and `search`; an edge is
 *   returned only when both of its endpoints survive the entity filters.
 *
 * Both endpoints take an optional `bucket` (`bkt_...`) to scope the read to
 * a single bucket; omit it for the unscoped account+environment view.
 */
export class KnowledgeGraph extends APIResource {
  /**
   * Retrieve the Knowledge Graph
   */
  retrieve(
    query: KnowledgeGraphRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<KnowledgeGraphRetrieveResponse> {
    return this._client.get('/v3/knowledge-graph', { query, ...options });
  }
}

/**
 * Response body for `GET /v3/knowledge-graph`. Pagination is over edges; `nodes`
 * are the distinct endpoint entities of the returned edge page (both endpoints of
 * every edge are included).
 */
export interface KnowledgeGraphRetrieveResponse {
  /**
   * The page of edges.
   */
  edges: Array<KnowledgeGraphRetrieveResponse.Edge>;

  /**
   * Distinct endpoint entities of the returned edge page.
   */
  nodes: Array<KnowledgeGraphRetrieveResponse.Node>;

  /**
   * Opaque cursor for the next page of edges, or absent on the last page. Pass it
   * back as `cursor`.
   */
  nextCursor?: string;
}

export namespace KnowledgeGraphRetrieveResponse {
  /**
   * One directed edge between two entities, addressed by their public ids.
   */
  export interface Edge {
    /**
     * How many times this edge has been observed.
     */
    mentionCount: number;

    /**
     * Free-form relation label.
     */
    relationType: string;

    /**
     * Source entity public id (`ent_...`).
     */
    sourceId: string;

    /**
     * Target entity public id (`ent_...`).
     */
    targetId: string;
  }

  /**
   * One entity node in the knowledge graph.
   */
  export interface Node {
    /**
     * Stable public identifier for the entity (`ent_...`).
     */
    id: string;

    /**
     * Canonical (most descriptive) surface form.
     */
    canonical: string;

    /**
     * Hops from the center node when the request centers the graph on one entity
     * (`nodeID`). The center is depth 0. When the request is uncentered (no `nodeID`),
     * this is 0 for every node.
     */
    depth: number;

    /**
     * Total mentions of this entity across all parsed documents.
     */
    mentionCount: number;

    /**
     * Effective entity type.
     */
    type: string;
  }
}

export interface KnowledgeGraphRetrieveParams {
  /**
   * Optional bucket public ID (`bkt_...`) to scope the read to one bucket. Omit for
   * the unscoped (all account+environment) view.
   */
  bucket?: string;

  /**
   * Cursor: return edges whose KSUID sorts after this value.
   */
  cursor?: string;

  /**
   * Maximum number of edges per page (default 50, max 200).
   */
  limit?: number;

  /**
   * Maximum hops from the center node. Only meaningful with `nodeID`. Defaults to 2
   * and is clamped down to a system maximum (5).
   */
  maxDepth?: number;

  /**
   * Center the graph on this entity (`ent_...`) and only return the subgraph within
   * `maxDepth` hops of it; every node then carries its `depth` (hops from the
   * center, center = 0). Omit for the uncentered whole-graph view. `rootNodeID` and
   * `focusNodeID` are accepted as aliases.
   */
  nodeID?: string;

  /**
   * Case-insensitive substring match on canonical names. Both endpoints of an edge
   * must match for the edge (and its nodes) to be returned.
   */
  search?: string;

  /**
   * Only edges created at/after this RFC 3339 timestamp.
   */
  since?: string;

  /**
   * Restrict to entities of these types. An edge is returned only when BOTH of its
   * endpoints survive the type filter.
   */
  type?: Array<string>;
}

export declare namespace KnowledgeGraph {
  export {
    type KnowledgeGraphRetrieveResponse as KnowledgeGraphRetrieveResponse,
    type KnowledgeGraphRetrieveParams as KnowledgeGraphRetrieveParams,
  };
}
