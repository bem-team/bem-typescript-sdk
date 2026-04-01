// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource copy', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.functions.copy.create({
      sourceFunctionName: 'sourceFunctionName',
      targetFunctionName: 'targetFunctionName',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.functions.copy.create({
      sourceFunctionName: 'sourceFunctionName',
      targetFunctionName: 'targetFunctionName',
      tags: ['string'],
      targetDisplayName: 'targetDisplayName',
      targetEnvironment: 'targetEnvironment',
    });
  });
});
