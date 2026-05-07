import type { Bem } from '../client';
import type { CallGetResponse } from '../resources/calls';

/**
 * Poll `GET /v3/calls/{callID}` until the call reaches a terminal status.
 *
 * `client.workflows.create({ ..., wait: true })` blocks server-side for up
 * to ~30 seconds. For longer-running calls (large batches, complex DAGs),
 * fire-and-poll is the standard pattern: kick off the call asynchronously,
 * then await `waitForCall(client, callID)` to resolve when the run finishes.
 *
 * Polls with exponential backoff (capped at `maxPollIntervalMs`) so a short
 * call resolves quickly and a long call doesn't hammer the API.
 */
export interface WaitForCallOptions {
  /**
   * Which states resolve the promise.
   *  - `'terminal'` (default): resolve on `completed` OR `failed`.
   *  - `'completed'`: resolve only on `completed`; throw {@link CallFailedError} on `failed`.
   */
  until?: 'terminal' | 'completed';
  /** Initial poll interval in ms. Default: 1000. */
  pollIntervalMs?: number;
  /** Maximum interval after backoff in ms. Default: 10000. */
  maxPollIntervalMs?: number;
  /**
   * Maximum total time to wait in ms before throwing {@link CallTimeoutError}.
   * Default: 5 minutes. Pass `Infinity` to wait indefinitely (still respects
   * `signal`).
   */
  timeoutMs?: number;
  /** Optional AbortSignal — aborts polling and rejects with `signal.reason`. */
  signal?: AbortSignal;
}

export class CallTimeoutError extends Error {
  override readonly name = 'CallTimeoutError';
  constructor(
    public readonly callID: string,
    public readonly elapsedMs: number,
    public readonly lastResponse: CallGetResponse | undefined,
  ) {
    super(`Call ${callID} did not reach a terminal status within ${elapsedMs}ms`);
  }
}

export class CallFailedError extends Error {
  override readonly name = 'CallFailedError';
  constructor(
    public readonly callID: string,
    public readonly response: CallGetResponse,
  ) {
    super(`Call ${callID} finished with status="failed"`);
  }
}

const TERMINAL_STATUSES = new Set(['completed', 'failed']);

/**
 * Wait for a Bem call to reach a terminal status.
 *
 * ```ts
 * const { call: pending } = await client.workflows.create({
 *   name: 'my-workflow',
 *   input: { singleFile: { inputContent: '...', inputType: 'pdf' } },
 * });
 * const finished = await waitForCall(client, pending!.callID!, {
 *   until: 'completed',     // throw on failed
 *   timeoutMs: 10 * 60_000, // 10 min
 * });
 * console.log(finished.call?.status); // "completed"
 * ```
 */
export async function waitForCall(
  client: Bem,
  callID: string,
  options: WaitForCallOptions = {},
): Promise<CallGetResponse> {
  const {
    until = 'terminal',
    pollIntervalMs = 1000,
    maxPollIntervalMs = 10_000,
    timeoutMs = 5 * 60 * 1000,
    signal,
  } = options;

  const startedAt = Date.now();
  let interval = pollIntervalMs;
  let lastResponse: CallGetResponse | undefined;

  while (true) {
    if (signal?.aborted) throw signal.reason ?? new Error('aborted');

    lastResponse = await client.calls.retrieve(callID, signal ? { signal } : undefined);
    const status = lastResponse.call?.status;

    if (status && TERMINAL_STATUSES.has(status)) {
      if (until === 'completed' && status === 'failed') {
        throw new CallFailedError(callID, lastResponse);
      }
      return lastResponse;
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed >= timeoutMs) {
      throw new CallTimeoutError(callID, elapsed, lastResponse);
    }

    const remaining = timeoutMs - elapsed;
    const wait = Math.min(interval, maxPollIntervalMs, Math.max(remaining, 0));
    await sleep(wait, signal);
    interval = Math.min(interval * 2, maxPollIntervalMs);
  }
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason ?? new Error('aborted'));
    };
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer);
        reject(signal.reason ?? new Error('aborted'));
        return;
      }
      signal.addEventListener('abort', onAbort, { once: true });
    }
  });
}
