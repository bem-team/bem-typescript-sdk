// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Manage the webhook signing secret used to authenticate outbound webhook deliveries.
 *
 * When a signing secret is active, every webhook delivery includes a `bem-signature` header
 * in the format `t={unix_timestamp},v1={hex_hmac_sha256}`. The signature covers
 * `{timestamp}.{raw_request_body}` and can be verified using HMAC-SHA256 with your secret.
 *
 * Rotate the secret at any time with `POST /v3/webhook-secret`. To avoid downtime during
 * rotation, update your verification logic to accept both the old and new secret briefly
 * before revoking the old one.
 */
export class WebhookSecret extends APIResource {
  /**
   * **Generate a new webhook signing secret.**
   *
   * Creates a new signing secret for this environment (or replaces the existing
   * one). The new secret is returned in full exactly once — store it securely.
   *
   * After rotation all newly delivered webhooks will be signed with the new secret.
   * Update your verification logic before calling this endpoint if you need
   * zero-downtime rotation.
   */
  create(options?: RequestOptions): APIPromise<WebhookSecretCreateResponse> {
    return this._client.post('/v3/webhook-secret', options);
  }

  /**
   * **Get the current webhook signing secret.**
   *
   * Returns the active secret used to sign outbound webhook deliveries via the
   * `bem-signature` header. Returns 404 if no secret has been generated for this
   * environment yet.
   *
   * Use the secret to verify incoming webhook payloads:
   *
   * 1. Parse `bem-signature: t={timestamp},v1={signature}`.
   * 2. Construct the signed string: `{timestamp}.{raw request body}`.
   * 3. Compute HMAC-SHA256 of that string using the secret.
   * 4. Compare the hex digest against `v1`.
   * 5. Reject requests where the timestamp is more than a few minutes old.
   */
  retrieve(options?: RequestOptions): APIPromise<WebhookSecretRetrieveResponse> {
    return this._client.get('/v3/webhook-secret', options);
  }

  /**
   * **Revoke the current webhook signing secret.**
   *
   * Deletes the active signing secret. Webhook deliveries will continue but will no
   * longer include a `bem-signature` header until a new secret is generated.
   */
  revoke(options?: RequestOptions): APIPromise<void> {
    return this._client.delete('/v3/webhook-secret', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Webhook signing secret used to verify `bem-signature` headers on delivered
 * webhooks.
 */
export interface WebhookSecretCreateResponse {
  /**
   * The signing secret value. Store this securely — it is shown in full only on
   * generation.
   */
  secret: string;
}

/**
 * Webhook signing secret used to verify `bem-signature` headers on delivered
 * webhooks.
 */
export interface WebhookSecretRetrieveResponse {
  /**
   * The signing secret value. Store this securely — it is shown in full only on
   * generation.
   */
  secret: string;
}

export declare namespace WebhookSecret {
  export {
    type WebhookSecretCreateResponse as WebhookSecretCreateResponse,
    type WebhookSecretRetrieveResponse as WebhookSecretRetrieveResponse,
  };
}
