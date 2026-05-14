// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource views', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.views.create({
      aggregations: [{ function: 'count', name: 'name' }],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [{ columnName: 'columnName', filterType: 'equals_string' }],
      functions: [{}],
      name: 'name',
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
    const response = await client.views.create({
      aggregations: [
        {
          function: 'count',
          name: 'name',
          aggregateColumnName: 'aggregateColumnName',
          groupByColumnName: 'groupByColumnName',
        },
      ],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [
        {
          columnName: 'columnName',
          filterType: 'equals_string',
          number: 0,
          string: 'string',
        },
      ],
      functions: [{ id: 'id', name: 'name' }],
      name: 'name',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.views.retrieve('view_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.views.update('view_id', {
      aggregations: [{ function: 'count', name: 'name' }],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [{ columnName: 'columnName', filterType: 'equals_string' }],
      functions: [{}],
      name: 'name',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.views.update('view_id', {
      aggregations: [
        {
          function: 'count',
          name: 'name',
          aggregateColumnName: 'aggregateColumnName',
          groupByColumnName: 'groupByColumnName',
        },
      ],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [
        {
          columnName: 'columnName',
          filterType: 'equals_string',
          number: 0,
          string: 'string',
        },
      ],
      functions: [{ id: 'id', name: 'name' }],
      name: 'name',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.views.list();
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
      client.views.list(
        {
          endingBefore: 'endingBefore',
          functionIDs: ['string'],
          functionNames: ['string'],
          limit: 1,
          sortOrder: 'asc',
          startingAfter: 'startingAfter',
          viewIDs: ['string'],
          viewNameSubstring: 'viewNameSubstring',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.views.delete('view_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('generateAggregationData: only required params', async () => {
    const responsePromise = client.views.generateAggregationData({
      aggregations: [{ function: 'count', name: 'name' }],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [{ columnName: 'columnName', filterType: 'equals_string' }],
      functions: [{}],
      name: 'name',
      timeWindow: { end: '2019-12-27T18:11:19.117Z', start: '2019-12-27T18:11:19.117Z' },
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
  test.skip('generateAggregationData: required and optional params', async () => {
    const response = await client.views.generateAggregationData({
      aggregations: [
        {
          function: 'count',
          name: 'name',
          aggregateColumnName: 'aggregateColumnName',
          groupByColumnName: 'groupByColumnName',
        },
      ],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [
        {
          columnName: 'columnName',
          filterType: 'equals_string',
          number: 0,
          string: 'string',
        },
      ],
      functions: [{ id: 'id', name: 'name' }],
      name: 'name',
      timeWindow: { end: '2019-12-27T18:11:19.117Z', start: '2019-12-27T18:11:19.117Z' },
    });
  });

  // Mock server tests are disabled
  test.skip('generateTableData: only required params', async () => {
    const responsePromise = client.views.generateTableData({
      aggregations: [{ function: 'count', name: 'name' }],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [{ columnName: 'columnName', filterType: 'equals_string' }],
      functions: [{}],
      name: 'name',
      timeWindow: { end: '2019-12-27T18:11:19.117Z', start: '2019-12-27T18:11:19.117Z' },
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
  test.skip('generateTableData: required and optional params', async () => {
    const response = await client.views.generateTableData({
      aggregations: [
        {
          function: 'count',
          name: 'name',
          aggregateColumnName: 'aggregateColumnName',
          groupByColumnName: 'groupByColumnName',
        },
      ],
      columns: [
        {
          displayOrderIndex: 0,
          name: 'name',
          valueSchemaPath: ['string'],
        },
      ],
      filters: [
        {
          columnName: 'columnName',
          filterType: 'equals_string',
          number: 0,
          string: 'string',
        },
      ],
      functions: [{ id: 'id', name: 'name' }],
      name: 'name',
      timeWindow: { end: '2019-12-27T18:11:19.117Z', start: '2019-12-27T18:11:19.117Z' },
      limit: 1,
      offset: 0,
    });
  });
});
