// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource functions', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.functions.create({ functionName: 'functionName', type: 'extract' });
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
    const response = await client.functions.create({
      functionName: 'functionName',
      type: 'extract',
      displayName: 'displayName',
      enableBoundingBoxes: true,
      outputSchema: {},
      outputSchemaName: 'outputSchemaName',
      preCount: true,
      tabularChunkingEnabled: true,
      tags: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.functions.retrieve('functionName');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.functions.retrieve(
        'functionName',
        { includeExtraSettings: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.functions.update('functionName', { type: 'extract' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.functions.update('functionName', {
      type: 'extract',
      displayName: 'displayName',
      enableBoundingBoxes: true,
      functionName: 'functionName',
      outputSchema: {},
      outputSchemaName: 'outputSchemaName',
      preCount: true,
      tabularChunkingEnabled: true,
      tags: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.functions.list();
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
      client.functions.list(
        {
          displayName: 'displayName',
          endingBefore: 'endingBefore',
          functionIDs: ['string'],
          functionNames: ['string'],
          includeExtraSettings: true,
          limit: 1,
          sortOrder: 'asc',
          startingAfter: 'startingAfter',
          tags: ['string'],
          types: ['transform'],
          workflowIDs: ['string'],
          workflowIDVersionNums: ['string'],
          workflowNames: ['string'],
          workflowNameVersionNums: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.functions.delete('functionName');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('compareMetrics: only required params', async () => {
    const responsePromise = client.functions.compareMetrics({ functionName: 'invoice-extractor' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('compareMetrics: required and optional params', async () => {
    const response = await client.functions.compareMetrics({
      functionName: 'invoice-extractor',
      baselineVersionNum: 2,
      comparisonVersionNum: 3,
      isRegression: true,
    });
  });

  // Mock server tests are disabled
  test.skip('estimateReviewRequirements: only required params', async () => {
    const responsePromise = client.functions.estimateReviewRequirements({
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
  test.skip('estimateReviewRequirements: required and optional params', async () => {
    const response = await client.functions.estimateReviewRequirements({
      functionName: 'invoice-extractor',
      confidenceLevels: [0],
      confidenceMethod: 'wald',
      evaluationVersion: '0.1.0-gemini',
      functionVersionNum: 2,
      isRegression: true,
      marginOfError: 0.05,
      thresholdMax: 0,
      thresholdMin: 0,
      thresholdStep: 0.001,
    });
  });

  // Mock server tests are disabled
  test.skip('getMetrics', async () => {
    const responsePromise = client.functions.getMetrics();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getMetrics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.functions.getMetrics(
        {
          displayName: 'displayName',
          endingBefore: 'endingBefore',
          functionIDs: ['string'],
          functionNames: ['string'],
          limit: 1,
          sortOrder: 'asc',
          startingAfter: 'startingAfter',
          tags: ['string'],
          types: ['transform'],
          workflowIDs: ['string'],
          workflowIDVersionNums: ['string'],
          workflowNames: ['string'],
          workflowNameVersionNums: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });
});
