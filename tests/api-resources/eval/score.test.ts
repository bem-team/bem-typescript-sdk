// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource score', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.eval.score.create({ functionName: 'functionName' });
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
    const response = await client.eval.score.create({
      functionName: 'functionName',
      datasetID: 'datasetID',
      functionVersionNum: 0,
      matchConfig: {
        arrayMatch: 'by-index',
        fuzzyThreshold: 0,
        ignorePaths: ['string'],
        numericTolerance: 0,
        stringMatch: 'exact',
      },
      pairs: [
        {
          expected: {},
          input: { inputContent: 'inputContent', inputType: 'csv' },
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.eval.score.retrieve('scoreRunID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.eval.score.cancel('scoreRunID');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
