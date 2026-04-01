// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { BemError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type Bem } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: Bem;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: Bem, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new BemError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: Bem,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface FunctionsPageResponse<Item> {
  functions: Array<Item>;
}

export interface FunctionsPageParams {
  startingAfter?: string;

  endingBefore?: string;

  limit?: number;
}

export class FunctionsPage<Item extends { functionID: string }>
  extends AbstractPage<Item>
  implements FunctionsPageResponse<Item>
{
  functions: Array<Item>;

  constructor(
    client: Bem,
    response: Response,
    body: FunctionsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.functions = body.functions || [];
  }

  getPaginatedItems(): Item[] {
    return this.functions ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const functions = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const functionID = functions[functions.length - 1]?.functionID;
      if (!functionID) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: functionID,
        },
      };
    }

    const functionID = functions[0]?.functionID;
    if (!functionID) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: functionID,
      },
    };
  }
}

export interface WorkflowsPageResponse<Item> {
  workflows: Array<Item>;
}

export interface WorkflowsPageParams {
  startingAfter?: string;

  endingBefore?: string;

  limit?: number;
}

export class WorkflowsPage<Item extends { id: string }>
  extends AbstractPage<Item>
  implements WorkflowsPageResponse<Item>
{
  workflows: Array<Item>;

  constructor(
    client: Bem,
    response: Response,
    body: WorkflowsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.workflows = body.workflows || [];
  }

  getPaginatedItems(): Item[] {
    return this.workflows ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const workflows = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const id = workflows[workflows.length - 1]?.id;
      if (!id) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: id,
        },
      };
    }

    const id = workflows[0]?.id;
    if (!id) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: id,
      },
    };
  }
}

export interface CallsPageResponse<Item> {
  calls: Array<Item>;
}

export interface CallsPageParams {
  startingAfter?: string;

  endingBefore?: string;

  limit?: number;
}

export class CallsPage<Item extends { callID: string }>
  extends AbstractPage<Item>
  implements CallsPageResponse<Item>
{
  calls: Array<Item>;

  constructor(client: Bem, response: Response, body: CallsPageResponse<Item>, options: FinalRequestOptions) {
    super(client, response, body, options);

    this.calls = body.calls || [];
  }

  getPaginatedItems(): Item[] {
    return this.calls ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const calls = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const callID = calls[calls.length - 1]?.callID;
      if (!callID) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: callID,
        },
      };
    }

    const callID = calls[0]?.callID;
    if (!callID) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: callID,
      },
    };
  }
}

export interface OutputsPageResponse<Item> {
  outputs: Array<Item>;
}

export interface OutputsPageParams {
  startingAfter?: string;

  endingBefore?: string;

  limit?: number;
}

export class OutputsPage<Item extends { eventID: string }>
  extends AbstractPage<Item>
  implements OutputsPageResponse<Item>
{
  outputs: Array<Item>;

  constructor(
    client: Bem,
    response: Response,
    body: OutputsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.outputs = body.outputs || [];
  }

  getPaginatedItems(): Item[] {
    return this.outputs ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const outputs = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const eventID = outputs[outputs.length - 1]?.eventID;
      if (!eventID) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: eventID,
        },
      };
    }

    const eventID = outputs[0]?.eventID;
    if (!eventID) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: eventID,
      },
    };
  }
}

export interface ErrorsPageResponse<Item> {
  errors: Array<Item>;
}

export interface ErrorsPageParams {
  startingAfter?: string;

  endingBefore?: string;

  limit?: number;
}

export class ErrorsPage<Item extends { eventID: string }>
  extends AbstractPage<Item>
  implements ErrorsPageResponse<Item>
{
  errors: Array<Item>;

  constructor(client: Bem, response: Response, body: ErrorsPageResponse<Item>, options: FinalRequestOptions) {
    super(client, response, body, options);

    this.errors = body.errors || [];
  }

  getPaginatedItems(): Item[] {
    return this.errors ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const errors = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const eventID = errors[errors.length - 1]?.eventID;
      if (!eventID) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: eventID,
        },
      };
    }

    const eventID = errors[0]?.eventID;
    if (!eventID) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: eventID,
      },
    };
  }
}

export interface WorkflowVersionsPageResponse<Item> {
  versions: Array<Item>;
}

export interface WorkflowVersionsPageParams {
  startingAfter?: number;

  endingBefore?: number;

  limit?: number;
}

export class WorkflowVersionsPage<Item extends { versionNum: number }>
  extends AbstractPage<Item>
  implements WorkflowVersionsPageResponse<Item>
{
  versions: Array<Item>;

  constructor(
    client: Bem,
    response: Response,
    body: WorkflowVersionsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.versions = body.versions || [];
  }

  getPaginatedItems(): Item[] {
    return this.versions ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const versions = this.getPaginatedItems();

    const isForwards = !(
      typeof this.options.query === 'object' && 'endingBefore' in (this.options.query || {})
    );
    if (isForwards) {
      const versionNum = versions[versions.length - 1]?.versionNum;
      if (!versionNum) {
        return null;
      }

      return {
        ...this.options,
        query: {
          ...maybeObj(this.options.query),
          startingAfter: versionNum,
        },
      };
    }

    const versionNum = versions[0]?.versionNum;
    if (!versionNum) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        endingBefore: versionNum,
      },
    };
  }
}
