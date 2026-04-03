// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.functions.create',
    fullyQualifiedName: 'functions.create',
    httpMethod: 'post',
    httpPath: '/v3/functions',
  },
  {
    clientCallName: 'client.functions.retrieve',
    fullyQualifiedName: 'functions.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/functions/{functionName}',
  },
  {
    clientCallName: 'client.functions.update',
    fullyQualifiedName: 'functions.update',
    httpMethod: 'patch',
    httpPath: '/v3/functions/{functionName}',
  },
  {
    clientCallName: 'client.functions.list',
    fullyQualifiedName: 'functions.list',
    httpMethod: 'get',
    httpPath: '/v3/functions',
  },
  {
    clientCallName: 'client.functions.delete',
    fullyQualifiedName: 'functions.delete',
    httpMethod: 'delete',
    httpPath: '/v3/functions/{functionName}',
  },
  {
    clientCallName: 'client.functions.copy.create',
    fullyQualifiedName: 'functions.copy.create',
    httpMethod: 'post',
    httpPath: '/v3/functions/copy',
  },
  {
    clientCallName: 'client.functions.versions.retrieve',
    fullyQualifiedName: 'functions.versions.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/functions/{functionName}/versions/{versionNum}',
  },
  {
    clientCallName: 'client.functions.versions.list',
    fullyQualifiedName: 'functions.versions.list',
    httpMethod: 'get',
    httpPath: '/v3/functions/{functionName}/versions',
  },
  {
    clientCallName: 'client.calls.retrieve',
    fullyQualifiedName: 'calls.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/calls/{callID}',
  },
  {
    clientCallName: 'client.calls.list',
    fullyQualifiedName: 'calls.list',
    httpMethod: 'get',
    httpPath: '/v3/calls',
  },
  {
    clientCallName: 'client.errors.retrieve',
    fullyQualifiedName: 'errors.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/errors/{eventID}',
  },
  {
    clientCallName: 'client.errors.list',
    fullyQualifiedName: 'errors.list',
    httpMethod: 'get',
    httpPath: '/v3/errors',
  },
  {
    clientCallName: 'client.outputs.retrieve',
    fullyQualifiedName: 'outputs.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/outputs/{eventID}',
  },
  {
    clientCallName: 'client.outputs.list',
    fullyQualifiedName: 'outputs.list',
    httpMethod: 'get',
    httpPath: '/v3/outputs',
  },
  {
    clientCallName: 'client.workflows.create',
    fullyQualifiedName: 'workflows.create',
    httpMethod: 'post',
    httpPath: '/v3/workflows',
  },
  {
    clientCallName: 'client.workflows.retrieve',
    fullyQualifiedName: 'workflows.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/workflows/{workflowName}',
  },
  {
    clientCallName: 'client.workflows.update',
    fullyQualifiedName: 'workflows.update',
    httpMethod: 'patch',
    httpPath: '/v3/workflows/{workflowName}',
  },
  {
    clientCallName: 'client.workflows.list',
    fullyQualifiedName: 'workflows.list',
    httpMethod: 'get',
    httpPath: '/v3/workflows',
  },
  {
    clientCallName: 'client.workflows.delete',
    fullyQualifiedName: 'workflows.delete',
    httpMethod: 'delete',
    httpPath: '/v3/workflows/{workflowName}',
  },
  {
    clientCallName: 'client.workflows.call',
    fullyQualifiedName: 'workflows.call',
    httpMethod: 'post',
    httpPath: '/v3/workflows/{workflowName}/call',
  },
  {
    clientCallName: 'client.workflows.copy',
    fullyQualifiedName: 'workflows.copy',
    httpMethod: 'post',
    httpPath: '/v3/workflows/copy',
  },
  {
    clientCallName: 'client.workflows.versions.retrieve',
    fullyQualifiedName: 'workflows.versions.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/workflows/{workflowName}/versions/{versionNum}',
  },
  {
    clientCallName: 'client.workflows.versions.list',
    fullyQualifiedName: 'workflows.versions.list',
    httpMethod: 'get',
    httpPath: '/v3/workflows/{workflowName}/versions',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
