import { waitForCall, CallTimeoutError, CallFailedError, type Bem } from 'bem-ai-sdk';
import type { CallGetResponse } from 'bem-ai-sdk/resources/calls';

type CallStatus = NonNullable<NonNullable<CallGetResponse['call']>['status']>;

function callWithStatus(status: CallStatus): CallGetResponse {
  return { call: { status } } as CallGetResponse;
}

function fakeClient(responses: CallGetResponse[]): {
  client: Bem;
  retrieved: number;
} {
  const state = { retrieved: 0 };
  const client = {
    calls: {
      retrieve: async (_id: string, _opts?: unknown): Promise<CallGetResponse> => {
        const idx = Math.min(state.retrieved, responses.length - 1);
        state.retrieved += 1;
        return responses[idx]!;
      },
    },
  } as unknown as Bem;
  return {
    client,
    get retrieved() {
      return state.retrieved;
    },
  };
}

describe('waitForCall', () => {
  it('returns immediately when the first poll is already completed', async () => {
    const handle = fakeClient([callWithStatus('completed')]);
    const result = await waitForCall(handle.client, 'call_1', { pollIntervalMs: 1 });
    expect(result.call?.status).toBe('completed');
    expect(handle.retrieved).toBe(1);
  });

  it('polls until the call transitions to completed', async () => {
    const handle = fakeClient([
      callWithStatus('pending'),
      callWithStatus('running'),
      callWithStatus('completed'),
    ]);
    const result = await waitForCall(handle.client, 'call_2', {
      pollIntervalMs: 1,
      maxPollIntervalMs: 1,
    });
    expect(result.call?.status).toBe('completed');
    expect(handle.retrieved).toBe(3);
  });

  it('resolves on failed when until="terminal"', async () => {
    const handle = fakeClient([callWithStatus('failed')]);
    const result = await waitForCall(handle.client, 'call_3', {
      until: 'terminal',
      pollIntervalMs: 1,
    });
    expect(result.call?.status).toBe('failed');
  });

  it('throws CallFailedError on failed when until="completed"', async () => {
    const handle = fakeClient([callWithStatus('failed')]);
    await expect(
      waitForCall(handle.client, 'call_4', { until: 'completed', pollIntervalMs: 1 }),
    ).rejects.toBeInstanceOf(CallFailedError);
  });

  it('throws CallTimeoutError when the deadline passes before terminal', async () => {
    const handle = fakeClient([callWithStatus('running')]);
    await expect(
      waitForCall(handle.client, 'call_5', {
        pollIntervalMs: 5,
        maxPollIntervalMs: 5,
        timeoutMs: 30,
      }),
    ).rejects.toBeInstanceOf(CallTimeoutError);
  });

  it('aborts when the signal fires', async () => {
    const handle = fakeClient([callWithStatus('running')]);
    const ac = new AbortController();
    setTimeout(() => ac.abort(new Error('cancelled')), 10);
    await expect(
      waitForCall(handle.client, 'call_6', {
        pollIntervalMs: 100,
        signal: ac.signal,
      }),
    ).rejects.toThrow(/cancelled/);
  });
});
