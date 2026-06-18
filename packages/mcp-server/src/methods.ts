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
    clientCallName: 'client.functions.compareMetrics',
    fullyQualifiedName: 'functions.compareMetrics',
    httpMethod: 'post',
    httpPath: '/v3/functions/compare',
  },
  {
    clientCallName: 'client.functions.estimateReviewRequirements',
    fullyQualifiedName: 'functions.estimateReviewRequirements',
    httpMethod: 'post',
    httpPath: '/v3/functions/review',
  },
  {
    clientCallName: 'client.functions.getMetrics',
    fullyQualifiedName: 'functions.getMetrics',
    httpMethod: 'get',
    httpPath: '/v3/functions/metrics',
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
    clientCallName: 'client.functions.regression.applyCorrections',
    fullyQualifiedName: 'functions.regression.applyCorrections',
    httpMethod: 'post',
    httpPath: '/v3/functions/regression/corrections',
  },
  {
    clientCallName: 'client.functions.regression.run',
    fullyQualifiedName: 'functions.regression.run',
    httpMethod: 'post',
    httpPath: '/v3/functions/regression',
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
    clientCallName: 'client.calls.retrieveTrace',
    fullyQualifiedName: 'calls.retrieveTrace',
    httpMethod: 'get',
    httpPath: '/v3/calls/{callID}/trace',
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
  {
    clientCallName: 'client.inferSchema.create',
    fullyQualifiedName: 'inferSchema.create',
    httpMethod: 'post',
    httpPath: '/v3/infer-schema',
  },
  {
    clientCallName: 'client.collections.create',
    fullyQualifiedName: 'collections.create',
    httpMethod: 'post',
    httpPath: '/v3/collections',
  },
  {
    clientCallName: 'client.collections.list',
    fullyQualifiedName: 'collections.list',
    httpMethod: 'get',
    httpPath: '/v3/collections',
  },
  {
    clientCallName: 'client.collections.delete',
    fullyQualifiedName: 'collections.delete',
    httpMethod: 'delete',
    httpPath: '/v3/collections',
  },
  {
    clientCallName: 'client.collections.countTokens',
    fullyQualifiedName: 'collections.countTokens',
    httpMethod: 'post',
    httpPath: '/v3/collections/token-count',
  },
  {
    clientCallName: 'client.collections.items.retrieve',
    fullyQualifiedName: 'collections.items.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/collections/items',
  },
  {
    clientCallName: 'client.collections.items.update',
    fullyQualifiedName: 'collections.items.update',
    httpMethod: 'put',
    httpPath: '/v3/collections/items',
  },
  {
    clientCallName: 'client.collections.items.delete',
    fullyQualifiedName: 'collections.items.delete',
    httpMethod: 'delete',
    httpPath: '/v3/collections/items',
  },
  {
    clientCallName: 'client.collections.items.add',
    fullyQualifiedName: 'collections.items.add',
    httpMethod: 'post',
    httpPath: '/v3/collections/items',
  },
  {
    clientCallName: 'client.events.submitFeedback',
    fullyQualifiedName: 'events.submitFeedback',
    httpMethod: 'post',
    httpPath: '/v3/events/{eventID}/feedback',
  },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.webhookSecret.create',
    fullyQualifiedName: 'webhookSecret.create',
    httpMethod: 'post',
    httpPath: '/v3/webhook-secret',
  },
  {
    clientCallName: 'client.webhookSecret.retrieve',
    fullyQualifiedName: 'webhookSecret.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/webhook-secret',
  },
  {
    clientCallName: 'client.webhookSecret.revoke',
    fullyQualifiedName: 'webhookSecret.revoke',
    httpMethod: 'delete',
    httpPath: '/v3/webhook-secret',
  },
  {
    clientCallName: 'client.eval.triggerEvaluation',
    fullyQualifiedName: 'eval.triggerEvaluation',
    httpMethod: 'post',
    httpPath: '/v3/eval',
  },
  {
    clientCallName: 'client.eval.results.retrieveResults',
    fullyQualifiedName: 'eval.results.retrieveResults',
    httpMethod: 'get',
    httpPath: '/v3/eval/results',
  },
  {
    clientCallName: 'client.eval.score.create',
    fullyQualifiedName: 'eval.score.create',
    httpMethod: 'post',
    httpPath: '/v3/eval/score',
  },
  {
    clientCallName: 'client.eval.score.retrieve',
    fullyQualifiedName: 'eval.score.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/eval/score/{scoreRunID}',
  },
  {
    clientCallName: 'client.eval.score.cancel',
    fullyQualifiedName: 'eval.score.cancel',
    httpMethod: 'post',
    httpPath: '/v3/eval/score/{scoreRunID}/cancel',
  },
  {
    clientCallName: 'client.fs.navigate',
    fullyQualifiedName: 'fs.navigate',
    httpMethod: 'post',
    httpPath: '/v3/fs',
  },
  {
    clientCallName: 'client.connectors.create',
    fullyQualifiedName: 'connectors.create',
    httpMethod: 'post',
    httpPath: '/v3/connectors',
  },
  {
    clientCallName: 'client.connectors.list',
    fullyQualifiedName: 'connectors.list',
    httpMethod: 'get',
    httpPath: '/v3/connectors',
  },
  {
    clientCallName: 'client.connectors.delete',
    fullyQualifiedName: 'connectors.delete',
    httpMethod: 'delete',
    httpPath: '/v3/connectors/{connectorID}',
  },
  {
    clientCallName: 'client.subscriptions.create',
    fullyQualifiedName: 'subscriptions.create',
    httpMethod: 'post',
    httpPath: '/v3/subscriptions',
  },
  {
    clientCallName: 'client.subscriptions.retrieve',
    fullyQualifiedName: 'subscriptions.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/subscriptions/{subscriptionID}',
  },
  {
    clientCallName: 'client.subscriptions.update',
    fullyQualifiedName: 'subscriptions.update',
    httpMethod: 'patch',
    httpPath: '/v3/subscriptions/{subscriptionID}',
  },
  {
    clientCallName: 'client.subscriptions.list',
    fullyQualifiedName: 'subscriptions.list',
    httpMethod: 'get',
    httpPath: '/v3/subscriptions',
  },
  {
    clientCallName: 'client.subscriptions.delete',
    fullyQualifiedName: 'subscriptions.delete',
    httpMethod: 'delete',
    httpPath: '/v3/subscriptions/{subscriptionID}',
  },
  {
    clientCallName: 'client.views.create',
    fullyQualifiedName: 'views.create',
    httpMethod: 'post',
    httpPath: '/v3/views',
  },
  {
    clientCallName: 'client.views.retrieve',
    fullyQualifiedName: 'views.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/views/{view_id}',
  },
  {
    clientCallName: 'client.views.update',
    fullyQualifiedName: 'views.update',
    httpMethod: 'put',
    httpPath: '/v3/views/{view_id}',
  },
  {
    clientCallName: 'client.views.list',
    fullyQualifiedName: 'views.list',
    httpMethod: 'get',
    httpPath: '/v3/views',
  },
  {
    clientCallName: 'client.views.delete',
    fullyQualifiedName: 'views.delete',
    httpMethod: 'delete',
    httpPath: '/v3/views/{view_id}',
  },
  {
    clientCallName: 'client.views.generateAggregationData',
    fullyQualifiedName: 'views.generateAggregationData',
    httpMethod: 'post',
    httpPath: '/v3/views/aggregation-data',
  },
  {
    clientCallName: 'client.views.generateTableData',
    fullyQualifiedName: 'views.generateTableData',
    httpMethod: 'post',
    httpPath: '/v3/views/table-data',
  },
  {
    clientCallName: 'client.buckets.create',
    fullyQualifiedName: 'buckets.create',
    httpMethod: 'post',
    httpPath: '/v3/buckets',
  },
  {
    clientCallName: 'client.buckets.retrieve',
    fullyQualifiedName: 'buckets.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/buckets/{bucketID}',
  },
  {
    clientCallName: 'client.buckets.update',
    fullyQualifiedName: 'buckets.update',
    httpMethod: 'patch',
    httpPath: '/v3/buckets/{bucketID}',
  },
  {
    clientCallName: 'client.buckets.list',
    fullyQualifiedName: 'buckets.list',
    httpMethod: 'get',
    httpPath: '/v3/buckets',
  },
  {
    clientCallName: 'client.buckets.delete',
    fullyQualifiedName: 'buckets.delete',
    httpMethod: 'delete',
    httpPath: '/v3/buckets/{bucketID}',
  },
  {
    clientCallName: 'client.entities.update',
    fullyQualifiedName: 'entities.update',
    httpMethod: 'patch',
    httpPath: '/v3/entities/{id}',
  },
  {
    clientCallName: 'client.entities.bulkCreate',
    fullyQualifiedName: 'entities.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v3/entities/bulk',
  },
  {
    clientCallName: 'client.entities.bulkValidate',
    fullyQualifiedName: 'entities.bulkValidate',
    httpMethod: 'post',
    httpPath: '/v3/entities/bulk-validate',
  },
  {
    clientCallName: 'client.entities.retrieveRelations',
    fullyQualifiedName: 'entities.retrieveRelations',
    httpMethod: 'get',
    httpPath: '/v3/entities/{id}/relations',
  },
  {
    clientCallName: 'client.entities.retrieveSeedStatus',
    fullyQualifiedName: 'entities.retrieveSeedStatus',
    httpMethod: 'get',
    httpPath: '/v3/entities/seed/{id}',
  },
  {
    clientCallName: 'client.entities.synonyms.add',
    fullyQualifiedName: 'entities.synonyms.add',
    httpMethod: 'post',
    httpPath: '/v3/entities/{id}/synonyms',
  },
  {
    clientCallName: 'client.entities.synonyms.remove',
    fullyQualifiedName: 'entities.synonyms.remove',
    httpMethod: 'delete',
    httpPath: '/v3/entities/{id}/synonyms/{synonymID}',
  },
  {
    clientCallName: 'client.entityTypes.create',
    fullyQualifiedName: 'entityTypes.create',
    httpMethod: 'post',
    httpPath: '/v3/entity-types',
  },
  {
    clientCallName: 'client.entityTypes.retrieve',
    fullyQualifiedName: 'entityTypes.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/entity-types/{typeID}',
  },
  {
    clientCallName: 'client.entityTypes.update',
    fullyQualifiedName: 'entityTypes.update',
    httpMethod: 'patch',
    httpPath: '/v3/entity-types/{typeID}',
  },
  {
    clientCallName: 'client.entityTypes.list',
    fullyQualifiedName: 'entityTypes.list',
    httpMethod: 'get',
    httpPath: '/v3/entity-types',
  },
  {
    clientCallName: 'client.entityTypes.delete',
    fullyQualifiedName: 'entityTypes.delete',
    httpMethod: 'delete',
    httpPath: '/v3/entity-types/{typeID}',
  },
  {
    clientCallName: 'client.entityTypes.reviewers.list',
    fullyQualifiedName: 'entityTypes.reviewers.list',
    httpMethod: 'get',
    httpPath: '/v3/entity-types/{typeID}/reviewers',
  },
  {
    clientCallName: 'client.entityTypes.reviewers.assign',
    fullyQualifiedName: 'entityTypes.reviewers.assign',
    httpMethod: 'post',
    httpPath: '/v3/entity-types/{typeID}/reviewers',
  },
  {
    clientCallName: 'client.entityTypes.reviewers.remove',
    fullyQualifiedName: 'entityTypes.reviewers.remove',
    httpMethod: 'delete',
    httpPath: '/v3/entity-types/{typeID}/reviewers/{userID}',
  },
  {
    clientCallName: 'client.knowledgeGraph.retrieve',
    fullyQualifiedName: 'knowledgeGraph.retrieve',
    httpMethod: 'get',
    httpPath: '/v3/knowledge-graph',
  },
  {
    clientCallName: 'client.reviewQueue.list',
    fullyQualifiedName: 'reviewQueue.list',
    httpMethod: 'get',
    httpPath: '/v3/review-queue',
  },
  {
    clientCallName: 'client.users.listReviewerAssignments',
    fullyQualifiedName: 'users.listReviewerAssignments',
    httpMethod: 'get',
    httpPath: '/v3/users/{userID}/reviewer-assignments',
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
