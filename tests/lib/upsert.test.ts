import { upsertFunction, upsertWorkflow, NotFoundError, AuthenticationError, type Bem } from 'bem-ai-sdk';

function notFound(): NotFoundError {
  return new NotFoundError(404, undefined, 'Not found', new Headers());
}

function authError(): AuthenticationError {
  return new AuthenticationError(401, undefined, 'Unauthorized', new Headers());
}

describe('upsertFunction', () => {
  it('creates when the function does not exist', async () => {
    const calls: string[] = [];
    const client = {
      functions: {
        retrieve: async () => {
          calls.push('retrieve');
          throw notFound();
        },
        create: async (body: { functionName: string }) => {
          calls.push(`create:${body.functionName}`);
          return { function: { functionName: body.functionName } };
        },
        update: async () => {
          calls.push('update');
          return {};
        },
      },
    } as unknown as Bem;

    const result = await upsertFunction(client, 'fn-a', { type: 'extract' } as never);
    expect(result.created).toBe(true);
    expect(calls).toEqual(['retrieve', 'create:fn-a']);
  });

  it('updates when the function already exists', async () => {
    const calls: string[] = [];
    const client = {
      functions: {
        retrieve: async () => {
          calls.push('retrieve');
          return { function: { functionName: 'fn-b' } };
        },
        create: async () => {
          calls.push('create');
          return {};
        },
        update: async (name: string) => {
          calls.push(`update:${name}`);
          return { function: { functionName: name } };
        },
      },
    } as unknown as Bem;

    const result = await upsertFunction(client, 'fn-b', { type: 'extract' } as never);
    expect(result.created).toBe(false);
    expect(calls).toEqual(['retrieve', 'update:fn-b']);
  });

  it('propagates non-404 errors instead of falling through to create', async () => {
    const client = {
      functions: {
        retrieve: async () => {
          throw authError();
        },
        create: async () => {
          throw new Error('create should not have been called');
        },
        update: async () => {
          throw new Error('update should not have been called');
        },
      },
    } as unknown as Bem;

    await expect(upsertFunction(client, 'fn-c', { type: 'extract' } as never)).rejects.toBeInstanceOf(
      AuthenticationError,
    );
  });
});

describe('upsertWorkflow', () => {
  it('creates when the workflow does not exist', async () => {
    const calls: string[] = [];
    const client = {
      workflows: {
        retrieve: async () => {
          calls.push('retrieve');
          throw notFound();
        },
        create: async (body: { name: string }) => {
          calls.push(`create:${body.name}`);
          return { name: body.name };
        },
        update: async () => {
          calls.push('update');
          return {};
        },
      },
    } as unknown as Bem;

    const result = await upsertWorkflow(client, 'wf-a', {
      mainNodeName: 'n1',
      nodes: [],
    } as never);
    expect(result.created).toBe(true);
    expect(calls).toEqual(['retrieve', 'create:wf-a']);
  });

  it('updates when the workflow exists', async () => {
    const calls: string[] = [];
    const client = {
      workflows: {
        retrieve: async () => {
          calls.push('retrieve');
          return { workflow: { name: 'wf-b' } };
        },
        create: async () => {
          calls.push('create');
          return {};
        },
        update: async (name: string) => {
          calls.push(`update:${name}`);
          return { workflow: { name } };
        },
      },
    } as unknown as Bem;

    const result = await upsertWorkflow(client, 'wf-b', {
      mainNodeName: 'n1',
      nodes: [],
    } as never);
    expect(result.created).toBe(false);
    expect(calls).toEqual(['retrieve', 'update:wf-b']);
  });
});
