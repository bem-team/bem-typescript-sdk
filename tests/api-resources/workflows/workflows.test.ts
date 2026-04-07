// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workflows', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workflows.create({
      mainNodeName: 'mainNodeName',
      name: 'name',
      nodes: [{ function: {} }],
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
    const response = await client.workflows.create({
      mainNodeName: 'mainNodeName',
      name: 'name',
      nodes: [
        {
          function: {
            id: 'id',
            name: 'name',
            versionNum: 0,
          },
          name: 'name',
        },
      ],
      displayName: 'displayName',
      edges: [
        {
          destinationNodeName: 'destinationNodeName',
          sourceNodeName: 'sourceNodeName',
          destinationName: 'destinationName',
        },
      ],
      tags: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.workflows.retrieve('workflowName');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.workflows.update('workflowName', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.workflows.list();
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
      client.workflows.list(
        {
          displayName: 'displayName',
          endingBefore: 'endingBefore',
          functionIDs: ['string'],
          functionNames: ['string'],
          limit: 1,
          sortOrder: 'asc',
          startingAfter: 'startingAfter',
          tags: ['string'],
          workflowIDs: ['string'],
          workflowNames: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.workflows.delete('workflowName');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('call', async () => {
    const responsePromise = client.workflows.call('workflowName', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('copy: only required params', async () => {
    const responsePromise = client.workflows.copy({
      sourceWorkflowName: 'sourceWorkflowName',
      targetWorkflowName: 'targetWorkflowName',
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
  test.skip('copy: required and optional params', async () => {
    const response = await client.workflows.copy({
      sourceWorkflowName: 'sourceWorkflowName',
      targetWorkflowName: 'targetWorkflowName',
      sourceWorkflowVersionNum: 1,
      tags: ['string'],
      targetDisplayName: 'targetDisplayName',
      targetEnvironment: 'targetEnvironment',
    });
  });
});
