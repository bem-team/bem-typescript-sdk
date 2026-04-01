// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Bem } from '../client';

export abstract class APIResource {
  protected _client: Bem;

  constructor(client: Bem) {
    this._client = client;
  }
}
