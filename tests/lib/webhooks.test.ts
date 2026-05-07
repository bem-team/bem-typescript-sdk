import { createHmac } from 'node:crypto';
import { verifyWebhookSignature, WebhookSignatureError } from 'bem-ai-sdk';

const SECRET = 'whsec_test_super_secret';
const PAYLOAD = '{"event":"call.completed","callID":"abc123"}';

function signHeader(payload: string, secret: string, tsSeconds: number): string {
  const v1 = createHmac('sha256', secret).update(`${tsSeconds}.${payload}`).digest('hex');
  return `t=${tsSeconds},v1=${v1}`;
}

describe('verifyWebhookSignature', () => {
  const baseTs = 1_700_000_000; // arbitrary fixed unix-seconds
  const nowMs = baseTs * 1000;

  it('accepts a fresh, well-signed request', async () => {
    const result = await verifyWebhookSignature({
      header: signHeader(PAYLOAD, SECRET, baseTs),
      payload: PAYLOAD,
      secret: SECRET,
      nowMs,
    });
    expect(result.timestamp).toBe(baseTs);
    expect(result.payload).toBe(PAYLOAD);
  });

  it('accepts payloads passed as Uint8Array', async () => {
    const bytes = new TextEncoder().encode(PAYLOAD);
    const result = await verifyWebhookSignature({
      header: signHeader(PAYLOAD, SECRET, baseTs),
      payload: bytes,
      secret: SECRET,
      nowMs,
    });
    expect(result.timestamp).toBe(baseTs);
  });

  it('rejects a missing header', async () => {
    await expect(
      verifyWebhookSignature({ header: null, payload: PAYLOAD, secret: SECRET, nowMs }),
    ).rejects.toThrow(WebhookSignatureError);
  });

  it('rejects a malformed header', async () => {
    await expect(
      verifyWebhookSignature({ header: 'not-a-signature', payload: PAYLOAD, secret: SECRET, nowMs }),
    ).rejects.toThrow(/Malformed|missing t or v1/);
  });

  it('rejects a header missing v1', async () => {
    await expect(
      verifyWebhookSignature({ header: `t=${baseTs}`, payload: PAYLOAD, secret: SECRET, nowMs }),
    ).rejects.toThrow(/missing t or v1/);
  });

  it('rejects a digest computed with the wrong secret', async () => {
    await expect(
      verifyWebhookSignature({
        header: signHeader(PAYLOAD, 'wrong-secret', baseTs),
        payload: PAYLOAD,
        secret: SECRET,
        nowMs,
      }),
    ).rejects.toThrow(/digest does not match/);
  });

  it('rejects when the body has been tampered with', async () => {
    const tampered = PAYLOAD.replace('abc123', 'xyz999');
    await expect(
      verifyWebhookSignature({
        header: signHeader(PAYLOAD, SECRET, baseTs),
        payload: tampered,
        secret: SECRET,
        nowMs,
      }),
    ).rejects.toThrow(/digest does not match/);
  });

  it('rejects a signature older than the tolerance window (replay)', async () => {
    const oldTs = baseTs - 10 * 60; // 10 minutes earlier
    await expect(
      verifyWebhookSignature({
        header: signHeader(PAYLOAD, SECRET, oldTs),
        payload: PAYLOAD,
        secret: SECRET,
        toleranceMs: 5 * 60 * 1000,
        nowMs,
      }),
    ).rejects.toThrow(/older than the replay window/);
  });

  it('rejects a signature timestamped far in the future', async () => {
    const futureTs = baseTs + 10 * 60;
    await expect(
      verifyWebhookSignature({
        header: signHeader(PAYLOAD, SECRET, futureTs),
        payload: PAYLOAD,
        secret: SECRET,
        toleranceMs: 5 * 60 * 1000,
        nowMs,
      }),
    ).rejects.toThrow(/too far in the future/);
  });

  it('rejects empty secret', async () => {
    await expect(
      verifyWebhookSignature({
        header: signHeader(PAYLOAD, SECRET, baseTs),
        payload: PAYLOAD,
        secret: '',
        nowMs,
      }),
    ).rejects.toThrow(/Missing webhook secret/);
  });
});
