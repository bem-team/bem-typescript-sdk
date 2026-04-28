// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/v3/functions',
    httpMethod: 'post',
    summary: 'Create a Function',
    description:
      "**Create a function.**\n\nThe function type (`extract`, `classify`, `split`, `join`, `enrich`,\nor `payload_shaping`) determines which configuration fields are\nrequired — see [Function types overview](/guide/function-types/overview)\nfor the per-type contract.\n\nThe response contains both `functionID` and `functionName`. Either is\na stable handle you can use elsewhere; most workflows reference\nfunctions by `functionName` because it's human-readable.\n\n## Naming rules\n\n- `functionName` must be unique per environment.\n- Allowed characters: letters, digits, hyphens, and underscores.\n- Names cannot be reused after deletion within the same environment\nfor at least the retention window of the previous record.\n\nThe new function is created at `versionNum: 1`. Subsequent\n`PATCH /v3/functions/{functionName}` calls produce new versions —\nthe version-1 configuration remains immutable and addressable.",
    stainlessPath: '(resource) functions > (method) create',
    qualified: 'client.functions.create',
    params: [
      "create_function: { functionName: string; type: 'extract'; displayName?: string; enableBoundingBoxes?: boolean; outputSchema?: object; outputSchemaName?: string; preCount?: boolean; tabularChunkingEnabled?: boolean; tags?: string[]; } | { functionName: string; type: 'classify'; classifications?: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description?: string; displayName?: string; tags?: string[]; } | { functionName: string; type: 'send'; destinationType?: 'webhook' | 's3' | 'google_drive'; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionName: string; type: 'split'; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; nextFunctionName?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; splitType?: 'print_page' | 'semantic_page'; tags?: string[]; } | { functionName: string; type: 'join'; description?: string; displayName?: string; joinType?: 'standard'; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { functionName: string; type: 'payload_shaping'; displayName?: string; shapingSchema?: string; tags?: string[]; } | { functionName: string; type: 'enrich'; config?: { steps: enrich_step[]; }; displayName?: string; tags?: string[]; } | { functionName: string; type: 'parse'; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; };",
    ],
    response:
      '{ function: object | object | object | object | object | object | object | object | object | object; }',
    perLanguage: {
      cli: {
        method: 'functions create',
        example:
          "bem functions create \\\n  --api-key 'My API Key' \\\n  --function-name functionName \\\n  --type extract",
      },
      csharp: {
        method: 'Functions.Create',
        example:
          'FunctionCreateParams parameters = new()\n{\n    CreateFunction = new Extract()\n    {\n        FunctionName = "functionName",\n        DisplayName = "displayName",\n        EnableBoundingBoxes = true,\n        OutputSchema = JsonSerializer.Deserialize<JsonElement>("{}"),\n        OutputSchemaName = "outputSchemaName",\n        PreCount = true,\n        TabularChunkingEnabled = true,\n        Tags =\n        [\n            "string"\n        ],\n    },\n};\n\nvar functionResponse = await client.Functions.Create(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "functionName": "functionName",\n          "type": "extract"\n        }\'',
      },
      python: {
        method: 'functions.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="extract",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.create({\n  functionName: 'functionName',\n  type: 'extract',\n});\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/functions',
    httpMethod: 'get',
    summary: 'List Functions',
    description:
      '**List functions in the current environment.**\n\nReturns each function\'s current version. Combine filters freely —\nthey AND together.\n\n## Filtering\n\n- `functionIDs` / `functionNames`: exact-match identity filters.\n- `displayName`: case-insensitive substring match.\n- `types`: one or more of `extract`, `classify`, `split`, `join`,\n`enrich`, `payload_shaping`. Legacy `transform`, `analyze`, `route`,\nand `send` types remain readable via this filter.\n- `tags`: returns functions tagged with any of the supplied tags.\n- `workflowIDs` / `workflowNames`: returns only functions referenced\nby the named workflows. Useful for "what functions does this\nworkflow depend on?" lookups.\n\n## Pagination\n\nCursor-based with `startingAfter` and `endingBefore` (functionIDs).\nDefault limit 50, maximum 100.',
    stainlessPath: '(resource) functions > (method) list',
    qualified: 'client.functions.list',
    params: [
      'displayName?: string;',
      'endingBefore?: string;',
      'functionIDs?: string[];',
      'functionNames?: string[];',
      'limit?: number;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      'tags?: string[];',
      'types?: string[];',
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response: 'object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## list\n\n`client.functions.list(displayName?: string, endingBefore?: string, functionIDs?: string[], functionNames?: string[], limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: string, tags?: string[], types?: string[], workflowIDs?: string[], workflowNames?: string[]): { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { classifications: classification_list_item[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: function_audit; displayName?: string; parseConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }`\n\n**get** `/v3/functions`\n\n**List functions in the current environment.**\n\nReturns each function's current version. Combine filters freely —\nthey AND together.\n\n## Filtering\n\n- `functionIDs` / `functionNames`: exact-match identity filters.\n- `displayName`: case-insensitive substring match.\n- `types`: one or more of `extract`, `classify`, `split`, `join`,\n`enrich`, `payload_shaping`. Legacy `transform`, `analyze`, `route`,\nand `send` types remain readable via this filter.\n- `tags`: returns functions tagged with any of the supplied tags.\n- `workflowIDs` / `workflowNames`: returns only functions referenced\nby the named workflows. Useful for \"what functions does this\nworkflow depend on?\" lookups.\n\n## Pagination\n\nCursor-based with `startingAfter` and `endingBefore` (functionIDs).\nDefault limit 50, maximum 100.\n\n### Parameters\n\n- `displayName?: string`\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `tags?: string[]`\n\n- `types?: string[]`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { classifications: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n  V3 read-side union. Same shape as the shared `Function` union but with\n`classify` in place of `route`. Legacy `transform` and `analyze` functions\nremain readable via V3.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const _function of client.functions.list()) {\n  console.log(_function);\n}\n```",
    perLanguage: {
      cli: {
        method: 'functions list',
        example: "bem functions list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Functions.List',
        example:
          'FunctionListParams parameters = new();\n\nvar page = await client.Functions.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Functions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Functions.List(context.TODO(), bem.FunctionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/functions \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'functions.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.functions.list()\npage = page.functions[0]\nprint(page)',
      },
      typescript: {
        method: 'client.functions.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const _function of client.functions.list()) {\n  console.log(_function);\n}",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v3/functions/{functionName}',
    httpMethod: 'delete',
    summary: 'Delete a Function',
    description:
      '**Delete a function and every one of its versions.**\n\nPermanent. Running and queued calls that reference this function\ncontinue to completion against the version they captured at call\ntime, but no new calls can target it.\n\n## Before deleting\n\nWorkflow nodes that reference this function will fail at call time\nafter deletion. List workflows that reference it first:\n\n```\nGET /v3/workflows?functionNames=my-function\n```\n\nUpdate or remove those workflows, or create a replacement function\nand re-point the workflow nodes, before deleting.',
    stainlessPath: '(resource) functions > (method) delete',
    qualified: 'client.functions.delete',
    params: ['functionName: string;'],
    markdown:
      "## delete\n\n`client.functions.delete(functionName: string): void`\n\n**delete** `/v3/functions/{functionName}`\n\n**Delete a function and every one of its versions.**\n\nPermanent. Running and queued calls that reference this function\ncontinue to completion against the version they captured at call\ntime, but no new calls can target it.\n\n## Before deleting\n\nWorkflow nodes that reference this function will fail at call time\nafter deletion. List workflows that reference it first:\n\n```\nGET /v3/workflows?functionNames=my-function\n```\n\nUpdate or remove those workflows, or create a replacement function\nand re-point the workflow nodes, before deleting.\n\n### Parameters\n\n- `functionName: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.functions.delete('functionName')\n```",
    perLanguage: {
      cli: {
        method: 'functions delete',
        example: "bem functions delete \\\n  --api-key 'My API Key' \\\n  --function-name functionName",
      },
      csharp: {
        method: 'Functions.Delete',
        example:
          'FunctionDeleteParams parameters = new() { FunctionName = "functionName" };\n\nawait client.Functions.Delete(parameters);',
      },
      go: {
        method: 'client.Functions.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Functions.Delete(context.TODO(), "functionName")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/$FUNCTION_NAME \\\n    -X DELETE \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'functions.delete',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nclient.functions.delete(\n    "functionName",\n)',
      },
      typescript: {
        method: 'client.functions.delete',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.functions.delete('functionName');",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/functions/{functionName}',
    httpMethod: 'get',
    summary: 'Get a Function',
    description:
      "**Retrieve a function's current version by name.**\n\nReturns the function record with its `currentVersionNum` and the\nconfiguration of that version. To inspect a historical version, use\n`GET /v3/functions/{functionName}/versions/{versionNum}`.",
    stainlessPath: '(resource) functions > (method) retrieve',
    qualified: 'client.functions.retrieve',
    params: ['functionName: string;'],
    response:
      '{ function: object | object | object | object | object | object | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.functions.retrieve(functionName: string): { function: function; }`\n\n**get** `/v3/functions/{functionName}`\n\n**Retrieve a function's current version by name.**\n\nReturns the function record with its `currentVersionNum` and the\nconfiguration of that version. To inspect a historical version, use\n`GET /v3/functions/{functionName}/versions/{versionNum}`.\n\n### Parameters\n\n- `functionName: string`\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { classifications: classification_list_item[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: function_audit; displayName?: string; parseConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function response wrapper used by V3 function endpoints.\nV3 wraps individual function responses in a `{\"function\": ...}` envelope\nfor consistency with other V3 resource endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { classifications: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst functionResponse = await client.functions.retrieve('functionName');\n\nconsole.log(functionResponse);\n```",
    perLanguage: {
      cli: {
        method: 'functions retrieve',
        example: "bem functions retrieve \\\n  --api-key 'My API Key' \\\n  --function-name functionName",
      },
      csharp: {
        method: 'Functions.Retrieve',
        example:
          'FunctionRetrieveParams parameters = new() { FunctionName = "functionName" };\n\nvar functionResponse = await client.Functions.Retrieve(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.Get(context.TODO(), "functionName")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/functions/$FUNCTION_NAME \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'functions.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.retrieve(\n    "functionName",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.retrieve('functionName');\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v3/functions/{functionName}',
    httpMethod: 'patch',
    summary: 'Update a Function',
    description:
      "**Update a function. Updates create a new version.**\n\nThe previous version remains addressable and immutable. Workflow\nnodes that pinned the function with a `versionNum` continue to use\nthe pinned version; nodes that reference the function by name with\nno version automatically pick up the new version on their next call.\n\n## What you can change\n\nAny field allowed by the function's type. Most commonly:\n`outputSchema` (for `extract`/`join`), `classifications` (for\n`classify`), `displayName`, and `tags`.\n\n## Versioning behaviour\n\n- Each successful update increments `currentVersionNum` by 1.\n- `displayName`, `tags`, and `functionName` updates also create a\nnew version, so the version history is a complete record of every\nchange.\n- To revert, fetch the previous version and re-submit its\nconfiguration as a new update — versions themselves are immutable.",
    stainlessPath: '(resource) functions > (method) update',
    qualified: 'client.functions.update',
    params: [
      'functionName: string;',
      "update_function: { type: 'extract'; displayName?: string; enableBoundingBoxes?: boolean; functionName?: string; outputSchema?: object; outputSchemaName?: string; preCount?: boolean; tabularChunkingEnabled?: boolean; tags?: string[]; } | { type: 'classify'; classifications?: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description?: string; displayName?: string; functionName?: string; tags?: string[]; } | { type: 'send'; destinationType?: 'webhook' | 's3' | 'google_drive'; displayName?: string; functionName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { type: 'split'; displayName?: string; functionName?: string; printPageSplitConfig?: { nextFunctionID?: string; nextFunctionName?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; splitType?: 'print_page' | 'semantic_page'; tags?: string[]; } | { type: 'join'; description?: string; displayName?: string; functionName?: string; joinType?: 'standard'; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { type: 'payload_shaping'; displayName?: string; functionName?: string; shapingSchema?: string; tags?: string[]; } | { type: 'enrich'; config?: { steps: enrich_step[]; }; } | { type: 'parse'; displayName?: string; functionName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; };",
    ],
    response:
      '{ function: object | object | object | object | object | object | object | object | object | object; }',
    perLanguage: {
      cli: {
        method: 'functions update',
        example:
          "bem functions update \\\n  --api-key 'My API Key' \\\n  --path-function-name functionName \\\n  --type extract",
      },
      csharp: {
        method: 'Functions.Update',
        example:
          'FunctionUpdateParams parameters = new()\n{\n    PathFunctionName = "functionName",\n    UpdateFunction = new Extract()\n    {\n        DisplayName = "displayName",\n        EnableBoundingBoxes = true,\n        FunctionName = "functionName",\n        OutputSchema = JsonSerializer.Deserialize<JsonElement>("{}"),\n        OutputSchemaName = "outputSchemaName",\n        PreCount = true,\n        TabularChunkingEnabled = true,\n        Tags =\n        [\n            "string"\n        ],\n    },\n};\n\nvar functionResponse = await client.Functions.Update(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.Update(\n\t\tcontext.TODO(),\n\t\t"functionName",\n\t\tbem.FunctionUpdateParams{\n\t\t\tUpdateFunction: bem.UpdateFunctionUnionParam{\n\t\t\t\tOfExtract: &bem.UpdateFunctionExtractParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/$PATH_FUNCTION_NAME \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "type": "extract"\n        }\'',
      },
      python: {
        method: 'functions.update',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.update(\n    path_function_name="functionName",\n    type="extract",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.update',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.update('functionName', { type: 'extract' });\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/functions/copy',
    httpMethod: 'post',
    summary: 'Copy a Function',
    description:
      "**Copy a function to a new name within the same environment.**\n\nForks the source function's current configuration into a brand-new\nfunction. The copy starts at `versionNum: 1` regardless of how many\nversions the source has — version history is not carried over.\n\nUseful for experimenting with schema or prompt changes against a\nstable production function without disturbing existing callers.\n\nThe destination name must be unique in the environment. A copy does\nnot migrate workflows: existing workflow nodes continue to reference\nthe original function.",
    stainlessPath: '(resource) functions.copy > (method) create',
    qualified: 'client.functions.copy.create',
    params: [
      'sourceFunctionName: string;',
      'targetFunctionName: string;',
      'tags?: string[];',
      'targetDisplayName?: string;',
      'targetEnvironment?: string;',
    ],
    response:
      '{ function: object | object | object | object | object | object | object | object | object | object; }',
    markdown:
      "## create\n\n`client.functions.copy.create(sourceFunctionName: string, targetFunctionName: string, tags?: string[], targetDisplayName?: string, targetEnvironment?: string): { function: function; }`\n\n**post** `/v3/functions/copy`\n\n**Copy a function to a new name within the same environment.**\n\nForks the source function's current configuration into a brand-new\nfunction. The copy starts at `versionNum: 1` regardless of how many\nversions the source has — version history is not carried over.\n\nUseful for experimenting with schema or prompt changes against a\nstable production function without disturbing existing callers.\n\nThe destination name must be unique in the environment. A copy does\nnot migrate workflows: existing workflow nodes continue to reference\nthe original function.\n\n### Parameters\n\n- `sourceFunctionName: string`\n  Name of the function to copy from. Must be a valid existing function name.\n\n- `targetFunctionName: string`\n  Name for the new copied function. Must be unique within the target environment.\n\n- `tags?: string[]`\n  Optional array of tags for the copied function. If not provided, defaults to the source function's tags.\n\n- `targetDisplayName?: string`\n  Optional display name for the copied function. If not provided, defaults to the source function's display name with \" (Copy)\" appended.\n\n- `targetEnvironment?: string`\n  Optional environment name to copy the function to. If not provided, the function will be copied within the same environment.\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { classifications: classification_list_item[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: function_audit; displayName?: string; parseConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function response wrapper used by V3 function endpoints.\nV3 wraps individual function responses in a `{\"function\": ...}` envelope\nfor consistency with other V3 resource endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'extract'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { classifications: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst functionResponse = await client.functions.copy.create({ sourceFunctionName: 'sourceFunctionName', targetFunctionName: 'targetFunctionName' });\n\nconsole.log(functionResponse);\n```",
    perLanguage: {
      cli: {
        method: 'copy create',
        example:
          "bem functions:copy create \\\n  --api-key 'My API Key' \\\n  --source-function-name sourceFunctionName \\\n  --target-function-name targetFunctionName",
      },
      csharp: {
        method: 'Functions.Copy.Create',
        example:
          'CopyCreateParams parameters = new()\n{\n    SourceFunctionName = "sourceFunctionName",\n    TargetFunctionName = "targetFunctionName",\n};\n\nvar functionResponse = await client.Functions.Copy.Create(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.Copy.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.Copy.New(context.TODO(), bem.FunctionCopyNewParams{\n\t\tFunctionCopyRequest: bem.FunctionCopyRequestParam{\n\t\t\tSourceFunctionName: "sourceFunctionName",\n\t\t\tTargetFunctionName: "targetFunctionName",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/copy \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "sourceFunctionName": "sourceFunctionName",\n          "targetFunctionName": "targetFunctionName"\n        }\'',
      },
      python: {
        method: 'functions.copy.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.copy.create(\n    source_function_name="sourceFunctionName",\n    target_function_name="targetFunctionName",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.copy.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.copy.create({\n  sourceFunctionName: 'sourceFunctionName',\n  targetFunctionName: 'targetFunctionName',\n});\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/functions/{functionName}/versions',
    httpMethod: 'get',
    summary: 'List Function Versions',
    description:
      '**List every version of a function.**\n\nReturns the full version history, newest-first. Each row captures\nthe configuration the function had between updates. Useful for\naudits ("when did this schema change?") and for diffing two\nversions before promoting an update to production.',
    stainlessPath: '(resource) functions.versions > (method) list',
    qualified: 'client.functions.versions.list',
    params: ['functionName: string;'],
    response:
      '{ totalCount?: number; versions?: object | object | object | object | object | object | object | object | object | object[]; }',
    markdown:
      "## list\n\n`client.functions.versions.list(functionName: string): { totalCount?: number; versions?: function_version[]; }`\n\n**get** `/v3/functions/{functionName}/versions`\n\n**List every version of a function.**\n\nReturns the full version history, newest-first. Each row captures\nthe configuration the function had between updates. Useful for\naudits (\"when did this schema change?\") and for diffing two\nversions before promoting an update to production.\n\n### Parameters\n\n- `functionName: string`\n\n### Returns\n\n- `{ totalCount?: number; versions?: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; tabularChunkingEnabled: boolean; type: 'extract'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { classifications: classification_list_item[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; parseConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }[]; }`\n\n  - `totalCount?: number`\n  - `versions?: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; tabularChunkingEnabled: boolean; type: 'extract'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { classifications: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst listFunctionVersionsResponse = await client.functions.versions.list('functionName');\n\nconsole.log(listFunctionVersionsResponse);\n```",
    perLanguage: {
      cli: {
        method: 'versions list',
        example:
          "bem functions:versions list \\\n  --api-key 'My API Key' \\\n  --function-name functionName",
      },
      csharp: {
        method: 'Functions.Versions.List',
        example:
          'VersionListParams parameters = new() { FunctionName = "functionName" };\n\nvar listFunctionVersionsResponse = await client.Functions.Versions.List(parameters);\n\nConsole.WriteLine(listFunctionVersionsResponse);',
      },
      go: {
        method: 'client.Functions.Versions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tlistFunctionVersionsResponse, err := client.Functions.Versions.List(context.TODO(), "functionName")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", listFunctionVersionsResponse.TotalCount)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/$FUNCTION_NAME/versions \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'functions.versions.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nlist_function_versions_response = client.functions.versions.list(\n    "functionName",\n)\nprint(list_function_versions_response.total_count)',
      },
      typescript: {
        method: 'client.functions.versions.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst listFunctionVersionsResponse = await client.functions.versions.list('functionName');\n\nconsole.log(listFunctionVersionsResponse.totalCount);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/functions/{functionName}/versions/{versionNum}',
    httpMethod: 'get',
    summary: 'Get a Function Version',
    description:
      '**Retrieve a specific historical version of a function.**\n\nVersions are immutable. Use this endpoint to inspect what a function\nlooked like at the moment a particular call was made — every event\nand transformation records the function version it ran against.',
    stainlessPath: '(resource) functions.versions > (method) retrieve',
    qualified: 'client.functions.versions.retrieve',
    params: ['functionName: string;', 'versionNum: number;'],
    response:
      '{ function: object | object | object | object | object | object | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.functions.versions.retrieve(functionName: string, versionNum: number): { function: function_version; }`\n\n**get** `/v3/functions/{functionName}/versions/{versionNum}`\n\n**Retrieve a specific historical version of a function.**\n\nVersions are immutable. Use this endpoint to inspect what a function\nlooked like at the moment a particular call was made — every event\nand transformation records the function version it ran against.\n\n### Parameters\n\n- `functionName: string`\n\n- `versionNum: number`\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; tabularChunkingEnabled: boolean; type: 'extract'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { classifications: classification_list_item[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; parseConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function-version response wrapper used by V3 endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; tabularChunkingEnabled: boolean; type: 'extract'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { enableBoundingBoxes: boolean; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; preCount: boolean; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { classifications: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; description: string; emailAddress: string; functionID: string; functionName: string; type: 'classify'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; type: 'parse'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; parseConfig?: { extractEntities?: boolean; linkAcrossDocuments?: boolean; schema?: object; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst version = await client.functions.versions.retrieve(0, { functionName: 'functionName' });\n\nconsole.log(version);\n```",
    perLanguage: {
      cli: {
        method: 'versions retrieve',
        example:
          "bem functions:versions retrieve \\\n  --api-key 'My API Key' \\\n  --function-name functionName \\\n  --version-num 0",
      },
      csharp: {
        method: 'Functions.Versions.Retrieve',
        example:
          'VersionRetrieveParams parameters = new()\n{\n    FunctionName = "functionName",\n    VersionNum = 0,\n};\n\nvar version = await client.Functions.Versions.Retrieve(parameters);\n\nConsole.WriteLine(version);',
      },
      go: {
        method: 'client.Functions.Versions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversion, err := client.Functions.Versions.Get(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tbem.FunctionVersionGetParams{\n\t\t\tFunctionName: "functionName",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/$FUNCTION_NAME/versions/$VERSION_NUM \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'functions.versions.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nversion = client.functions.versions.retrieve(\n    version_num=0,\n    function_name="functionName",\n)\nprint(version.function)',
      },
      typescript: {
        method: 'client.functions.versions.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst version = await client.functions.versions.retrieve(0, { functionName: 'functionName' });\n\nconsole.log(version['function']);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/calls',
    httpMethod: 'get',
    summary: 'List Calls',
    description:
      '**List workflow calls with filtering and pagination.**\n\nReturns calls created via `POST /v3/workflows/{workflowName}/call`.\n\n## Filtering\n\n- `callIDs`: Specific call identifiers\n- `referenceIDs`: Your custom reference IDs\n- `workflowIDs` / `workflowNames`: Filter by workflow\n\n## Pagination\n\nUse `startingAfter` and `endingBefore` cursors with a default limit of 50.',
    stainlessPath: '(resource) calls > (method) list',
    qualified: 'client.calls.list',
    params: [
      'callIDs?: string[];',
      'endingBefore?: string;',
      'limit?: number;',
      'referenceIDs?: string[];',
      'referenceIDSubstring?: string;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      "statuses?: 'pending' | 'running' | 'completed' | 'failed'[];",
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response:
      "{ callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }",
    markdown:
      "## list\n\n`client.calls.list(callIDs?: string[], endingBefore?: string, limit?: number, referenceIDs?: string[], referenceIDSubstring?: string, sortOrder?: 'asc' | 'desc', startingAfter?: string, statuses?: 'pending' | 'running' | 'completed' | 'failed'[], workflowIDs?: string[], workflowNames?: string[]): { callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n**get** `/v3/calls`\n\n**List workflow calls with filtering and pagination.**\n\nReturns calls created via `POST /v3/workflows/{workflowName}/call`.\n\n## Filtering\n\n- `callIDs`: Specific call identifiers\n- `referenceIDs`: Your custom reference IDs\n- `workflowIDs` / `workflowNames`: Filter by workflow\n\n## Pagination\n\nUse `startingAfter` and `endingBefore` cursors with a default limit of 50.\n\n### Parameters\n\n- `callIDs?: string[]`\n\n- `endingBefore?: string`\n\n- `limit?: number`\n\n- `referenceIDs?: string[]`\n\n- `referenceIDSubstring?: string`\n  Case-insensitive substring match against `callReferenceID`.\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `statuses?: 'pending' | 'running' | 'completed' | 'failed'[]`\n  Filter by one or more statuses.\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: object[]; metrics?: object; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: object[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: object[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  A workflow call returned by the V3 API.\n\nCompared to the V2 `Call` model:\n- Terminal outputs are split into `outputs` (non-error events) and `errors` (error events)\n- `callType` and function-scoped fields are removed — V3 calls are always workflow calls\n- The deprecated `functionCalls` field is removed (use `GET /v3/calls/{callID}/trace`)\n- `url` and `traceUrl` hint fields are included for resource discovery\n\n  - `callID: string`\n  - `createdAt: string`\n  - `errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]`\n  - `outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]`\n  - `traceUrl: string`\n  - `url: string`\n  - `callReferenceID?: string`\n  - `finishedAt?: string`\n  - `input?: { batchFiles?: { inputs?: { inputType?: string; itemReferenceID?: string; s3URL?: string; }[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }`\n  - `status?: 'pending' | 'running' | 'completed' | 'failed'`\n  - `workflowID?: string`\n  - `workflowName?: string`\n  - `workflowVersionNum?: number`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call);\n}\n```",
    perLanguage: {
      cli: {
        method: 'calls list',
        example: "bem calls list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Calls.List',
        example:
          'CallListParams parameters = new();\n\nvar page = await client.Calls.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Calls.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Calls.List(context.TODO(), bem.CallListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/calls \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'calls.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.calls.list()\npage = page.calls[0]\nprint(page.call_id)',
      },
      typescript: {
        method: 'client.calls.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call.callID);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/calls/{callID}',
    httpMethod: 'get',
    summary: 'Get a Call',
    description:
      '**Retrieve a workflow call by ID.**\n\nReturns the full call object including status, workflow details, terminal outputs,\nand terminal errors. `outputs` and `errors` are both populated once the call finishes —\nthey are not mutually exclusive (a partially-completed workflow may have both).\n\n## Status\n\n| Status | Description |\n|--------|-------------|\n| `pending` | Queued, not yet started |\n| `running` | Currently executing |\n| `completed` | All enclosed function calls finished without errors |\n| `failed` | One or more enclosed function calls produced an error event |\n\nPoll this endpoint or configure a webhook subscription to detect completion.',
    stainlessPath: '(resource) calls > (method) retrieve',
    qualified: 'client.calls.retrieve',
    params: ['callID: string;'],
    response:
      "{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }",
    markdown:
      "## retrieve\n\n`client.calls.retrieve(callID: string): { call?: call; error?: string; }`\n\n**get** `/v3/calls/{callID}`\n\n**Retrieve a workflow call by ID.**\n\nReturns the full call object including status, workflow details, terminal outputs,\nand terminal errors. `outputs` and `errors` are both populated once the call finishes —\nthey are not mutually exclusive (a partially-completed workflow may have both).\n\n## Status\n\n| Status | Description |\n|--------|-------------|\n| `pending` | Queued, not yet started |\n| `running` | Currently executing |\n| `completed` | All enclosed function calls finished without errors |\n| `failed` | One or more enclosed function calls produced an error event |\n\nPoll this endpoint or configure a webhook subscription to detect completion.\n\n### Parameters\n\n- `callID: string`\n\n### Returns\n\n- `{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }`\n\n  - `call?: { callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: object[]; metrics?: object; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: object[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: object[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst callGetResponse = await client.calls.retrieve('callID');\n\nconsole.log(callGetResponse);\n```",
    perLanguage: {
      cli: {
        method: 'calls retrieve',
        example: "bem calls retrieve \\\n  --api-key 'My API Key' \\\n  --call-id callID",
      },
      csharp: {
        method: 'Calls.Retrieve',
        example:
          'CallRetrieveParams parameters = new() { CallID = "callID" };\n\nvar callGetResponse = await client.Calls.Retrieve(parameters);\n\nConsole.WriteLine(callGetResponse);',
      },
      go: {
        method: 'client.Calls.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcallGetResponse, err := client.Calls.Get(context.TODO(), "callID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", callGetResponse.Call)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/calls/$CALL_ID \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'calls.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\ncall_get_response = client.calls.retrieve(\n    "callID",\n)\nprint(call_get_response.call)',
      },
      typescript: {
        method: 'client.calls.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst callGetResponse = await client.calls.retrieve('callID');\n\nconsole.log(callGetResponse.call);",
      },
    },
  },
  {
    name: 'retrieve_trace',
    endpoint: '/v3/calls/{callID}/trace',
    httpMethod: 'get',
    summary: 'Get Call Trace',
    description:
      "**Retrieve the full execution trace of a workflow call.**\n\nReturns all function calls and events emitted during the call as flat arrays.\nThe DAG can be reconstructed using `FunctionCallResponseBase.sourceEventID`\n(the event that spawned each function call) and each event's `functionCallID`\n(the function call that emitted it).\n\n## Graph structure\n\n- A function call with no `sourceEventID` is the root.\n- An event's `functionCallID` points to the function call that emitted it.\n- A function call's `sourceEventID` points to the event that triggered it.\n- `workflowNodeName` identifies the DAG node; `incomingDestinationName` identifies\nthe labelled outlet used to reach this call (absent for unlabelled edges and root calls).\n\nThe trace is available as soon as the call exists and grows as execution proceeds.",
    stainlessPath: '(resource) calls > (method) retrieve_trace',
    qualified: 'client.calls.retrieveTrace',
    params: ['callID: string;'],
    response:
      "{ error?: string; trace?: { events: object[]; functionCalls: { functionCallID: string; functionID: string; functionName: string; referenceID: string; startedAt: string; status: 'pending' | 'running' | 'completed' | 'failed'; type: function_type; activity?: object[]; finishedAt?: string; functionVersionNum?: number; incomingDestinationName?: string; inputs?: object[]; inputType?: string; s3URL?: string; sourceEventID?: string; sourceFunctionCallID?: string; workflowCallID?: string; workflowNodeName?: string; }[]; }; }",
    markdown:
      "## retrieve_trace\n\n`client.calls.retrieveTrace(callID: string): { error?: string; trace?: object; }`\n\n**get** `/v3/calls/{callID}/trace`\n\n**Retrieve the full execution trace of a workflow call.**\n\nReturns all function calls and events emitted during the call as flat arrays.\nThe DAG can be reconstructed using `FunctionCallResponseBase.sourceEventID`\n(the event that spawned each function call) and each event's `functionCallID`\n(the function call that emitted it).\n\n## Graph structure\n\n- A function call with no `sourceEventID` is the root.\n- An event's `functionCallID` points to the function call that emitted it.\n- A function call's `sourceEventID` points to the event that triggered it.\n- `workflowNodeName` identifies the DAG node; `incomingDestinationName` identifies\nthe labelled outlet used to reach this call (absent for unlabelled edges and root calls).\n\nThe trace is available as soon as the call exists and grows as execution proceeds.\n\n### Parameters\n\n- `callID: string`\n\n### Returns\n\n- `{ error?: string; trace?: { events: object[]; functionCalls: { functionCallID: string; functionID: string; functionName: string; referenceID: string; startedAt: string; status: 'pending' | 'running' | 'completed' | 'failed'; type: function_type; activity?: object[]; finishedAt?: string; functionVersionNum?: number; incomingDestinationName?: string; inputs?: object[]; inputType?: string; s3URL?: string; sourceEventID?: string; sourceFunctionCallID?: string; workflowCallID?: string; workflowNodeName?: string; }[]; }; }`\n  Response from `GET /v3/calls/{callID}/trace`.\n\nContains the full execution DAG as flat arrays of function calls and events. Reconstruct the\ngraph using `FunctionCallResponseBase.sourceEventID` (the event that spawned each function call)\nand each event's `functionCallID` (the function call that emitted it).\n\n  - `error?: string`\n  - `trace?: { events: object[]; functionCalls: { functionCallID: string; functionID: string; functionName: string; referenceID: string; startedAt: string; status: 'pending' | 'running' | 'completed' | 'failed'; type: string; activity?: { displayName?: string; status?: 'pending' | 'running' | 'completed' | 'failed'; }[]; finishedAt?: string; functionVersionNum?: number; incomingDestinationName?: string; inputs?: { inputType?: string; itemReferenceID?: string; s3URL?: string; }[]; inputType?: string; s3URL?: string; sourceEventID?: string; sourceFunctionCallID?: string; workflowCallID?: string; workflowNodeName?: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.calls.retrieveTrace('callID');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'calls retrieve_trace',
        example: "bem calls retrieve-trace \\\n  --api-key 'My API Key' \\\n  --call-id callID",
      },
      csharp: {
        method: 'Calls.RetrieveTrace',
        example:
          'CallRetrieveTraceParams parameters = new() { CallID = "callID" };\n\nvar response = await client.Calls.RetrieveTrace(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Calls.GetTrace',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Calls.GetTrace(context.TODO(), "callID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Error)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/calls/$CALL_ID/trace \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'calls.retrieve_trace',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.calls.retrieve_trace(\n    "callID",\n)\nprint(response.error)',
      },
      typescript: {
        method: 'client.calls.retrieveTrace',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.calls.retrieveTrace('callID');\n\nconsole.log(response.error);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/errors',
    httpMethod: 'get',
    summary: 'List Errors',
    description:
      '**List terminal error events.**\n\nReturns error events produced by failed function calls within workflow executions.\nNon-error output events are excluded; use `GET /v3/outputs` to retrieve those.\n\n## Filtering\n\nFilter by call, workflow, function, or reference ID. Multiple filters are ANDed together.',
    stainlessPath: '(resource) errors > (method) list',
    qualified: 'client.errors.list',
    params: [
      'callIDs?: string[];',
      'endingBefore?: string;',
      'functionIDs?: string[];',
      'functionNames?: string[];',
      'limit?: number;',
      'referenceIDs?: string[];',
      'referenceIDSubstring?: string;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response:
      "{ eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }",
    markdown:
      "## list\n\n`client.errors.list(callIDs?: string[], endingBefore?: string, functionIDs?: string[], functionNames?: string[], limit?: number, referenceIDs?: string[], referenceIDSubstring?: string, sortOrder?: 'asc' | 'desc', startingAfter?: string, workflowIDs?: string[], workflowNames?: string[]): { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n**get** `/v3/errors`\n\n**List terminal error events.**\n\nReturns error events produced by failed function calls within workflow executions.\nNon-error output events are excluded; use `GET /v3/outputs` to retrieve those.\n\n## Filtering\n\nFilter by call, workflow, function, or reference ID. Multiple filters are ANDed together.\n\n### Parameters\n\n- `callIDs?: string[]`\n  Filter to errors from specific calls.\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `limit?: number`\n\n- `referenceIDs?: string[]`\n\n- `referenceIDSubstring?: string`\n  Case-insensitive substring match against `referenceID`.\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n  - `eventID: string`\n  - `functionID: string`\n  - `functionName: string`\n  - `message: string`\n  - `referenceID: string`\n  - `callID?: string`\n  - `createdAt?: string`\n  - `eventType?: 'error'`\n  - `functionCallID?: string`\n  - `functionCallTryNumber?: number`\n  - `functionVersionNum?: number`\n  - `inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }`\n  - `metadata?: { durationFunctionToEventSeconds?: number; }`\n  - `workflowID?: string`\n  - `workflowName?: string`\n  - `workflowVersionNum?: number`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const errorEvent of client.errors.list()) {\n  console.log(errorEvent);\n}\n```",
    perLanguage: {
      cli: {
        method: 'errors list',
        example: "bem errors list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Errors.List',
        example:
          'ErrorListParams parameters = new();\n\nvar page = await client.Errors.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Errors.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Errors.List(context.TODO(), bem.ErrorListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/errors \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'errors.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.errors.list()\npage = page.errors[0]\nprint(page.event_id)',
      },
      typescript: {
        method: 'client.errors.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const errorEvent of client.errors.list()) {\n  console.log(errorEvent.eventID);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/errors/{eventID}',
    httpMethod: 'get',
    summary: 'Get an Error',
    description:
      '**Retrieve a single error event by ID.**\n\nReturns `404` if the event does not exist or if it is not an error event\n(use `GET /v3/outputs/{eventID}` for non-error events).',
    stainlessPath: '(resource) errors > (method) retrieve',
    qualified: 'client.errors.retrieve',
    params: ['eventID: string;'],
    response:
      "{ error: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; }",
    markdown:
      "## retrieve\n\n`client.errors.retrieve(eventID: string): { error: error_event; }`\n\n**get** `/v3/errors/{eventID}`\n\n**Retrieve a single error event by ID.**\n\nReturns `404` if the event does not exist or if it is not an error event\n(use `GET /v3/outputs/{eventID}` for non-error events).\n\n### Parameters\n\n- `eventID: string`\n\n### Returns\n\n- `{ error: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; }`\n\n  - `error: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst error = await client.errors.retrieve('eventID');\n\nconsole.log(error);\n```",
    perLanguage: {
      cli: {
        method: 'errors retrieve',
        example: "bem errors retrieve \\\n  --api-key 'My API Key' \\\n  --event-id eventID",
      },
      csharp: {
        method: 'Errors.Retrieve',
        example:
          'ErrorRetrieveParams parameters = new() { EventID = "eventID" };\n\nvar error = await client.Errors.Retrieve(parameters);\n\nConsole.WriteLine(error);',
      },
      go: {
        method: 'client.Errors.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terror, err := client.Errors.Get(context.TODO(), "eventID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", error.Error)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/errors/$EVENT_ID \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'errors.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nerror = client.errors.retrieve(\n    "eventID",\n)\nprint(error.error)',
      },
      typescript: {
        method: 'client.errors.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst error = await client.errors.retrieve('eventID');\n\nconsole.log(error.error);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/outputs',
    httpMethod: 'get',
    summary: 'List Outputs',
    description:
      '**List terminal non-error output events.**\n\nReturns events that represent successful terminal outputs — primary events\n(non-split-collection) that did not trigger any downstream function calls.\nError events are excluded; use `GET /v3/errors` to retrieve those.\n\n## Intermediate Events\n\nBy default, intermediate events (those that spawned a downstream function call in a\nmulti-step workflow) are excluded. Pass `includeIntermediate=true` to include them.\n\n## Filtering\n\nFilter by call, workflow, function, or reference ID. Multiple filters are ANDed together.',
    stainlessPath: '(resource) outputs > (method) list',
    qualified: 'client.outputs.list',
    params: [
      'callIDs?: string[];',
      'endingBefore?: string;',
      'eventIDs?: string[];',
      'functionIDs?: string[];',
      'functionNames?: string[];',
      'functionVersionNums?: number[];',
      'includeIntermediate?: boolean;',
      'isLabelled?: boolean;',
      'isRegression?: boolean;',
      'limit?: number;',
      'referenceIDs?: string[];',
      'referenceIDSubstring?: string;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      'transformationIDs?: string[];',
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response:
      'object | object | object | object | object | object | error_event | object | object | object | object',
    markdown:
      "## list\n\n`client.outputs.list(callIDs?: string[], endingBefore?: string, eventIDs?: string[], functionIDs?: string[], functionNames?: string[], functionVersionNums?: number[], includeIntermediate?: boolean, isLabelled?: boolean, isRegression?: boolean, limit?: number, referenceIDs?: string[], referenceIDSubstring?: string, sortOrder?: 'asc' | 'desc', startingAfter?: string, transformationIDs?: string[], workflowIDs?: string[], workflowNames?: string[]): { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; metadata?: object; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n**get** `/v3/outputs`\n\n**List terminal non-error output events.**\n\nReturns events that represent successful terminal outputs — primary events\n(non-split-collection) that did not trigger any downstream function calls.\nError events are excluded; use `GET /v3/errors` to retrieve those.\n\n## Intermediate Events\n\nBy default, intermediate events (those that spawned a downstream function call in a\nmulti-step workflow) are excluded. Pass `includeIntermediate=true` to include them.\n\n## Filtering\n\nFilter by call, workflow, function, or reference ID. Multiple filters are ANDed together.\n\n### Parameters\n\n- `callIDs?: string[]`\n  Filter to outputs from specific calls.\n\n- `endingBefore?: string`\n\n- `eventIDs?: string[]`\n  Filter to specific output events by their event IDs (KSUIDs).\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `functionVersionNums?: number[]`\n  Filter to specific function version numbers.\n\n- `includeIntermediate?: boolean`\n  When `true`, includes intermediate events (those that spawned a downstream function call).\nDefault: `false`.\n\n- `isLabelled?: boolean`\n  If `true`, only outputs with a corrected (labelled) payload.\nIf `false`, only outputs that are not labelled. If omitted, no filter is applied.\n\n- `isRegression?: boolean`\n  If `true`, only regression-marked outputs. If `false`, only non-regression outputs.\nIf omitted, no filter is applied.\n\nNote: clients migrating from `/v1-beta/transformations` should pass `isRegression=false`\nexplicitly to preserve the legacy default (regressions hidden unless explicitly requested).\n\n- `limit?: number`\n\n- `referenceIDs?: string[]`\n\n- `referenceIDSubstring?: string`\n  Case-insensitive substring match against `referenceID`.\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `transformationIDs?: string[]`\n  Filter by legacy transformation IDs. Provided for backwards compatibility\nwith clients migrating from `/v1-beta/transformations`.\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  V3 read-side event union. Superset of the shared `Event` union: it contains\nevery shared variant verbatim (backward compatible) and adds the V3-only\n`extract` and `classify` variants.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const outputListResponse of client.outputs.list()) {\n  console.log(outputListResponse);\n}\n```",
    perLanguage: {
      cli: {
        method: 'outputs list',
        example: "bem outputs list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Outputs.List',
        example:
          'OutputListParams parameters = new();\n\nvar page = await client.Outputs.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Outputs.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Outputs.List(context.TODO(), bem.OutputListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/outputs \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'outputs.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.outputs.list()\npage = page.outputs[0]\nprint(page)',
      },
      typescript: {
        method: 'client.outputs.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const outputListResponse of client.outputs.list()) {\n  console.log(outputListResponse);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/outputs/{eventID}',
    httpMethod: 'get',
    summary: 'Get an Output',
    description:
      '**Retrieve a single output event by ID.**\n\nFetches any non-error event by its `eventID`. Returns `404` if the event does not exist\nor if it is an error event (use `GET /v3/errors/{eventID}` for those).',
    stainlessPath: '(resource) outputs > (method) retrieve',
    qualified: 'client.outputs.retrieve',
    params: ['eventID: string;'],
    response:
      '{ output: object | object | object | object | object | object | error_event | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.outputs.retrieve(eventID: string): { output: object | object | object | object | object | object | error_event | object | object | object | object; }`\n\n**get** `/v3/outputs/{eventID}`\n\n**Retrieve a single output event by ID.**\n\nFetches any non-error event by its `eventID`. Returns `404` if the event does not exist\nor if it is an error event (use `GET /v3/errors/{eventID}` for those).\n\n### Parameters\n\n- `eventID: string`\n\n### Returns\n\n- `{ output: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: object[]; metrics?: object; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: object[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: object[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; }`\n\n  - `output: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst output = await client.outputs.retrieve('eventID');\n\nconsole.log(output);\n```",
    perLanguage: {
      cli: {
        method: 'outputs retrieve',
        example: "bem outputs retrieve \\\n  --api-key 'My API Key' \\\n  --event-id eventID",
      },
      csharp: {
        method: 'Outputs.Retrieve',
        example:
          'OutputRetrieveParams parameters = new() { EventID = "eventID" };\n\nvar output = await client.Outputs.Retrieve(parameters);\n\nConsole.WriteLine(output);',
      },
      go: {
        method: 'client.Outputs.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\toutput, err := client.Outputs.Get(context.TODO(), "eventID")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", output.Output)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/outputs/$EVENT_ID \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'outputs.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\noutput = client.outputs.retrieve(\n    "eventID",\n)\nprint(output.output)',
      },
      typescript: {
        method: 'client.outputs.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst output = await client.outputs.retrieve('eventID');\n\nconsole.log(output.output);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/workflows',
    httpMethod: 'get',
    summary: 'List Workflows',
    description:
      '**List workflows in the current environment.**\n\nReturns each workflow\'s current version, including its node graph\nand main node. Combine filters freely — they AND together.\n\n## Filtering\n\n- `workflowIDs` / `workflowNames`: exact-match identity filters.\n- `displayName`: case-insensitive substring match.\n- `tags`: returns workflows tagged with any of the supplied tags.\n- `functionIDs` / `functionNames`: returns only workflows that\nreference the named functions in any node. Useful for "which\nworkflows depend on this function?" lookups before changing or\ndeleting a function.\n\n## Pagination\n\nCursor-based with `startingAfter` and `endingBefore` (workflowIDs).\nDefault limit 50, maximum 100.',
    stainlessPath: '(resource) workflows > (method) list',
    qualified: 'client.workflows.list',
    params: [
      'displayName?: string;',
      'endingBefore?: string;',
      'functionIDs?: string[];',
      'functionNames?: string[];',
      'limit?: number;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      'tags?: string[];',
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response:
      "{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }",
    markdown:
      "## list\n\n`client.workflows.list(displayName?: string, endingBefore?: string, functionIDs?: string[], functionNames?: string[], limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: string, tags?: string[], workflowIDs?: string[], workflowNames?: string[]): { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n**get** `/v3/workflows`\n\n**List workflows in the current environment.**\n\nReturns each workflow's current version, including its node graph\nand main node. Combine filters freely — they AND together.\n\n## Filtering\n\n- `workflowIDs` / `workflowNames`: exact-match identity filters.\n- `displayName`: case-insensitive substring match.\n- `tags`: returns workflows tagged with any of the supplied tags.\n- `functionIDs` / `functionNames`: returns only workflows that\nreference the named functions in any node. Useful for \"which\nworkflows depend on this function?\" lookups before changing or\ndeleting a function.\n\n## Pagination\n\nCursor-based with `startingAfter` and `endingBefore` (workflowIDs).\nDefault limit 50, maximum 100.\n\n### Parameters\n\n- `displayName?: string`\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `tags?: string[]`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n  V3 read representation of a workflow version.\n\n  - `id: string`\n  - `connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]`\n  - `createdAt: string`\n  - `edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]`\n  - `mainNodeName: string`\n  - `name: string`\n  - `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name: string; metadata?: object; }[]`\n  - `updatedAt: string`\n  - `versionNum: number`\n  - `audit?: { versionCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowLastUpdatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; }`\n  - `displayName?: string`\n  - `emailAddress?: string`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.list()) {\n  console.log(workflow);\n}\n```",
    perLanguage: {
      cli: {
        method: 'workflows list',
        example: "bem workflows list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Workflows.List',
        example:
          'WorkflowListParams parameters = new();\n\nvar page = await client.Workflows.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Workflows.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Workflows.List(context.TODO(), bem.WorkflowListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/workflows \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'workflows.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.workflows.list()\npage = page.workflows[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.workflows.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.list()) {\n  console.log(workflow.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/workflows',
    httpMethod: 'post',
    summary: 'Create a Workflow',
    description:
      '**Create a workflow.**\n\nA workflow is a directed acyclic graph of nodes (each pointing at a\nfunction) with one entry point (`mainNodeName`). The graph runs\nend-to-end on every call.\n\n## Required structure\n\n- `name`: unique within the environment, alphanumeric plus hyphens\nand underscores.\n- `mainNodeName`: must match one of the `nodes[].name` values, and\nmust not be the destination of any edge.\n- `nodes`: at least one. Each node has a unique `name` and a\n`function` reference (by `functionName` or `functionID`, optionally\npinned to a `versionNum`).\n- `edges`: optional for single-node workflows. For branching\nsources (Classify, semantic Split), each edge carries a\n`destinationName` matching a `classifications[].name` or\n`itemClasses[].name` on the source function.\n\nThe created workflow is at `versionNum: 1`. Subsequent\n`PATCH /v3/workflows/{workflowName}` calls produce new versions.\n\n## Common patterns\n\n- **Single-node**: one extract/classify function, no edges.\n- **Sequential**: extract → enrich → payload_shaping (linear edges).\n- **Branching**: classify → multiple extracts (one edge per\nclassification name).\n- **Split-then-process**: split → multiple extracts (one edge per\nitem class).\n\nSee [Workflows explained](/guide/workflows-explained) for end-to-end\nexamples of each pattern.',
    stainlessPath: '(resource) workflows > (method) create',
    qualified: 'client.workflows.create',
    params: [
      'mainNodeName: string;',
      'name: string;',
      'nodes: { function: { id?: string; name?: string; versionNum?: number; }; metadata?: object; name?: string; }[];',
      "connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[];",
      'displayName?: string;',
      'edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[];',
      'tags?: string[];',
    ],
    response:
      "{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }",
    markdown:
      "## create\n\n`client.workflows.create(mainNodeName: string, name: string, nodes: { function: object; metadata?: object; name?: string; }[], connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[], displayName?: string, edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[], tags?: string[]): { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n**post** `/v3/workflows`\n\n**Create a workflow.**\n\nA workflow is a directed acyclic graph of nodes (each pointing at a\nfunction) with one entry point (`mainNodeName`). The graph runs\nend-to-end on every call.\n\n## Required structure\n\n- `name`: unique within the environment, alphanumeric plus hyphens\nand underscores.\n- `mainNodeName`: must match one of the `nodes[].name` values, and\nmust not be the destination of any edge.\n- `nodes`: at least one. Each node has a unique `name` and a\n`function` reference (by `functionName` or `functionID`, optionally\npinned to a `versionNum`).\n- `edges`: optional for single-node workflows. For branching\nsources (Classify, semantic Split), each edge carries a\n`destinationName` matching a `classifications[].name` or\n`itemClasses[].name` on the source function.\n\nThe created workflow is at `versionNum: 1`. Subsequent\n`PATCH /v3/workflows/{workflowName}` calls produce new versions.\n\n## Common patterns\n\n- **Single-node**: one extract/classify function, no edges.\n- **Sequential**: extract → enrich → payload_shaping (linear edges).\n- **Branching**: classify → multiple extracts (one edge per\nclassification name).\n- **Split-then-process**: split → multiple extracts (one edge per\nitem class).\n\nSee [Workflows explained](/guide/workflows-explained) for end-to-end\nexamples of each pattern.\n\n### Parameters\n\n- `mainNodeName: string`\n  Name of the entry-point node. Must not be a destination of any edge.\n\n- `name: string`\n  Unique name for the workflow. Must match `^[a-zA-Z0-9_-]{1,128}$`.\n\n- `nodes: { function: { id?: string; name?: string; versionNum?: number; }; metadata?: object; name?: string; }[]`\n  Call-site nodes in the DAG. At least one is required.\n\n- `connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[]`\n  Connectors to attach to the workflow at creation. If any entry fails to\nprovision, the entire workflow creation is rolled back.\n\n- `displayName?: string`\n  Human-readable display name.\n\n- `edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]`\n  Directed edges between nodes. Omit or leave empty for single-node workflows.\n\n- `tags?: string[]`\n  Tags to categorize and organize the workflow.\n\n### Returns\n\n- `{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n  V3 read representation of a workflow version.\n\n  - `id: string`\n  - `connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]`\n  - `createdAt: string`\n  - `edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]`\n  - `mainNodeName: string`\n  - `name: string`\n  - `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name: string; metadata?: object; }[]`\n  - `updatedAt: string`\n  - `versionNum: number`\n  - `audit?: { versionCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowLastUpdatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; }`\n  - `displayName?: string`\n  - `emailAddress?: string`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.create({\n  mainNodeName: 'mainNodeName',\n  name: 'name',\n  nodes: [{ function: {} }],\n});\n\nconsole.log(workflow);\n```",
    perLanguage: {
      cli: {
        method: 'workflows create',
        example:
          "bem workflows create \\\n  --api-key 'My API Key' \\\n  --main-node-name mainNodeName \\\n  --name name \\\n  --node '{function: {}}'",
      },
      csharp: {
        method: 'Workflows.Create',
        example:
          'WorkflowCreateParams parameters = new()\n{\n    MainNodeName = "mainNodeName",\n    Name = "name",\n    Nodes =\n    [\n        new()\n        {\n            Function = new()\n            {\n                ID = "id",\n                Name = "name",\n                VersionNum = 0,\n            },\n            Metadata = JsonSerializer.Deserialize<JsonElement>("{}"),\n            Name = "name",\n        },\n    ],\n};\n\nvar workflow = await client.Workflows.Create(parameters);\n\nConsole.WriteLine(workflow);',
      },
      go: {
        method: 'client.Workflows.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.New(context.TODO(), bem.WorkflowNewParams{\n\t\tMainNodeName: "mainNodeName",\n\t\tName:         "name",\n\t\tNodes: []bem.WorkflowNewParamsNode{{\n\t\t\tFunction: bem.FunctionVersionIdentifierParam{},\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "mainNodeName": "mainNodeName",\n          "name": "name",\n          "nodes": [\n            {\n              "function": {}\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'workflows.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.create(\n    main_node_name="mainNodeName",\n    name="name",\n    nodes=[{\n        "function": {}\n    }],\n)\nprint(workflow.id)',
      },
      typescript: {
        method: 'client.workflows.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.create({\n  mainNodeName: 'mainNodeName',\n  name: 'name',\n  nodes: [{ function: {} }],\n});\n\nconsole.log(workflow.id);",
      },
    },
  },
  {
    name: 'copy',
    endpoint: '/v3/workflows/copy',
    httpMethod: 'post',
    summary: 'Copy a Workflow',
    description:
      "**Copy a workflow to a new name.**\n\nForks the source workflow's current version into a brand-new\nworkflow at `versionNum: 1`. The full node graph and edges are\ncarried over, but the *functions* the copied nodes reference are\nshared, not duplicated — both workflows now point at the same\nfunctions.\n\nUseful for forking a production workflow to test a topology change\nwithout disturbing the live caller.",
    stainlessPath: '(resource) workflows > (method) copy',
    qualified: 'client.workflows.copy',
    params: [
      'sourceWorkflowName: string;',
      'targetWorkflowName: string;',
      'sourceWorkflowVersionNum?: number;',
      'tags?: string[];',
      'targetDisplayName?: string;',
      'targetEnvironment?: string;',
    ],
    response:
      '{ copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]; environment?: string; error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## copy\n\n`client.workflows.copy(sourceWorkflowName: string, targetWorkflowName: string, sourceWorkflowVersionNum?: number, tags?: string[], targetDisplayName?: string, targetEnvironment?: string): { copiedFunctions?: object[]; environment?: string; error?: string; workflow?: workflow; }`\n\n**post** `/v3/workflows/copy`\n\n**Copy a workflow to a new name.**\n\nForks the source workflow's current version into a brand-new\nworkflow at `versionNum: 1`. The full node graph and edges are\ncarried over, but the *functions* the copied nodes reference are\nshared, not duplicated — both workflows now point at the same\nfunctions.\n\nUseful for forking a production workflow to test a topology change\nwithout disturbing the live caller.\n\n### Parameters\n\n- `sourceWorkflowName: string`\n  Name of the source workflow to copy from.\n\n- `targetWorkflowName: string`\n  Name for the new copied workflow. Must be unique within the target environment.\n\n- `sourceWorkflowVersionNum?: number`\n  Optional version number of the source workflow to copy. If not provided, copies the current version.\n\n- `tags?: string[]`\n  Optional tags for the copied workflow. If not provided, uses the source workflow's tags.\n\n- `targetDisplayName?: string`\n  Optional display name for the copied workflow. If not provided, uses the source workflow's display name with \" (Copy)\" appended.\n\n- `targetEnvironment?: string`\n  Optional target environment name. If provided, copies the workflow to a different environment. When copying to a different environment, all functions used in the workflow will also be copied.\n\n### Returns\n\n- `{ copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]; environment?: string; error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]`\n  - `environment?: string`\n  - `error?: string`\n  - `workflow?: { id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.workflows.copy({ sourceWorkflowName: 'sourceWorkflowName', targetWorkflowName: 'targetWorkflowName' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows copy',
        example:
          "bem workflows copy \\\n  --api-key 'My API Key' \\\n  --source-workflow-name sourceWorkflowName \\\n  --target-workflow-name targetWorkflowName",
      },
      csharp: {
        method: 'Workflows.Copy',
        example:
          'WorkflowCopyParams parameters = new()\n{\n    SourceWorkflowName = "sourceWorkflowName",\n    TargetWorkflowName = "targetWorkflowName",\n};\n\nvar response = await client.Workflows.Copy(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Workflows.Copy',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.Copy(context.TODO(), bem.WorkflowCopyParams{\n\t\tSourceWorkflowName: "sourceWorkflowName",\n\t\tTargetWorkflowName: "targetWorkflowName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.CopiedFunctions)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows/copy \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "sourceWorkflowName": "sourceWorkflowName",\n          "targetWorkflowName": "targetWorkflowName"\n        }\'',
      },
      python: {
        method: 'workflows.copy',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.copy(\n    source_workflow_name="sourceWorkflowName",\n    target_workflow_name="targetWorkflowName",\n)\nprint(response.copied_functions)',
      },
      typescript: {
        method: 'client.workflows.copy',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.copy({\n  sourceWorkflowName: 'sourceWorkflowName',\n  targetWorkflowName: 'targetWorkflowName',\n});\n\nconsole.log(response.copiedFunctions);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v3/workflows/{workflowName}',
    httpMethod: 'delete',
    summary: 'Delete a Workflow',
    description:
      '**Delete a workflow and every one of its versions.**\n\nPermanent. Running and queued calls against this workflow continue\nto completion against the version they captured at call time;\nsubsequent attempts to call the workflow return `404 Not Found`.\n\nFunctions referenced by the deleted workflow are not removed — they\nremain available to other workflows or for direct reference.',
    stainlessPath: '(resource) workflows > (method) delete',
    qualified: 'client.workflows.delete',
    params: ['workflowName: string;'],
    markdown:
      "## delete\n\n`client.workflows.delete(workflowName: string): void`\n\n**delete** `/v3/workflows/{workflowName}`\n\n**Delete a workflow and every one of its versions.**\n\nPermanent. Running and queued calls against this workflow continue\nto completion against the version they captured at call time;\nsubsequent attempts to call the workflow return `404 Not Found`.\n\nFunctions referenced by the deleted workflow are not removed — they\nremain available to other workflows or for direct reference.\n\n### Parameters\n\n- `workflowName: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.workflows.delete('workflowName')\n```",
    perLanguage: {
      cli: {
        method: 'workflows delete',
        example: "bem workflows delete \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName",
      },
      csharp: {
        method: 'Workflows.Delete',
        example:
          'WorkflowDeleteParams parameters = new() { WorkflowName = "workflowName" };\n\nawait client.Workflows.Delete(parameters);',
      },
      go: {
        method: 'client.Workflows.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Workflows.Delete(context.TODO(), "workflowName")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME \\\n    -X DELETE \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'workflows.delete',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nclient.workflows.delete(\n    "workflowName",\n)',
      },
      typescript: {
        method: 'client.workflows.delete',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.workflows.delete('workflowName');",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/workflows/{workflowName}',
    httpMethod: 'get',
    summary: 'Get a Workflow',
    description:
      "**Retrieve a workflow's current version by name.**\n\nReturns the full workflow record: `currentVersionNum`, `mainNodeName`,\nthe `nodes` array (with each node's function reference and pinned\n`versionNum` if any), and the `edges` array. To inspect a historical\nversion, use `GET /v3/workflows/{workflowName}/versions/{versionNum}`.",
    stainlessPath: '(resource) workflows > (method) retrieve',
    qualified: 'client.workflows.retrieve',
    params: ['workflowName: string;'],
    response:
      '{ error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## retrieve\n\n`client.workflows.retrieve(workflowName: string): { error?: string; workflow?: workflow; }`\n\n**get** `/v3/workflows/{workflowName}`\n\n**Retrieve a workflow's current version by name.**\n\nReturns the full workflow record: `currentVersionNum`, `mainNodeName`,\nthe `nodes` array (with each node's function reference and pinned\n`versionNum` if any), and the `edges` array. To inspect a historical\nversion, use `GET /v3/workflows/{workflowName}/versions/{versionNum}`.\n\n### Parameters\n\n- `workflowName: string`\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.retrieve('workflowName');\n\nconsole.log(workflow);\n```",
    perLanguage: {
      cli: {
        method: 'workflows retrieve',
        example: "bem workflows retrieve \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName",
      },
      csharp: {
        method: 'Workflows.Retrieve',
        example:
          'WorkflowRetrieveParams parameters = new() { WorkflowName = "workflowName" };\n\nvar workflow = await client.Workflows.Retrieve(parameters);\n\nConsole.WriteLine(workflow);',
      },
      go: {
        method: 'client.Workflows.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.Get(context.TODO(), "workflowName")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.Error)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'workflows.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.retrieve(\n    "workflowName",\n)\nprint(workflow.error)',
      },
      typescript: {
        method: 'client.workflows.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.retrieve('workflowName');\n\nconsole.log(workflow.error);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v3/workflows/{workflowName}',
    httpMethod: 'patch',
    summary: 'Update a Workflow',
    description:
      '**Update a workflow. Updates create a new version.**\n\nThe previous version remains addressable and immutable. Pending and\nrunning calls captured at the old version continue against it; new\ncalls run against the new version.\n\n## Topology updates\n\nTo change the graph you must provide `mainNodeName`, `nodes`, AND\n`edges` together — partial topology updates are rejected. The full\ngraph is replaced atomically.\n\n## Metadata-only updates\n\nOmit all three fields to update only `displayName`, `tags`, or\n`name` while keeping the topology of the current version.\n\n## Reverting\n\nTo roll back, fetch the desired prior version and resubmit its\n`mainNodeName`/`nodes`/`edges` as a new update. Versions themselves\nare immutable — there is no "pin to version N" operation at the\nworkflow level (use `nodes[].function.versionNum` to pin individual\nfunctions).',
    stainlessPath: '(resource) workflows > (method) update',
    qualified: 'client.workflows.update',
    params: [
      'workflowName: string;',
      "connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[];",
      'displayName?: string;',
      'edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[];',
      'mainNodeName?: string;',
      'name?: string;',
      'nodes?: { function: { id?: string; name?: string; versionNum?: number; }; metadata?: object; name?: string; }[];',
      'tags?: string[];',
    ],
    response:
      "{ connectorErrors?: { code: string; message: string; operation: 'create' | 'update' | 'delete'; connectorID?: string; name?: string; }[]; error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }",
    markdown:
      "## update\n\n`client.workflows.update(workflowName: string, connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[], displayName?: string, edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[], mainNodeName?: string, name?: string, nodes?: { function: object; metadata?: object; name?: string; }[], tags?: string[]): { connectorErrors?: object[]; error?: string; workflow?: workflow; }`\n\n**patch** `/v3/workflows/{workflowName}`\n\n**Update a workflow. Updates create a new version.**\n\nThe previous version remains addressable and immutable. Pending and\nrunning calls captured at the old version continue against it; new\ncalls run against the new version.\n\n## Topology updates\n\nTo change the graph you must provide `mainNodeName`, `nodes`, AND\n`edges` together — partial topology updates are rejected. The full\ngraph is replaced atomically.\n\n## Metadata-only updates\n\nOmit all three fields to update only `displayName`, `tags`, or\n`name` while keeping the topology of the current version.\n\n## Reverting\n\nTo roll back, fetch the desired prior version and resubmit its\n`mainNodeName`/`nodes`/`edges` as a new update. Versions themselves\nare immutable — there is no \"pin to version N\" operation at the\nworkflow level (use `nodes[].function.versionNum` to pin individual\nfunctions).\n\n### Parameters\n\n- `workflowName: string`\n\n- `connectors?: { name: string; type: 'paragon'; connectorID?: string; paragon?: { configuration?: object; integration?: string; }; }[]`\n  Declarative, full-desired-state array of connectors. If omitted, existing\nconnectors are left unchanged. If provided, it replaces the current set:\nentries with `connectorID` are updates, entries without are creates, and\nexisting connectors whose `connectorID` is absent are deleted.\n\n- `displayName?: string`\n  Human-readable display name.\n\n- `edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]`\n\n- `mainNodeName?: string`\n  `mainNodeName`, `nodes`, and `edges` must be provided together to update the DAG\ntopology. If none are provided the topology is copied unchanged from the current\nversion.\n\n- `name?: string`\n  New name for the workflow (renames it). Must match `^[a-zA-Z0-9_-]{1,128}$`.\n\n- `nodes?: { function: { id?: string; name?: string; versionNum?: number; }; metadata?: object; name?: string; }[]`\n\n- `tags?: string[]`\n  Tags to categorize and organize the workflow.\n\n### Returns\n\n- `{ connectorErrors?: { code: string; message: string; operation: 'create' | 'update' | 'delete'; connectorID?: string; name?: string; }[]; error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `connectorErrors?: { code: string; message: string; operation: 'create' | 'update' | 'delete'; connectorID?: string; name?: string; }[]`\n  - `error?: string`\n  - `workflow?: { id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.update('workflowName');\n\nconsole.log(workflow);\n```",
    perLanguage: {
      cli: {
        method: 'workflows update',
        example: "bem workflows update \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName",
      },
      csharp: {
        method: 'Workflows.Update',
        example:
          'WorkflowUpdateParams parameters = new() { WorkflowName = "workflowName" };\n\nvar workflow = await client.Workflows.Update(parameters);\n\nConsole.WriteLine(workflow);',
      },
      go: {
        method: 'client.Workflows.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.Update(\n\t\tcontext.TODO(),\n\t\t"workflowName",\n\t\tbem.WorkflowUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.ConnectorErrors)\n}\n',
      },
      http: {
        example:
          "curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $BEM_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'workflows.update',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.update(\n    workflow_name="workflowName",\n)\nprint(workflow.connector_errors)',
      },
      typescript: {
        method: 'client.workflows.update',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.update('workflowName');\n\nconsole.log(workflow.connectorErrors);",
      },
    },
  },
  {
    name: 'call',
    endpoint: '/v3/workflows/{workflowName}/call',
    httpMethod: 'post',
    summary: 'Call a Workflow Call a Workflow',
    description:
      '**Invoke a workflow.**\n\nSubmit the input file as either a multipart form request or a JSON request with\nbase64-encoded file content. The workflow name is derived from the URL path.\n\n## Input Formats\n\n- **Multipart form** (`multipart/form-data`): attach the file directly via the `file`\nor `files` fields. Set `wait` in the form body to control synchronous behaviour.\n- **JSON** (`application/json`): base64-encode the file content and set it in\n`input.singleFile.inputContent` or `input.batchFiles.inputs[*].inputContent`.\nPass `wait=true` as a query parameter to control synchronous behaviour.\n\n## Synchronous vs Asynchronous\n\nBy default the call is created asynchronously and this endpoint returns `202 Accepted`\nimmediately with a `pending` call object. Set `wait` to `true` to block until\nthe call completes (up to 30 seconds):\n\n- On success: returns `200 OK` with the completed call, `outputs` populated\n- On failure: returns `500 Internal Server Error` with the call and an `error` message\n- On timeout: returns `202 Accepted` with the still-running call\n\n## Tracking\n\nPoll `GET /v3/calls/{callID}` to check status, or configure a webhook subscription\nto receive events when the call finishes.\n\n## CLI Usage\n\nUse `@path/to/file` inside JSON string values to embed file contents automatically.\nBinary files (PDF, images, audio) are base64-encoded; text files are embedded as strings.\n\nSingle file (synchronous):\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.single-file \'{"inputContent": "@invoice.pdf", "inputType": "pdf"}\' \\\n  --wait\n```\n\nSingle file (asynchronous, returns callID immediately):\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.single-file \'{"inputContent": "@invoice.pdf", "inputType": "pdf"}\'\n```\n\nBatch files:\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.batch-files \'{"inputs": [{"inputContent": "@a.pdf", "inputType": "pdf"}, {"inputContent": "@b.png", "inputType": "png"}]}\'\n```\n\nAlternative: pass the full `--input` flag as JSON:\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input \'{"singleFile": {"inputContent": "@invoice.pdf", "inputType": "pdf"}}\' \\\n  --wait\n```\n\n**Important:** `--wait` is a boolean flag. Use `--wait` or `--wait=true`.\nDo **not** use `--wait true` (with a space) — the `true` will be parsed as an\nunexpected positional argument.\n\nSupported `inputType` values: csv, docx, email, heic, heif, html, jpeg, json,\nm4a, mp3, pdf, png, text, wav, webp, xls, xlsx, xml.',
    stainlessPath: '(resource) workflows > (method) call',
    qualified: 'client.workflows.call',
    params: [
      'workflowName: string;',
      'input: { batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }; singleFile?: { inputContent: string; inputType: string; }; };',
      'wait?: boolean;',
      'callReferenceID?: string;',
      'metadata?: object;',
    ],
    response:
      "{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }",
    markdown:
      "## call\n\n`client.workflows.call(workflowName: string, input: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputContent: string; inputType: string; }; }, wait?: boolean, callReferenceID?: string, metadata?: object): { call?: call; error?: string; }`\n\n**post** `/v3/workflows/{workflowName}/call`\n\n**Invoke a workflow.**\n\nSubmit the input file as either a multipart form request or a JSON request with\nbase64-encoded file content. The workflow name is derived from the URL path.\n\n## Input Formats\n\n- **Multipart form** (`multipart/form-data`): attach the file directly via the `file`\nor `files` fields. Set `wait` in the form body to control synchronous behaviour.\n- **JSON** (`application/json`): base64-encode the file content and set it in\n`input.singleFile.inputContent` or `input.batchFiles.inputs[*].inputContent`.\nPass `wait=true` as a query parameter to control synchronous behaviour.\n\n## Synchronous vs Asynchronous\n\nBy default the call is created asynchronously and this endpoint returns `202 Accepted`\nimmediately with a `pending` call object. Set `wait` to `true` to block until\nthe call completes (up to 30 seconds):\n\n- On success: returns `200 OK` with the completed call, `outputs` populated\n- On failure: returns `500 Internal Server Error` with the call and an `error` message\n- On timeout: returns `202 Accepted` with the still-running call\n\n## Tracking\n\nPoll `GET /v3/calls/{callID}` to check status, or configure a webhook subscription\nto receive events when the call finishes.\n\n## CLI Usage\n\nUse `@path/to/file` inside JSON string values to embed file contents automatically.\nBinary files (PDF, images, audio) are base64-encoded; text files are embedded as strings.\n\nSingle file (synchronous):\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.single-file '{\"inputContent\": \"@invoice.pdf\", \"inputType\": \"pdf\"}' \\\n  --wait\n```\n\nSingle file (asynchronous, returns callID immediately):\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.single-file '{\"inputContent\": \"@invoice.pdf\", \"inputType\": \"pdf\"}'\n```\n\nBatch files:\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input.batch-files '{\"inputs\": [{\"inputContent\": \"@a.pdf\", \"inputType\": \"pdf\"}, {\"inputContent\": \"@b.png\", \"inputType\": \"png\"}]}'\n```\n\nAlternative: pass the full `--input` flag as JSON:\n```bash\nbem workflows call \\\n  --workflow-name my-workflow \\\n  --input '{\"singleFile\": {\"inputContent\": \"@invoice.pdf\", \"inputType\": \"pdf\"}}' \\\n  --wait\n```\n\n**Important:** `--wait` is a boolean flag. Use `--wait` or `--wait=true`.\nDo **not** use `--wait true` (with a space) — the `true` will be parsed as an\nunexpected positional argument.\n\nSupported `inputType` values: csv, docx, email, heic, heif, html, jpeg, json,\nm4a, mp3, pdf, png, text, wav, webp, xls, xlsx, xml.\n\n### Parameters\n\n- `workflowName: string`\n\n- `input: { batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }; singleFile?: { inputContent: string; inputType: string; }; }`\n  Input file(s) for a call. Provide exactly one of `singleFile` or `batchFiles`.\n\nIn the CLI, use the nested flags `--input.single-file` or `--input.batch-files`\nwith `@path/to/file` for automatic file embedding:\n`--input.single-file '{\"inputContent\": \"@invoice.pdf\", \"inputType\": \"pdf\"}' --wait`\n  - `batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }`\n    Multiple files to process in one call. Each item in the `inputs` array has its own `inputContent` and `inputType`.\n  - `singleFile?: { inputContent: string; inputType: string; }`\n    A single file input with base64-encoded content.\n\nWhen using the Bem CLI, use `@path/to/file` in the `inputContent` field to\nautomatically read and base64-encode the file:\n`--input.single-file '{\"inputContent\": \"@file.pdf\", \"inputType\": \"pdf\"}' --wait`\n\n- `wait?: boolean`\n  Block until the call completes (up to 30 seconds) and return the finished\ncall object. Default: `false`. This is a boolean flag — use `--wait` or\n`--wait=true`, not `--wait true`.\n\n- `callReferenceID?: string`\n  Your reference ID for tracking this call.\n\n- `metadata?: object`\n  Arbitrary JSON object attached to this call. Stored on the call record and injected\ninto `transformedContent` under the reserved `_metadata` key (alongside `referenceID`).\nMust be a JSON object. Maximum size: 4 KB.\n\n### Returns\n\n- `{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: object | object | object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }`\n\n  - `call?: { callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: object[]; metrics?: object; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: any_type[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'extract'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'classify'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: object[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: object[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst callGetResponse = await client.workflows.call('workflowName', { input: {} });\n\nconsole.log(callGetResponse);\n```",
    perLanguage: {
      cli: {
        method: 'workflows call',
        example:
          "bem workflows call \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName \\\n  --input '{}'",
      },
      csharp: {
        method: 'Workflows.Call',
        example:
          'WorkflowCallParams parameters = new()\n{\n    WorkflowName = "workflowName",\n    Input = new()\n    {\n        BatchFiles = new()\n        {\n            Inputs =\n            [\n                new()\n                {\n                    InputContent = "inputContent",\n                    InputType = InputType.Csv,\n                    ItemReferenceID = "itemReferenceID",\n                },\n            ],\n        },\n        SingleFile = new()\n        {\n            InputContent = "inputContent",\n            InputType = InputType.Csv,\n        },\n    },\n};\n\nvar callGetResponse = await client.Workflows.Call(parameters);\n\nConsole.WriteLine(callGetResponse);',
      },
      go: {
        method: 'client.Workflows.Call',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcallGetResponse, err := client.Workflows.Call(\n\t\tcontext.TODO(),\n\t\t"workflowName",\n\t\tbem.WorkflowCallParams{\n\t\t\tInput: bem.WorkflowCallParamsInput{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", callGetResponse.Call)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME/call \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "input": {}\n        }\'',
      },
      python: {
        method: 'workflows.call',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\ncall_get_response = client.workflows.call(\n    workflow_name="workflowName",\n    input={},\n)\nprint(call_get_response.call)',
      },
      typescript: {
        method: 'client.workflows.call',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst callGetResponse = await client.workflows.call('workflowName', { input: {} });\n\nconsole.log(callGetResponse.call);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/workflows/{workflowName}/versions',
    httpMethod: 'get',
    summary: 'List Workflow Versions',
    description:
      '**List every version of a workflow.**\n\nVersions are immutable. Each row captures what the workflow looked\nlike between updates: graph topology, metadata, and timestamps.\nReturns newest-first by default. Cursor pagination via\n`startingAfter` / `endingBefore` over `versionNum`.',
    stainlessPath: '(resource) workflows.versions > (method) list',
    qualified: 'client.workflows.versions.list',
    params: [
      'workflowName: string;',
      'endingBefore?: number;',
      'limit?: number;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: number;',
    ],
    response:
      "{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }",
    markdown:
      "## list\n\n`client.workflows.versions.list(workflowName: string, endingBefore?: number, limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: number): { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n**get** `/v3/workflows/{workflowName}/versions`\n\n**List every version of a workflow.**\n\nVersions are immutable. Each row captures what the workflow looked\nlike between updates: graph topology, metadata, and timestamps.\nReturns newest-first by default. Cursor pagination via\n`startingAfter` / `endingBefore` over `versionNum`.\n\n### Parameters\n\n- `workflowName: string`\n\n- `endingBefore?: number`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: number`\n\n### Returns\n\n- `{ id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n  V3 read representation of a workflow version.\n\n  - `id: string`\n  - `connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]`\n  - `createdAt: string`\n  - `edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]`\n  - `mainNodeName: string`\n  - `name: string`\n  - `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name: string; metadata?: object; }[]`\n  - `updatedAt: string`\n  - `versionNum: number`\n  - `audit?: { versionCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowLastUpdatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; }`\n  - `displayName?: string`\n  - `emailAddress?: string`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.versions.list('workflowName')) {\n  console.log(workflow);\n}\n```",
    perLanguage: {
      cli: {
        method: 'versions list',
        example:
          "bem workflows:versions list \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName",
      },
      csharp: {
        method: 'Workflows.Versions.List',
        example:
          'VersionListParams parameters = new() { WorkflowName = "workflowName" };\n\nvar page = await client.Workflows.Versions.List(parameters);\nawait foreach (var item in page.Paginate())\n{\n    Console.WriteLine(item);\n}',
      },
      go: {
        method: 'client.Workflows.Versions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Workflows.Versions.List(\n\t\tcontext.TODO(),\n\t\t"workflowName",\n\t\tbem.WorkflowVersionListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME/versions \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'workflows.versions.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\npage = client.workflows.versions.list(\n    workflow_name="workflowName",\n)\npage = page.versions[0]\nprint(page.id)',
      },
      typescript: {
        method: 'client.workflows.versions.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.versions.list('workflowName')) {\n  console.log(workflow.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/workflows/{workflowName}/versions/{versionNum}',
    httpMethod: 'get',
    summary: 'Get a Workflow Version',
    description:
      '**Retrieve a specific historical version of a workflow.**\n\nVersions are immutable. Use this endpoint to see what a workflow\nlooked like at the moment a particular call was made — every call\nrecord carries the workflow `versionNum` it ran against.',
    stainlessPath: '(resource) workflows.versions > (method) retrieve',
    qualified: 'client.workflows.versions.retrieve',
    params: ['workflowName: string;', 'versionNum: number;'],
    response:
      '{ error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## retrieve\n\n`client.workflows.versions.retrieve(workflowName: string, versionNum: number): { error?: string; workflow?: workflow; }`\n\n**get** `/v3/workflows/{workflowName}/versions/{versionNum}`\n\n**Retrieve a specific historical version of a workflow.**\n\nVersions are immutable. Use this endpoint to see what a workflow\nlooked like at the moment a particular call was made — every call\nrecord carries the workflow `versionNum` it ran against.\n\n### Parameters\n\n- `workflowName: string`\n\n- `versionNum: number`\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; connectors: object[]; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; connectors: { connectorID: string; name: string; type: 'paragon'; paragon?: { configuration: object; integration: string; syncID: string; }; }[]; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; metadata?: object; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; metadata?: object; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst version = await client.workflows.versions.retrieve(0, { workflowName: 'workflowName' });\n\nconsole.log(version);\n```",
    perLanguage: {
      cli: {
        method: 'versions retrieve',
        example:
          "bem workflows:versions retrieve \\\n  --api-key 'My API Key' \\\n  --workflow-name workflowName \\\n  --version-num 0",
      },
      csharp: {
        method: 'Workflows.Versions.Retrieve',
        example:
          'VersionRetrieveParams parameters = new()\n{\n    WorkflowName = "workflowName",\n    VersionNum = 0,\n};\n\nvar version = await client.Workflows.Versions.Retrieve(parameters);\n\nConsole.WriteLine(version);',
      },
      go: {
        method: 'client.Workflows.Versions.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tversion, err := client.Workflows.Versions.Get(\n\t\tcontext.TODO(),\n\t\t0,\n\t\tbem.WorkflowVersionGetParams{\n\t\t\tWorkflowName: "workflowName",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", version.Error)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME/versions/$VERSION_NUM \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'workflows.versions.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nversion = client.workflows.versions.retrieve(\n    version_num=0,\n    workflow_name="workflowName",\n)\nprint(version.error)',
      },
      typescript: {
        method: 'client.workflows.versions.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst version = await client.workflows.versions.retrieve(0, { workflowName: 'workflowName' });\n\nconsole.log(version.error);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/infer-schema',
    httpMethod: 'post',
    summary: 'Infer Schema from File',
    description:
      '**Analyze a file and infer a JSON Schema from its contents.**\n\nAccepts a file via multipart form upload and uses Gemini to analyze the document,\nreturning a description of its contents, an inferred JSON Schema capturing all\nextractable fields, and document classification metadata.\n\nThe returned schema is designed to be reusable across many similar documents of the\nsame type, not just the specific file uploaded. It can be used directly as the\n`outputSchema` when creating a Transform function.\n\nThe endpoint also detects whether the file contains multiple bundled documents\nand classifies the content nature (textual, visual, audio, video, or mixed).\n\n## Supported file types\n\nPDF, PNG, JPEG, HEIC, HEIF, WebP, CSV, XLS, XLSX, DOCX, JSON, HTML, XML, EML,\nplain text, WAV, MP3, M4A, MP4.\n\n## File size limit\n\nMaximum file size is **20 MB**.\n\n## Examples\n\nUsing curl:\n```bash\ncurl -X POST https://api.bem.ai/v3/infer-schema \\\n  -H "x-api-key: YOUR_API_KEY" \\\n  -F "file=@invoice.pdf"\n```\n\nUsing the Bem CLI:\n```bash\nbem infer-schema create --file @invoice.pdf\n```',
    stainlessPath: '(resource) infer_schema > (method) create',
    qualified: 'client.inferSchema.create',
    params: ['file: object;'],
    response:
      '{ analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }; filename: string; }',
    markdown:
      '## create\n\n`client.inferSchema.create(file: object): { analysis: object; filename: string; }`\n\n**post** `/v3/infer-schema`\n\n**Analyze a file and infer a JSON Schema from its contents.**\n\nAccepts a file via multipart form upload and uses Gemini to analyze the document,\nreturning a description of its contents, an inferred JSON Schema capturing all\nextractable fields, and document classification metadata.\n\nThe returned schema is designed to be reusable across many similar documents of the\nsame type, not just the specific file uploaded. It can be used directly as the\n`outputSchema` when creating a Transform function.\n\nThe endpoint also detects whether the file contains multiple bundled documents\nand classifies the content nature (textual, visual, audio, video, or mixed).\n\n## Supported file types\n\nPDF, PNG, JPEG, HEIC, HEIF, WebP, CSV, XLS, XLSX, DOCX, JSON, HTML, XML, EML,\nplain text, WAV, MP3, M4A, MP4.\n\n## File size limit\n\nMaximum file size is **20 MB**.\n\n## Examples\n\nUsing curl:\n```bash\ncurl -X POST https://api.bem.ai/v3/infer-schema \\\n  -H "x-api-key: YOUR_API_KEY" \\\n  -F "file=@invoice.pdf"\n```\n\nUsing the Bem CLI:\n```bash\nbem infer-schema create --file @invoice.pdf\n```\n\n### Parameters\n\n- `file: object`\n  The file to analyze and infer a JSON schema from.\n\n### Returns\n\n- `{ analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }; filename: string; }`\n  Response from the infer-schema endpoint.\n\n  - `analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }`\n  - `filename: string`\n\n### Example\n\n```typescript\nimport Bem from \'bem-ai-sdk\';\n\nconst client = new Bem();\n\nconst inferSchema = await client.inferSchema.create({ file: {} });\n\nconsole.log(inferSchema);\n```',
    perLanguage: {
      cli: {
        method: 'infer_schema create',
        example: "bem infer-schema create \\\n  --api-key 'My API Key' \\\n  --file '{}'",
      },
      csharp: {
        method: 'InferSchema.Create',
        example:
          'InferSchemaCreateParams parameters = new()\n{\n    File = JsonSerializer.Deserialize<JsonElement>("{}")\n};\n\nvar inferSchema = await client.InferSchema.Create(parameters);\n\nConsole.WriteLine(inferSchema);',
      },
      go: {
        method: 'client.InferSchema.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tinferSchema, err := client.InferSchema.New(context.TODO(), bem.InferSchemaNewParams{\n\t\tFile: map[string]any{},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", inferSchema.Analysis)\n}\n',
      },
      http: {
        example:
          "curl https://api.bem.ai/v3/infer-schema \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"x-api-key: $BEM_API_KEY\" \\\n    -F file='{}'",
      },
      python: {
        method: 'infer_schema.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\ninfer_schema = client.infer_schema.create(\n    file={},\n)\nprint(infer_schema.analysis)',
      },
      typescript: {
        method: 'client.inferSchema.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst inferSchema = await client.inferSchema.create({ file: {} });\n\nconsole.log(inferSchema.analysis);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v3/collections',
    httpMethod: 'delete',
    summary: 'Delete a Collection',
    description: 'Delete a Collection',
    stainlessPath: '(resource) collections > (method) delete',
    qualified: 'client.collections.delete',
    params: ['collectionName: string;'],
    markdown:
      "## delete\n\n`client.collections.delete(collectionName: string): void`\n\n**delete** `/v3/collections`\n\nDelete a Collection\n\n### Parameters\n\n- `collectionName: string`\n  The name/path of the collection to delete. Must use only letters, digits, underscores, and dots.\nEach segment must start with a letter or underscore.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.collections.delete({ collectionName: 'collectionName' })\n```",
    perLanguage: {
      cli: {
        method: 'collections delete',
        example: "bem collections delete \\\n  --api-key 'My API Key' \\\n  --collection-name collectionName",
      },
      csharp: {
        method: 'Collections.Delete',
        example:
          'CollectionDeleteParams parameters = new() { CollectionName = "collectionName" };\n\nawait client.Collections.Delete(parameters);',
      },
      go: {
        method: 'client.Collections.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Collections.Delete(context.TODO(), bem.CollectionDeleteParams{\n\t\tCollectionName: "collectionName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections \\\n    -X DELETE \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'collections.delete',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nclient.collections.delete(\n    collection_name="collectionName",\n)',
      },
      typescript: {
        method: 'client.collections.delete',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.collections.delete({ collectionName: 'collectionName' });",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/collections',
    httpMethod: 'get',
    summary: 'List Collections',
    description: 'List Collections',
    stainlessPath: '(resource) collections > (method) list',
    qualified: 'client.collections.list',
    params: [
      'collectionNameSearch?: string;',
      'limit?: number;',
      'page?: number;',
      'parentCollectionName?: string;',
    ],
    response:
      '{ collections: { collectionID: string; collectionName: string; createdAt: string; itemCount: number; updatedAt?: string; }[]; limit: number; page: number; totalCount: number; totalPages: number; }',
    markdown:
      '## list\n\n`client.collections.list(collectionNameSearch?: string, limit?: number, page?: number, parentCollectionName?: string): { collections: object[]; limit: number; page: number; totalCount: number; totalPages: number; }`\n\n**get** `/v3/collections`\n\nList Collections\n\n### Parameters\n\n- `collectionNameSearch?: string`\n  Optional substring search filter for collection names (case-insensitive).\nFor example, "premium" will match "customers.premium", "products.premium", etc.\n\n- `limit?: number`\n  Number of collections per page\n\n- `page?: number`\n  Page number for pagination\n\n- `parentCollectionName?: string`\n  Optional filter to list only collections under a specific parent collection path.\nFor example, "customers" will return "customers", "customers.premium", "customers.premium.vip", etc.\n\n### Returns\n\n- `{ collections: { collectionID: string; collectionName: string; createdAt: string; itemCount: number; updatedAt?: string; }[]; limit: number; page: number; totalCount: number; totalPages: number; }`\n  Response for listing collections\n\n  - `collections: { collectionID: string; collectionName: string; createdAt: string; itemCount: number; updatedAt?: string; }[]`\n  - `limit: number`\n  - `page: number`\n  - `totalCount: number`\n  - `totalPages: number`\n\n### Example\n\n```typescript\nimport Bem from \'bem-ai-sdk\';\n\nconst client = new Bem();\n\nconst collections = await client.collections.list();\n\nconsole.log(collections);\n```',
    perLanguage: {
      cli: {
        method: 'collections list',
        example: "bem collections list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Collections.List',
        example:
          'CollectionListParams parameters = new();\n\nvar collections = await client.Collections.List(parameters);\n\nConsole.WriteLine(collections);',
      },
      go: {
        method: 'client.Collections.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcollections, err := client.Collections.List(context.TODO(), bem.CollectionListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collections.Collections)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/collections \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'collections.list',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\ncollections = client.collections.list()\nprint(collections.collections)',
      },
      typescript: {
        method: 'client.collections.list',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst collections = await client.collections.list();\n\nconsole.log(collections.collections);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/collections',
    httpMethod: 'post',
    summary: 'Create a Collection',
    description: 'Create a Collection',
    stainlessPath: '(resource) collections > (method) create',
    qualified: 'client.collections.create',
    params: ['collectionName: string;'],
    response:
      '{ collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }',
    markdown:
      "## create\n\n`client.collections.create(collectionName: string): { collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: object[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }`\n\n**post** `/v3/collections`\n\nCreate a Collection\n\n### Parameters\n\n- `collectionName: string`\n  Unique name/path for the collection. Supports dot notation for hierarchical paths.\n\n- Only letters (a-z, A-Z), digits (0-9), underscores (_), and dots (.) are allowed\n- Each segment (between dots) must start with a letter or underscore (not a digit)\n- Segments cannot consist only of digits\n- Each segment must be 1-256 characters\n- No leading, trailing, or consecutive dots\n- Invalid names are rejected with a 400 Bad Request error\n\n**Valid Examples:**\n- 'product_catalog'\n- 'orders.line_items.sku'\n- 'customer_data'\n- 'price_v2'\n\n**Invalid Examples:**\n- 'product-catalog' (contains hyphen)\n- '123items' (starts with digit)\n- 'items..data' (consecutive dots)\n- 'order#123' (contains invalid character #)\n\n### Returns\n\n- `{ collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }`\n  Collection details\n\n  - `collectionID: string`\n  - `collectionName: string`\n  - `createdAt: string`\n  - `itemCount: number`\n  - `items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]`\n  - `limit?: number`\n  - `page?: number`\n  - `totalPages?: number`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst collection = await client.collections.create({ collectionName: 'product_catalog' });\n\nconsole.log(collection);\n```",
    perLanguage: {
      cli: {
        method: 'collections create',
        example:
          "bem collections create \\\n  --api-key 'My API Key' \\\n  --collection-name product_catalog",
      },
      csharp: {
        method: 'Collections.Create',
        example:
          'CollectionCreateParams parameters = new()\n{\n    CollectionName = "product_catalog"\n};\n\nvar collection = await client.Collections.Create(parameters);\n\nConsole.WriteLine(collection);',
      },
      go: {
        method: 'client.Collections.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcollection, err := client.Collections.New(context.TODO(), bem.CollectionNewParams{\n\t\tCollectionName: "product_catalog",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", collection.CollectionID)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "collectionName": "product_catalog"\n        }\'',
      },
      python: {
        method: 'collections.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\ncollection = client.collections.create(\n    collection_name="product_catalog",\n)\nprint(collection.collection_id)',
      },
      typescript: {
        method: 'client.collections.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.create({ collectionName: 'product_catalog' });\n\nconsole.log(collection.collectionID);",
      },
    },
  },
  {
    name: 'count_tokens',
    endpoint: '/v3/collections/token-count',
    httpMethod: 'post',
    summary: 'Count tokens for texts',
    description:
      "Count the number of tokens in the provided texts using the BGE M3 tokenizer.\nThis is useful for checking if texts will fit within the embedding model's token limit\n(8,192 tokens per text) before sending them for embedding.",
    stainlessPath: '(resource) collections > (method) count_tokens',
    qualified: 'client.collections.countTokens',
    params: ['texts: string[];'],
    response:
      '{ max_token_limit?: number; texts_exceeding_limit?: number; token_counts?: { char_count?: number; exceeds_limit?: boolean; index?: number; token_count?: number; }[]; total_tokens?: number; }',
    markdown:
      "## count_tokens\n\n`client.collections.countTokens(texts: string[]): { max_token_limit?: number; texts_exceeding_limit?: number; token_counts?: object[]; total_tokens?: number; }`\n\n**post** `/v3/collections/token-count`\n\nCount the number of tokens in the provided texts using the BGE M3 tokenizer.\nThis is useful for checking if texts will fit within the embedding model's token limit\n(8,192 tokens per text) before sending them for embedding.\n\n### Parameters\n\n- `texts: string[]`\n  One or more texts to tokenize.\n\n### Returns\n\n- `{ max_token_limit?: number; texts_exceeding_limit?: number; token_counts?: { char_count?: number; exceeds_limit?: boolean; index?: number; token_count?: number; }[]; total_tokens?: number; }`\n  Response for the token count endpoint.\n\n  - `max_token_limit?: number`\n  - `texts_exceeding_limit?: number`\n  - `token_counts?: { char_count?: number; exceeds_limit?: boolean; index?: number; token_count?: number; }[]`\n  - `total_tokens?: number`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.collections.countTokens({ texts: ['string'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'collections count_tokens',
        example: "bem collections count-tokens \\\n  --api-key 'My API Key' \\\n  --text string",
      },
      csharp: {
        method: 'Collections.CountTokens',
        example:
          'CollectionCountTokensParams parameters = new()\n{\n    Texts =\n    [\n        "string"\n    ],\n};\n\nvar response = await client.Collections.CountTokens(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Collections.CountTokens',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Collections.CountTokens(context.TODO(), bem.CollectionCountTokensParams{\n\t\tTexts: []string{"string"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.MaxTokenLimit)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections/token-count \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "texts": [\n            "string"\n          ]\n        }\'',
      },
      python: {
        method: 'collections.count_tokens',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.collections.count_tokens(\n    texts=["string"],\n)\nprint(response.max_token_limit)',
      },
      typescript: {
        method: 'client.collections.countTokens',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.collections.countTokens({ texts: ['string'] });\n\nconsole.log(response.max_token_limit);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v3/collections/items',
    httpMethod: 'delete',
    summary: 'Delete an item from a Collection',
    description: 'Delete an item from a Collection',
    stainlessPath: '(resource) collections.items > (method) delete',
    qualified: 'client.collections.items.delete',
    params: ['collectionItemID: string;', 'collectionName: string;'],
    markdown:
      "## delete\n\n`client.collections.items.delete(collectionItemID: string, collectionName: string): void`\n\n**delete** `/v3/collections/items`\n\nDelete an item from a Collection\n\n### Parameters\n\n- `collectionItemID: string`\n  The unique identifier of the item to delete\n\n- `collectionName: string`\n  The name/path of the collection. Must use only letters, digits, underscores, and dots.\nEach segment must start with a letter or underscore.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.collections.items.delete({ collectionItemID: 'collectionItemID', collectionName: 'collectionName' })\n```",
    perLanguage: {
      cli: {
        method: 'items delete',
        example:
          "bem collections:items delete \\\n  --api-key 'My API Key' \\\n  --collection-item-id collectionItemID \\\n  --collection-name collectionName",
      },
      csharp: {
        method: 'Collections.Items.Delete',
        example:
          'ItemDeleteParams parameters = new()\n{\n    CollectionItemID = "collectionItemID",\n    CollectionName = "collectionName",\n};\n\nawait client.Collections.Items.Delete(parameters);',
      },
      go: {
        method: 'client.Collections.Items.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Collections.Items.Delete(context.TODO(), bem.CollectionItemDeleteParams{\n\t\tCollectionItemID: "collectionItemID",\n\t\tCollectionName:   "collectionName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections/items \\\n    -X DELETE \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'collections.items.delete',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nclient.collections.items.delete(\n    collection_item_id="collectionItemID",\n    collection_name="collectionName",\n)',
      },
      typescript: {
        method: 'client.collections.items.delete',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.collections.items.delete({\n  collectionItemID: 'collectionItemID',\n  collectionName: 'collectionName',\n});",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/collections/items',
    httpMethod: 'get',
    summary: 'Get a Collection',
    description: 'Get a Collection',
    stainlessPath: '(resource) collections.items > (method) retrieve',
    qualified: 'client.collections.items.retrieve',
    params: [
      'collectionName: string;',
      'includeSubcollections?: boolean;',
      'limit?: number;',
      'page?: number;',
    ],
    response:
      '{ collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }',
    markdown:
      '## retrieve\n\n`client.collections.items.retrieve(collectionName: string, includeSubcollections?: boolean, limit?: number, page?: number): { collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: object[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }`\n\n**get** `/v3/collections/items`\n\nGet a Collection\n\n### Parameters\n\n- `collectionName: string`\n  The name/path of the collection. Must use only letters, digits, underscores, and dots.\nEach segment must start with a letter or underscore.\n\n- `includeSubcollections?: boolean`\n  When true, includes items from all subcollections under the specified collection path.\nFor example, querying "customers" with this flag will return items from "customers",\n"customers.premium", "customers.premium.vip", etc.\n\n- `limit?: number`\n  Number of items per page\n\n- `page?: number`\n  Page number for pagination\n\n### Returns\n\n- `{ collectionID: string; collectionName: string; createdAt: string; itemCount: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; limit?: number; page?: number; totalPages?: number; updatedAt?: string; }`\n  Collection details\n\n  - `collectionID: string`\n  - `collectionName: string`\n  - `createdAt: string`\n  - `itemCount: number`\n  - `items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]`\n  - `limit?: number`\n  - `page?: number`\n  - `totalPages?: number`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Bem from \'bem-ai-sdk\';\n\nconst client = new Bem();\n\nconst item = await client.collections.items.retrieve({ collectionName: \'collectionName\' });\n\nconsole.log(item);\n```',
    perLanguage: {
      cli: {
        method: 'items retrieve',
        example:
          "bem collections:items retrieve \\\n  --api-key 'My API Key' \\\n  --collection-name collectionName",
      },
      csharp: {
        method: 'Collections.Items.Retrieve',
        example:
          'ItemRetrieveParams parameters = new() { CollectionName = "collectionName" };\n\nvar item = await client.Collections.Items.Retrieve(parameters);\n\nConsole.WriteLine(item);',
      },
      go: {
        method: 'client.Collections.Items.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Get(context.TODO(), bem.CollectionItemGetParams{\n\t\tCollectionName: "collectionName",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.CollectionID)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/collections/items \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'collections.items.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.retrieve(\n    collection_name="collectionName",\n)\nprint(item.collection_id)',
      },
      typescript: {
        method: 'client.collections.items.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.retrieve({ collectionName: 'collectionName' });\n\nconsole.log(item.collectionID);",
      },
    },
  },
  {
    name: 'add',
    endpoint: '/v3/collections/items',
    httpMethod: 'post',
    summary: 'Add new items to a Collection',
    description: 'Add new items to a Collection',
    stainlessPath: '(resource) collections.items > (method) add',
    qualified: 'client.collections.items.add',
    params: ['collectionName: string;', 'items: { data: string | object; }[];'],
    response:
      "{ eventID: string; message: string; status: 'pending'; addedCount?: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; }",
    markdown:
      "## add\n\n`client.collections.items.add(collectionName: string, items: { data: string | object; }[]): { eventID: string; message: string; status: 'pending'; addedCount?: number; items?: object[]; }`\n\n**post** `/v3/collections/items`\n\nAdd new items to a Collection\n\n### Parameters\n\n- `collectionName: string`\n  The name/path of the collection. Must use only letters, digits, underscores, and dots.\nEach segment must start with a letter or underscore.\n\n- `items: { data: string | object; }[]`\n  Array of items to add (maximum 100 items per request)\n\n### Returns\n\n- `{ eventID: string; message: string; status: 'pending'; addedCount?: number; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; }`\n  Response after queuing items for async processing\n\n  - `eventID: string`\n  - `message: string`\n  - `status: 'pending'`\n  - `addedCount?: number`\n  - `items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.collections.items.add({ collectionName: 'product_catalog', items: [{ data: {\n  sku: 'SKU-11111',\n  name: 'Deluxe Component',\n  category: 'Hardware',\n  price: 299.99,\n} }, { data: {\n  sku: 'SKU-22222',\n  name: 'Standard Part',\n  category: 'Tools',\n  price: 49.99,\n} }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'items add',
        example:
          "bem collections:items add \\\n  --api-key 'My API Key' \\\n  --collection-name product_catalog \\\n  --item '{data: {sku: SKU-11111, name: Deluxe Component, category: Hardware, price: 299.99}}' \\\n  --item '{data: {sku: SKU-22222, name: Standard Part, category: Tools, price: 49.99}}'",
      },
      csharp: {
        method: 'Collections.Items.Add',
        example:
          'ItemAddParams parameters = new()\n{\n    CollectionName = "product_catalog",\n    Items =\n    [\n        new(\n            new Data(\n                JsonSerializer.Deserialize<JsonElement>(\n                    """\n                    {\n                      "sku": "SKU-11111",\n                      "name": "Deluxe Component",\n                      "category": "Hardware",\n                      "price": 299.99\n                    }\n                    """\n                )\n            )\n        ),\n        new(\n            new Data(\n                JsonSerializer.Deserialize<JsonElement>(\n                    """\n                    {\n                      "sku": "SKU-22222",\n                      "name": "Standard Part",\n                      "category": "Tools",\n                      "price": 49.99\n                    }\n                    """\n                )\n            )\n        ),\n    ],\n};\n\nvar response = await client.Collections.Items.Add(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Collections.Items.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Collections.Items.Add(context.TODO(), bem.CollectionItemAddParams{\n\t\tCollectionName: "product_catalog",\n\t\tItems: []bem.CollectionItemAddParamsItem{{\n\t\t\tData: map[string]any{\n\t\t\t\t"sku":      "SKU-11111",\n\t\t\t\t"name":     "Deluxe Component",\n\t\t\t\t"category": "Hardware",\n\t\t\t\t"price":    299.99,\n\t\t\t},\n\t\t}, {\n\t\t\tData: map[string]any{\n\t\t\t\t"sku":      "SKU-22222",\n\t\t\t\t"name":     "Standard Part",\n\t\t\t\t"category": "Tools",\n\t\t\t\t"price":    49.99,\n\t\t\t},\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.EventID)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections/items \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "collectionName": "product_catalog",\n          "items": [\n            {\n              "data": {\n                "sku": "SKU-11111",\n                "name": "Deluxe Component",\n                "category": "Hardware",\n                "price": 299.99\n              }\n            },\n            {\n              "data": {\n                "sku": "SKU-22222",\n                "name": "Standard Part",\n                "category": "Tools",\n                "price": 49.99\n              }\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'collections.items.add',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.collections.items.add(\n    collection_name="product_catalog",\n    items=[{\n        "data": {\n            "sku": "SKU-11111",\n            "name": "Deluxe Component",\n            "category": "Hardware",\n            "price": 299.99,\n        }\n    }, {\n        "data": {\n            "sku": "SKU-22222",\n            "name": "Standard Part",\n            "category": "Tools",\n            "price": 49.99,\n        }\n    }],\n)\nprint(response.event_id)',
      },
      typescript: {
        method: 'client.collections.items.add',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.collections.items.add({\n  collectionName: 'product_catalog',\n  items: [\n    {\n      data: {\n        sku: 'SKU-11111',\n        name: 'Deluxe Component',\n        category: 'Hardware',\n        price: 299.99,\n      },\n    },\n    {\n      data: {\n        sku: 'SKU-22222',\n        name: 'Standard Part',\n        category: 'Tools',\n        price: 49.99,\n      },\n    },\n  ],\n});\n\nconsole.log(response.eventID);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v3/collections/items',
    httpMethod: 'put',
    summary: 'Update existing items in a Collection',
    description: 'Update existing items in a Collection',
    stainlessPath: '(resource) collections.items > (method) update',
    qualified: 'client.collections.items.update',
    params: ['collectionName: string;', 'items: { collectionItemID: string; data: string | object; }[];'],
    response:
      "{ eventID: string; message: string; status: 'pending'; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; updatedCount?: number; }",
    markdown:
      "## update\n\n`client.collections.items.update(collectionName: string, items: { collectionItemID: string; data: string | object; }[]): { eventID: string; message: string; status: 'pending'; items?: object[]; updatedCount?: number; }`\n\n**put** `/v3/collections/items`\n\nUpdate existing items in a Collection\n\n### Parameters\n\n- `collectionName: string`\n  The name/path of the collection. Must use only letters, digits, underscores, and dots.\nEach segment must start with a letter or underscore.\n\n- `items: { collectionItemID: string; data: string | object; }[]`\n  Array of items to update (maximum 100 items per request)\n\n### Returns\n\n- `{ eventID: string; message: string; status: 'pending'; items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]; updatedCount?: number; }`\n  Response after queuing items for async update\n\n  - `eventID: string`\n  - `message: string`\n  - `status: 'pending'`\n  - `items?: { collectionItemID: string; createdAt: string; data: string | object; updatedAt: string; }[]`\n  - `updatedCount?: number`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst item = await client.collections.items.update({ collectionName: 'product_catalog', items: [{ collectionItemID: 'clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP', data: 'SKU-12345: Updated Industrial Widget - Premium Edition' }, {\n  collectionItemID: 'clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ',\n  data: {\n  sku: 'SKU-67890',\n  name: 'Updated Premium Gear',\n  category: 'Hardware',\n  price: 399.99,\n},\n}] });\n\nconsole.log(item);\n```",
    perLanguage: {
      cli: {
        method: 'items update',
        example:
          "bem collections:items update \\\n  --api-key 'My API Key' \\\n  --collection-name product_catalog \\\n  --item \"{collectionItemID: clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP, data: 'SKU-12345: Updated Industrial Widget - Premium Edition'}\" \\\n  --item '{collectionItemID: clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ, data: {sku: SKU-67890, name: Updated Premium Gear, category: Hardware, price: 399.99}}'",
      },
      csharp: {
        method: 'Collections.Items.Update',
        example:
          'ItemUpdateParams parameters = new()\n{\n    CollectionName = "product_catalog",\n    Items =\n    [\n        new()\n        {\n            CollectionItemID = "clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP",\n            Data = "SKU-12345: Updated Industrial Widget - Premium Edition",\n        },\n        new()\n        {\n            CollectionItemID = "clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ",\n            Data = JsonSerializer.Deserialize<JsonElement>(\n                """\n                {\n                  "sku": "SKU-67890",\n                  "name": "Updated Premium Gear",\n                  "category": "Hardware",\n                  "price": 399.99\n                }\n                """\n            ),\n        },\n    ],\n};\n\nvar item = await client.Collections.Items.Update(parameters);\n\nConsole.WriteLine(item);',
      },
      go: {
        method: 'client.Collections.Items.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\titem, err := client.Collections.Items.Update(context.TODO(), bem.CollectionItemUpdateParams{\n\t\tCollectionName: "product_catalog",\n\t\tItems: []bem.CollectionItemUpdateParamsItem{{\n\t\t\tCollectionItemID: "clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP",\n\t\t\tData:             "SKU-12345: Updated Industrial Widget - Premium Edition",\n\t\t}, {\n\t\t\tCollectionItemID: "clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ",\n\t\t\tData: map[string]any{\n\t\t\t\t"sku":      "SKU-67890",\n\t\t\t\t"name":     "Updated Premium Gear",\n\t\t\t\t"category": "Hardware",\n\t\t\t\t"price":    399.99,\n\t\t\t},\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", item.EventID)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/collections/items \\\n    -X PUT \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "collectionName": "product_catalog",\n          "items": [\n            {\n              "collectionItemID": "clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP",\n              "data": "SKU-12345: Updated Industrial Widget - Premium Edition"\n            },\n            {\n              "collectionItemID": "clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ",\n              "data": {\n                "sku": "SKU-67890",\n                "name": "Updated Premium Gear",\n                "category": "Hardware",\n                "price": 399.99\n              }\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'collections.items.update',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nitem = client.collections.items.update(\n    collection_name="product_catalog",\n    items=[{\n        "collection_item_id": "clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP",\n        "data": "SKU-12345: Updated Industrial Widget - Premium Edition",\n    }, {\n        "collection_item_id": "clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ",\n        "data": {\n            "sku": "SKU-67890",\n            "name": "Updated Premium Gear",\n            "category": "Hardware",\n            "price": 399.99,\n        },\n    }],\n)\nprint(item.event_id)',
      },
      typescript: {
        method: 'client.collections.items.update',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst item = await client.collections.items.update({\n  collectionName: 'product_catalog',\n  items: [\n    {\n      collectionItemID: 'clitm_2N6gH8ZKCmvb6BnFcGqhKJ98VzP',\n      data: 'SKU-12345: Updated Industrial Widget - Premium Edition',\n    },\n    {\n      collectionItemID: 'clitm_3M7hI9ALDnwc7CoGdHriLK09WaQ',\n      data: {\n        sku: 'SKU-67890',\n        name: 'Updated Premium Gear',\n        category: 'Hardware',\n        price: 399.99,\n      },\n    },\n  ],\n});\n\nconsole.log(item.eventID);",
      },
    },
  },
  {
    name: 'submit_feedback',
    endpoint: '/v3/events/{eventID}/feedback',
    httpMethod: 'post',
    summary: 'Submit Event Feedback',
    description:
      "**Submit a correction for an event.**\n\nAccepts training corrections for `extract`, `classify`, and `join` events.\nFor extract/join events, `correction` is a JSON object matching the function's\noutput schema. For classify events, `correction` is a JSON string matching\none of the function version's declared classifications.\n\nSubmitting feedback again for the same event overwrites the previous correction.\n\nUnsupported function types (split, enrich) return `400`.",
    stainlessPath: '(resource) events > (method) submit_feedback',
    qualified: 'client.events.submitFeedback',
    params: ['eventID: string;', 'correction: object;', 'orderMatching?: boolean;'],
    response:
      "{ correction: object; createdAt: string; eventID: string; functionType: 'extract' | 'classify' | 'join'; }",
    markdown:
      "## submit_feedback\n\n`client.events.submitFeedback(eventID: string, correction: object, orderMatching?: boolean): { correction: object; createdAt: string; eventID: string; functionType: 'extract' | 'classify' | 'join'; }`\n\n**post** `/v3/events/{eventID}/feedback`\n\n**Submit a correction for an event.**\n\nAccepts training corrections for `extract`, `classify`, and `join` events.\nFor extract/join events, `correction` is a JSON object matching the function's\noutput schema. For classify events, `correction` is a JSON string matching\none of the function version's declared classifications.\n\nSubmitting feedback again for the same event overwrites the previous correction.\n\nUnsupported function types (split, enrich) return `400`.\n\n### Parameters\n\n- `eventID: string`\n\n- `correction: object`\n\n- `orderMatching?: boolean`\n\n### Returns\n\n- `{ correction: object; createdAt: string; eventID: string; functionType: 'extract' | 'classify' | 'join'; }`\n  Echoed response after a correction is recorded.\n\n  - `correction: object`\n  - `createdAt: string`\n  - `eventID: string`\n  - `functionType: 'extract' | 'classify' | 'join'`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.events.submitFeedback('eventID', { correction: {} });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'events submit_feedback',
        example:
          "bem events submit-feedback \\\n  --api-key 'My API Key' \\\n  --event-id eventID \\\n  --correction '{}'",
      },
      csharp: {
        method: 'Events.SubmitFeedback',
        example:
          'EventSubmitFeedbackParams parameters = new()\n{\n    EventID = "eventID",\n    Correction = JsonSerializer.Deserialize<JsonElement>("{}"),\n};\n\nvar response = await client.Events.SubmitFeedback(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Events.SubmitFeedback',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Events.SubmitFeedback(\n\t\tcontext.TODO(),\n\t\t"eventID",\n\t\tbem.EventSubmitFeedbackParams{\n\t\t\tCorrection: map[string]any{},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Correction)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/events/$EVENT_ID/feedback \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "correction": {}\n        }\'',
      },
      python: {
        method: 'events.submit_feedback',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.events.submit_feedback(\n    event_id="eventID",\n    correction={},\n)\nprint(response.correction)',
      },
      typescript: {
        method: 'client.events.submitFeedback',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.events.submitFeedback('eventID', { correction: {} });\n\nconsole.log(response.correction);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v3/webhook-secret',
    httpMethod: 'get',
    summary: 'Get Webhook Secret',
    description:
      '**Get the current webhook signing secret.**\n\nReturns the active secret used to sign outbound webhook deliveries via the `bem-signature`\nheader. Returns 404 if no secret has been generated for this environment yet.\n\nUse the secret to verify incoming webhook payloads:\n1. Parse `bem-signature: t={timestamp},v1={signature}`.\n2. Construct the signed string: `{timestamp}.{raw request body}`.\n3. Compute HMAC-SHA256 of that string using the secret.\n4. Compare the hex digest against `v1`.\n5. Reject requests where the timestamp is more than a few minutes old.',
    stainlessPath: '(resource) webhook_secret > (method) retrieve',
    qualified: 'client.webhookSecret.retrieve',
    response: '{ secret: string; }',
    markdown:
      "## retrieve\n\n`client.webhookSecret.retrieve(): { secret: string; }`\n\n**get** `/v3/webhook-secret`\n\n**Get the current webhook signing secret.**\n\nReturns the active secret used to sign outbound webhook deliveries via the `bem-signature`\nheader. Returns 404 if no secret has been generated for this environment yet.\n\nUse the secret to verify incoming webhook payloads:\n1. Parse `bem-signature: t={timestamp},v1={signature}`.\n2. Construct the signed string: `{timestamp}.{raw request body}`.\n3. Compute HMAC-SHA256 of that string using the secret.\n4. Compare the hex digest against `v1`.\n5. Reject requests where the timestamp is more than a few minutes old.\n\n### Returns\n\n- `{ secret: string; }`\n  Webhook signing secret used to verify `bem-signature` headers on delivered webhooks.\n\n  - `secret: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst webhookSecret = await client.webhookSecret.retrieve();\n\nconsole.log(webhookSecret);\n```",
    perLanguage: {
      cli: {
        method: 'webhook_secret retrieve',
        example: "bem webhook-secret retrieve \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'WebhookSecret.Retrieve',
        example:
          'WebhookSecretRetrieveParams parameters = new();\n\nvar webhookSecret = await client.WebhookSecret.Retrieve(parameters);\n\nConsole.WriteLine(webhookSecret);',
      },
      go: {
        method: 'client.WebhookSecret.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhookSecret, err := client.WebhookSecret.Get(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookSecret.Secret)\n}\n',
      },
      http: {
        example: 'curl https://api.bem.ai/v3/webhook-secret \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'webhook_secret.retrieve',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_secret = client.webhook_secret.retrieve()\nprint(webhook_secret.secret)',
      },
      typescript: {
        method: 'client.webhookSecret.retrieve',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookSecret = await client.webhookSecret.retrieve();\n\nconsole.log(webhookSecret.secret);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/webhook-secret',
    httpMethod: 'post',
    summary: 'Generate Webhook Secret',
    description:
      '**Generate a new webhook signing secret.**\n\nCreates a new signing secret for this environment (or replaces the existing one).\nThe new secret is returned in full exactly once — store it securely.\n\nAfter rotation all newly delivered webhooks will be signed with the new secret.\nUpdate your verification logic before calling this endpoint if you need zero-downtime rotation.',
    stainlessPath: '(resource) webhook_secret > (method) create',
    qualified: 'client.webhookSecret.create',
    response: '{ secret: string; }',
    markdown:
      "## create\n\n`client.webhookSecret.create(): { secret: string; }`\n\n**post** `/v3/webhook-secret`\n\n**Generate a new webhook signing secret.**\n\nCreates a new signing secret for this environment (or replaces the existing one).\nThe new secret is returned in full exactly once — store it securely.\n\nAfter rotation all newly delivered webhooks will be signed with the new secret.\nUpdate your verification logic before calling this endpoint if you need zero-downtime rotation.\n\n### Returns\n\n- `{ secret: string; }`\n  Webhook signing secret used to verify `bem-signature` headers on delivered webhooks.\n\n  - `secret: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst webhookSecret = await client.webhookSecret.create();\n\nconsole.log(webhookSecret);\n```",
    perLanguage: {
      cli: {
        method: 'webhook_secret create',
        example: "bem webhook-secret create \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'WebhookSecret.Create',
        example:
          'WebhookSecretCreateParams parameters = new();\n\nvar webhookSecret = await client.WebhookSecret.Create(parameters);\n\nConsole.WriteLine(webhookSecret);',
      },
      go: {
        method: 'client.WebhookSecret.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhookSecret, err := client.WebhookSecret.New(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookSecret.Secret)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/webhook-secret \\\n    -X POST \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'webhook_secret.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_secret = client.webhook_secret.create()\nprint(webhook_secret.secret)',
      },
      typescript: {
        method: 'client.webhookSecret.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookSecret = await client.webhookSecret.create();\n\nconsole.log(webhookSecret.secret);",
      },
    },
  },
  {
    name: 'revoke',
    endpoint: '/v3/webhook-secret',
    httpMethod: 'delete',
    summary: 'Revoke Webhook Secret',
    description:
      '**Revoke the current webhook signing secret.**\n\nDeletes the active signing secret. Webhook deliveries will continue but will no longer\ninclude a `bem-signature` header until a new secret is generated.',
    stainlessPath: '(resource) webhook_secret > (method) revoke',
    qualified: 'client.webhookSecret.revoke',
    markdown:
      "## revoke\n\n`client.webhookSecret.revoke(): void`\n\n**delete** `/v3/webhook-secret`\n\n**Revoke the current webhook signing secret.**\n\nDeletes the active signing secret. Webhook deliveries will continue but will no longer\ninclude a `bem-signature` header until a new secret is generated.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.webhookSecret.revoke()\n```",
    perLanguage: {
      cli: {
        method: 'webhook_secret revoke',
        example: "bem webhook-secret revoke \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'WebhookSecret.Revoke',
        example:
          'WebhookSecretRevokeParams parameters = new();\n\nawait client.WebhookSecret.Revoke(parameters);',
      },
      go: {
        method: 'client.WebhookSecret.Revoke',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.WebhookSecret.Revoke(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/webhook-secret \\\n    -X DELETE \\\n    -H "x-api-key: $BEM_API_KEY"',
      },
      python: {
        method: 'webhook_secret.revoke',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhook_secret.revoke()',
      },
      typescript: {
        method: 'client.webhookSecret.revoke',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhookSecret.revoke();",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Bem CLI\n\nThe official CLI for the [Bem REST API](docs.bem.ai).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install bem-team/tools/bem\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/bem-team/bem-cli/cmd/bem@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nbem [resource] <command> [flags...]\n~~~\n\n~~~sh\nbem functions create \\\n  --api-key 'My API Key' \\\n  --function-name functionName \\\n  --type extract\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Description                                  | Required |\n| -------------------- | -------------------------------------------- | -------- |\n| `BEM_API_KEY`        | Authenticate using API Key in request header | yes      |\n\n### Global flags\n\n- `--api-key` - Authenticate using API Key in request header (can also be set with `BEM_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nbem <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nbem <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nbem <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nbem <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nbem <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Bem Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/bem-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../bem-go`.\n",
  },
  {
    language: 'csharp',
    content:
      '# Bem C# API Library\n\nThe Bem C# SDK provides convenient access to the [Bem REST API](docs.bem.ai) from applications written in   C#.\n\n## Installation\n\nInstall the package from [NuGet](https://www.nuget.org/packages/Bem):\n\n```bash\ndotnet add package Bem\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nBemClient client = new();\n\nFunctionCreateParams parameters = new()\n{\n    CreateFunction = new Extract("functionName")\n};\n\nvar functionResponse = await client.Functions.Create(parameters);\n\nConsole.WriteLine(functionResponse);\n```',
  },
  {
    language: 'go',
    content:
      '# Bem Go API Library\n\n<a href="https://pkg.go.dev/github.com/bem-team/bem-go-sdk"><img src="https://pkg.go.dev/badge/github.com/bem-team/bem-go-sdk.svg" alt="Go Reference"></a>\n\nThe Bem Go library provides convenient access to the [Bem REST API](docs.bem.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/bem-team/bem-go-sdk" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/bem-team/bem-go-sdk@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("BEM_API_KEY")\n\t)\n\tfunctionResponse, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Functions.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/bem-team/bem-go-sdk/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Functions.ListAutoPaging(context.TODO(), bem.FunctionListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tfunction := iter.Current()\n\tfmt.Printf("%+v\\n", function)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Functions.List(context.TODO(), bem.FunctionListParams{})\nfor page != nil {\n\tfor _, function := range page.Functions {\n\t\tfmt.Printf("%+v\\n", function)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\tFunctionName: "functionName",\n\t\t},\n\t},\n})\nif err != nil {\n\tvar apierr *bem.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v3/functions": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Functions.New(\n\tctx,\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := bem.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Functions.New(\n\tcontext.TODO(),\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nfunctionResponse, err := client.Functions.New(\n\tcontext.TODO(),\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfExtract: &bem.CreateFunctionExtractParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", functionResponse)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-go-sdk/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Bem Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/bem-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/bem-sdk/)\n\nThe Bem Python library provides convenient access to the Bem REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install bem-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\n\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="extract",\n)\nprint(function_response.function)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `BEM_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncBem` instead of `Bem` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom bem import AsyncBem\n\nclient = AsyncBem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  function_response = await client.functions.create(\n      function_name="functionName",\n      type="extract",\n  )\n  print(function_response.function)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install bem-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom bem import DefaultAioHttpClient\nfrom bem import AsyncBem\n\nasync def main() -> None:\n  async with AsyncBem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    function_response = await client.functions.create(\n        function_name="functionName",\n        type="extract",\n    )\n    print(function_response.function)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Bem API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom bem import Bem\n\nclient = Bem()\n\nall_functions = []\n# Automatically fetches more pages as needed.\nfor function in client.functions.list():\n    # Do something with function here\n    all_functions.append(function)\nprint(all_functions)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom bem import AsyncBem\n\nclient = AsyncBem()\n\nasync def main() -> None:\n    all_functions = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for function in client.functions.list():\n        all_functions.append(function)\n    print(all_functions)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.functions.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.functions)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.functions.list()\n\nprint(f"next page cursor: {first_page.starting_after}") # => "next page cursor: ..."\nfor function in first_page.functions:\n    print(function)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom bem import Bem\n\nclient = Bem()\n\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="split",\n    print_page_split_config={},\n)\nprint(function_response.print_page_split_config)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `bem.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `bem.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `bem.APIError`.\n\n```python\nimport bem\nfrom bem import Bem\n\nclient = Bem()\n\ntry:\n    client.functions.create(\n        function_name="functionName",\n        type="extract",\n    )\nexcept bem.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept bem.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept bem.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom bem import Bem\n\n# Configure the default for all requests:\nclient = Bem(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).functions.create(\n    function_name="functionName",\n    type="extract",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom bem import Bem\n\n# Configure the default for all requests:\nclient = Bem(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Bem(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).functions.create(\n    function_name="functionName",\n    type="extract",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `BEM_LOG` to `info`.\n\n```shell\n$ export BEM_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom bem import Bem\n\nclient = Bem()\nresponse = client.functions.with_raw_response.create(\n    function_name="functionName",\n    type="extract",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nfunction = response.parse()  # get the object that `functions.create()` would have returned\nprint(function.function)\n```\n\nThese methods return an [`APIResponse`](https://github.com/bem-team/bem-python-sdk/tree/main/src/bem/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/bem-team/bem-python-sdk/tree/main/src/bem/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.functions.with_streaming_response.create(\n    function_name="functionName",\n    type="extract",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom bem import Bem, DefaultHttpxClient\n\nclient = Bem(\n    # Or use the `BEM_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom bem import Bem\n\nwith Bem() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-python-sdk/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport bem\nprint(bem.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'terraform',
    content:
      '# Bem Terraform Provider\n\nThe [Bem Terraform provider](https://registry.terraform.io/providers/bem-team/bem/latest/docs) provides convenient access to\nthe [Bem REST API](docs.bem.ai) from Terraform.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## Requirements\n\nThis provider requires Terraform CLI 1.0 or later. You can [install it for your system](https://developer.hashicorp.com/terraform/install)\non Hashicorp\'s website.\n\n## Usage\n\nAdd the following to your `main.tf` file:\n\n<!-- x-release-please-start-version -->\n\n```hcl\n# Declare the provider and version\nterraform {\n  required_providers {\n    SDK_ProviderTypeName = {\n      source  = "bem-team/bem"\n      version = "~> 0.0.1"\n    }\n  }\n}\n\n# Initialize the provider\nprovider "bem" {\n  # Authenticate using API Key in request header\n  api_key = "My API Key" # or set BEM_API_KEY env variable\n}\n\n# Configure a resource\nresource "bem_function" "example_function" {\n  path_function_name = "functionName"\n  type = "extract"\n  display_name = "displayName"\n  enable_bounding_boxes = true\n  output_schema = {\n\n  }\n  output_schema_name = "outputSchemaName"\n  pre_count = true\n  tabular_chunking_enabled = true\n  tags = ["string"]\n}\n```\n\n<!-- x-release-please-end -->\n\nInitialize your project by running `terraform init` in the directory.\n\nAdditional examples can be found in the [./examples](./examples) folder within this repository, and you can\nrefer to the full documentation on [the Terraform Registry](https://registry.terraform.io/providers/bem-team/bem/latest/docs).\n\n### Provider Options\nWhen you initialize the provider, the following options are supported. It is recommended to use environment variables for sensitive values like access tokens.\nIf an environment variable is provided, then the option does not need to be set in the terraform source.\n\n| Property | Environment variable | Required | Default value |\n| -------- | -------------------- | -------- | ------------- |\n| api_key  | `BEM_API_KEY`        | true     | —             |\n\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/terraform-provider-bem/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Bem TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/bem-ai-sdk.svg?label=npm%20(stable))](https://npmjs.org/package/bem-ai-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/bem-ai-sdk)\n\nThis library provides convenient access to the Bem REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install bem-ai-sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.create({\n  functionName: 'functionName',\n  type: 'extract',\n});\n\nconsole.log(functionResponse['function']);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Bem.FunctionCreateParams = { functionName: 'functionName', type: 'extract' };\nconst functionResponse: Bem.FunctionResponse = await client.functions.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst functionResponse = await client.functions\n  .create({ functionName: 'functionName', type: 'extract' })\n  .catch(async (err) => {\n    if (err instanceof Bem.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Bem({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.functions.create({ functionName: 'functionName', type: 'extract' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Bem({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.functions.create({ functionName: 'functionName', type: 'extract' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Bem API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllFunctions(params) {\n  const allFunctions = [];\n  // Automatically fetches more pages as needed.\n  for await (const _function of client.functions.list()) {\n    allFunctions.push(_function);\n  }\n  return allFunctions;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.functions.list();\nfor (const _function of page.functions) {\n  console.log(_function);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Bem();\n\nconst response = await client.functions\n  .create({ functionName: 'functionName', type: 'extract' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: functionResponse, response: raw } = await client.functions\n  .create({ functionName: 'functionName', type: 'extract' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(functionResponse['function']);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `BEM_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Bem({\n  logger: logger.child({ name: 'Bem' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.functions.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Bem({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Bem({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Bem from 'npm:bem-ai-sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Bem({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-typescript-sdk/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
