import type { Bem } from '../client';
import { NotFoundError } from '../core/error';
import type {
  FunctionCreateParams,
  FunctionResponse,
  FunctionUpdateParams,
} from '../resources/functions/functions';
import type {
  Workflow,
  WorkflowCreateParams,
  WorkflowUpdateParams,
} from '../resources/workflows/workflows';

/**
 * Idempotent "create-or-update" for functions and workflows.
 *
 * Bem's API is versioned: `POST /v3/functions` creates v1, `PATCH` produces
 * v2, v3, ... There is no native `PUT`. Setup scripts that should be
 * re-runnable (CI seeds, fixture loaders, dev environments) usually want
 * "ensure this resource exists with this configuration" semantics.
 *
 * These helpers narrow strictly on `NotFoundError` (HTTP 404) — auth
 * failures, network errors, and 5xx still propagate, unlike a naive
 * `try { retrieve } catch { create }`.
 */

export interface UpsertResult<T> {
  /** True if the resource did not exist and was created. */
  created: boolean;
  /** Resource as returned by `create` or `update`. */
  data: T;
}

/**
 * Create the function if it does not exist, or update it to match the
 * supplied configuration. Pass the body without `functionName` (the name
 * is taken from the first argument).
 *
 * ```ts
 * await upsertFunction(client, 'invoice-extractor', {
 *   type: 'extract',
 *   outputSchema: { ... },
 *   outputSchemaName: 'InvoiceExtraction',
 * });
 * ```
 */
export async function upsertFunction(
  client: Bem,
  functionName: string,
  body: Omit<Extract<FunctionCreateParams, { type: string }>, 'functionName'>,
): Promise<UpsertResult<FunctionResponse>> {
  try {
    await client.functions.retrieve(functionName);
  } catch (err) {
    if (err instanceof NotFoundError) {
      const data = await client.functions.create({
        functionName,
        ...body,
      } as FunctionCreateParams);
      return { created: true, data };
    }
    throw err;
  }
  const data = await client.functions.update(functionName, body as FunctionUpdateParams);
  return { created: false, data };
}

/**
 * Create the workflow if it does not exist, or update it to match the
 * supplied configuration. Pass the body without `name` (the name is
 * taken from the first argument).
 */
export async function upsertWorkflow(
  client: Bem,
  workflowName: string,
  body: Omit<WorkflowCreateParams, 'name'>,
): Promise<UpsertResult<Workflow>> {
  try {
    await client.workflows.retrieve(workflowName);
  } catch (err) {
    if (err instanceof NotFoundError) {
      const data = await client.workflows.create({
        name: workflowName,
        ...body,
      });
      return { created: true, data };
    }
    throw err;
  }
  const updated = await client.workflows.update(workflowName, body as WorkflowUpdateParams);
  // PATCH returns a wrapper { workflow, ... }; collapse it here for parity
  // with the create path so callers see the same shape on both branches.
  const data = (updated as { workflow?: Workflow }).workflow ?? (updated as unknown as Workflow);
  return { created: false, data };
}
