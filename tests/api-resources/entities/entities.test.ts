// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource entities', () => {
  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.entities.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('bulkCreate: only required params', async () => {
    const responsePromise = client.entities.bulkCreate({
      entities: [{ canonical: 'Acme Corporation', type: 'organization' }],
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
  test.skip('bulkCreate: required and optional params', async () => {
    const response = await client.entities.bulkCreate({
      entities: [
        {
          canonical: 'Acme Corporation',
          type: 'organization',
          attributes: { headquarters: 'Springfield' },
          description: 'Industrial conglomerate',
          synonyms: ['ACME', 'Acme Corp'],
        },
      ],
      bucket: 'bucket',
      onConflict: 'merge',
    });
  });

  // Mock server tests are disabled
  test.skip('bulkValidate: only required params', async () => {
    const responsePromise = client.entities.bulkValidate({
      entityIDs: ['ent_2abc', 'ent_2def'],
      status: 'approved',
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
  test.skip('bulkValidate: required and optional params', async () => {
    const response = await client.entities.bulkValidate({
      entityIDs: ['ent_2abc', 'ent_2def'],
      status: 'approved',
      bucket: 'bucket',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveRelations', async () => {
    const responsePromise = client.entities.retrieveRelations('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveRelations: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.entities.retrieveRelations(
        'id',
        {
          bucket: 'bucket',
          cursor: 'cursor',
          direction: 'inbound',
          limit: 0,
          relationType: 'relationType',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Bem.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveSeedStatus', async () => {
    const responsePromise = client.entities.retrieveSeedStatus('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
