// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource fs', () => {
  // Mock server tests are disabled
  test.skip('navigate: only required params', async () => {
    const responsePromise = client.fs.navigate({ op: 'ls' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('navigate: required and optional params', async () => {
    const response = await client.fs.navigate({
      op: 'ls',
      countOnly: true,
      cursor: 'cursor',
      filter: {
        functionName: 'functionName',
        search: 'search',
        since: '2019-12-27T18:11:19.117Z',
        type: 'type',
      },
      ignoreCase: true,
      limit: 0,
      n: 0,
      path: 'path',
      pattern: 'pattern',
      range: {
        page: 0,
        pageRange: [0, 0],
        sectionTypes: ['string'],
      },
      regex: true,
      scope: 'scope',
      select: ['string'],
    });
  });
});
