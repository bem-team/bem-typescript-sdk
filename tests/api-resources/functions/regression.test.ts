// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource regression', () => {
  // Mock server tests are disabled
  test.skip('applyCorrections: only required params', async () => {
    const responsePromise = client.functions.regression.applyCorrections({
      baselineVersionNum: 3,
      comparisonVersionNum: 4,
      functionName: 'invoice-extractor',
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
  test.skip('applyCorrections: required and optional params', async () => {
    const response = await client.functions.regression.applyCorrections({
      baselineVersionNum: 3,
      comparisonVersionNum: 4,
      functionName: 'invoice-extractor',
    });
  });

  // Mock server tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.functions.regression.run({ functionName: 'invoice-extractor' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.functions.regression.run({
      functionName: 'invoice-extractor',
      baselineVersionNum: 3,
      comparisonVersionNum: 5,
      onlyCorrectedData: true,
      sampleSize: 100,
    });
  });
});
