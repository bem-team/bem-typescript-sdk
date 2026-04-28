// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource results', () => {
  // Mock server tests are disabled
  test.skip('fetchResults: only required params', async () => {
    const responsePromise = client.eval.results.fetchResults({
      transformationIDs: ['tr_01HXAB...', 'tr_01HXCD...'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('fetchResults: required and optional params', async () => {
    const response = await client.eval.results.fetchResults({
      transformationIDs: ['tr_01HXAB...', 'tr_01HXCD...'],
      evaluationVersion: '0.1.0-gemini',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveResults: only required params', async () => {
    const responsePromise = client.eval.results.retrieveResults({ transformationIDs: 'transformationIDs' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveResults: required and optional params', async () => {
    const response = await client.eval.results.retrieveResults({
      transformationIDs: 'transformationIDs',
      evaluationVersion: 'evaluationVersion',
    });
  });
});
