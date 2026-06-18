// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource reviewQueue', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.reviewQueue.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.reviewQueue.list(
        {
          assignedTo: 'assignedTo',
          bucket: 'bucket',
          cursor: 'cursor',
          limit: 1,
          since: 'since',
          status: ['string'],
          type: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });
});
