// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Bem from 'bem-ai-sdk';

const client = new Bem({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.collections.items.retrieve({ collectionName: 'collectionName' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.collections.items.retrieve({
      collectionName: 'collectionName',
      includeSubcollections: true,
      limit: 1,
      page: 1,
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.collections.items.update({
      collectionName: 'product_catalog',
      items: [
        {
          collectionItemID: 'clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP',
          data: 'SKU-12345: Updated Industrial Widget - Premium Edition',
        },
        {
          collectionItemID: 'clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ',
          data: {
            sku: 'SKU-67890',
            name: 'Updated Premium Gear',
            category: 'Hardware',
            price: 399.99,
          },
        },
      ],
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
    const response = await client.collections.items.update({
      collectionName: 'product_catalog',
      items: [
        {
          collectionItemID: 'clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP',
          data: 'SKU-12345: Updated Industrial Widget - Premium Edition',
        },
        {
          collectionItemID: 'clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ',
          data: {
            sku: 'SKU-67890',
            name: 'Updated Premium Gear',
            category: 'Hardware',
            price: 399.99,
          },
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.collections.items.delete({
      collectionItemID: 'collectionItemID',
      collectionName: 'collectionName',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.collections.items.delete({
      collectionItemID: 'collectionItemID',
      collectionName: 'collectionName',
    });
  });

  // Mock server tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.collections.items.add({
      collectionName: 'product_catalog',
      items: [
        {
          data: {
            sku: 'SKU-11111',
            name: 'Deluxe Component',
            category: 'Hardware',
            price: 299.99,
          },
        },
        {
          data: {
            sku: 'SKU-22222',
            name: 'Standard Part',
            category: 'Tools',
            price: 49.99,
          },
        },
      ],
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
  test.skip('add: required and optional params', async () => {
    const response = await client.collections.items.add({
      collectionName: 'product_catalog',
      items: [
        {
          data: {
            sku: 'SKU-11111',
            name: 'Deluxe Component',
            category: 'Hardware',
            price: 299.99,
          },
        },
        {
          data: {
            sku: 'SKU-22222',
            name: 'Standard Part',
            category: 'Tools',
            price: 49.99,
          },
        },
      ],
    });
  });
});
