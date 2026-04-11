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
    description: 'Create a Function',
    stainlessPath: '(resource) functions > (method) create',
    qualified: 'client.functions.create',
    params: [
      "create_function: { functionName: string; type: 'transform'; displayName?: string; outputSchema?: object; outputSchemaName?: string; tabularChunkingEnabled?: boolean; tags?: string[]; } | { functionName: string; type: 'analyze'; displayName?: string; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { functionName: string; type: 'route'; description?: string; displayName?: string; routes?: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; tags?: string[]; } | { functionName: string; type: 'send'; destinationType?: 'webhook' | 's3' | 'google_drive'; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionName: string; type: 'split'; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; nextFunctionName?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; splitType?: 'print_page' | 'semantic_page'; tags?: string[]; } | { functionName: string; type: 'join'; description?: string; displayName?: string; joinType?: 'standard'; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { functionName: string; type: 'payload_shaping'; displayName?: string; shapingSchema?: string; tags?: string[]; } | { functionName: string; type: 'enrich'; config?: { steps: enrich_step[]; }; displayName?: string; tags?: string[]; };",
    ],
    response: '{ function: object | object | object | object | object | object | object | object; }',
    perLanguage: {
      csharp: {
        method: 'Functions.Create',
        example:
          'FunctionCreateParams parameters = new()\n{\n    CreateFunction = new Transform()\n    {\n        FunctionName = "functionName",\n        DisplayName = "displayName",\n        OutputSchema = JsonSerializer.Deserialize<JsonElement>("{}"),\n        OutputSchemaName = "outputSchemaName",\n        TabularChunkingEnabled = true,\n        Tags =\n        [\n            "string"\n        ],\n    },\n};\n\nvar functionResponse = await client.Functions.Create(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "functionName": "functionName",\n          "type": "transform"\n        }\'',
      },
      python: {
        method: 'functions.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="transform",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.create({\n  functionName: 'functionName',\n  type: 'transform',\n});\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/functions',
    httpMethod: 'get',
    summary: 'List Functions',
    description: 'List Functions',
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
      "types?: 'transform' | 'route' | 'send' | 'split' | 'join' | 'analyze' | 'payload_shaping' | 'enrich'[];",
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response: 'object | object | object | object | object | object | object | object',
    markdown:
      "## list\n\n`client.functions.list(displayName?: string, endingBefore?: string, functionIDs?: string[], functionNames?: string[], limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: string, tags?: string[], types?: 'transform' | 'route' | 'send' | 'split' | 'join' | 'analyze' | 'payload_shaping' | 'enrich'[], workflowIDs?: string[], workflowNames?: string[]): { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: route_list_item[]; type: 'route'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }`\n\n**get** `/v3/functions`\n\nList Functions\n\n### Parameters\n\n- `displayName?: string`\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `tags?: string[]`\n\n- `types?: 'transform' | 'route' | 'send' | 'split' | 'join' | 'analyze' | 'payload_shaping' | 'enrich'[]`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; type: 'route'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n  A function that delivers workflow outputs to an external destination.\nSend functions receive the output of an upstream workflow node and forward it\nto a webhook, S3 bucket, or Google Drive folder.\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const _function of client.functions.list()) {\n  console.log(_function);\n}\n```",
    perLanguage: {
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
    description: 'Delete a Function',
    stainlessPath: '(resource) functions > (method) delete',
    qualified: 'client.functions.delete',
    params: ['functionName: string;'],
    markdown:
      "## delete\n\n`client.functions.delete(functionName: string): void`\n\n**delete** `/v3/functions/{functionName}`\n\nDelete a Function\n\n### Parameters\n\n- `functionName: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.functions.delete('functionName')\n```",
    perLanguage: {
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
    description: 'Get a Function',
    stainlessPath: '(resource) functions > (method) retrieve',
    qualified: 'client.functions.retrieve',
    params: ['functionName: string;'],
    response: '{ function: object | object | object | object | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.functions.retrieve(functionName: string): { function: function; }`\n\n**get** `/v3/functions/{functionName}`\n\nGet a Function\n\n### Parameters\n\n- `functionName: string`\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: route_list_item[]; type: 'route'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function response wrapper used by V3 function endpoints.\nV3 wraps individual function responses in a `{\"function\": ...}` envelope\nfor consistency with other V3 resource endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; type: 'route'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst functionResponse = await client.functions.retrieve('functionName');\n\nconsole.log(functionResponse);\n```",
    perLanguage: {
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
    description: 'Update a Function',
    stainlessPath: '(resource) functions > (method) update',
    qualified: 'client.functions.update',
    params: [
      'functionName: string;',
      "update_function: { type: 'transform'; displayName?: string; functionName?: string; outputSchema?: object; outputSchemaName?: string; tabularChunkingEnabled?: boolean; tags?: string[]; } | { type: 'analyze'; displayName?: string; functionName?: string; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { type: 'route'; description?: string; displayName?: string; functionName?: string; routes?: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; tags?: string[]; } | { type: 'send'; destinationType?: 'webhook' | 's3' | 'google_drive'; displayName?: string; functionName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { type: 'split'; displayName?: string; functionName?: string; printPageSplitConfig?: { nextFunctionID?: string; nextFunctionName?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; splitType?: 'print_page' | 'semantic_page'; tags?: string[]; } | { type: 'join'; description?: string; displayName?: string; functionName?: string; joinType?: 'standard'; outputSchema?: object; outputSchemaName?: string; tags?: string[]; } | { type: 'payload_shaping'; displayName?: string; functionName?: string; shapingSchema?: string; tags?: string[]; } | { type: 'enrich'; config?: { steps: enrich_step[]; }; };",
    ],
    response: '{ function: object | object | object | object | object | object | object | object; }',
    perLanguage: {
      csharp: {
        method: 'Functions.Update',
        example:
          'FunctionUpdateParams parameters = new()\n{\n    PathFunctionName = "functionName",\n    UpdateFunction = new Transform()\n    {\n        DisplayName = "displayName",\n        FunctionName = "functionName",\n        OutputSchema = JsonSerializer.Deserialize<JsonElement>("{}"),\n        OutputSchemaName = "outputSchemaName",\n        TabularChunkingEnabled = true,\n        Tags =\n        [\n            "string"\n        ],\n    },\n};\n\nvar functionResponse = await client.Functions.Update(parameters);\n\nConsole.WriteLine(functionResponse);',
      },
      go: {
        method: 'client.Functions.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfunctionResponse, err := client.Functions.Update(\n\t\tcontext.TODO(),\n\t\t"functionName",\n\t\tbem.FunctionUpdateParams{\n\t\t\tUpdateFunction: bem.UpdateFunctionUnionParam{\n\t\t\t\tOfTransform: &bem.UpdateFunctionTransformParam{},\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/functions/$PATH_FUNCTION_NAME \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "type": "transform"\n        }\'',
      },
      python: {
        method: 'functions.update',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nfunction_response = client.functions.update(\n    path_function_name="functionName",\n    type="transform",\n)\nprint(function_response.function)',
      },
      typescript: {
        method: 'client.functions.update',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.update('functionName', { type: 'transform' });\n\nconsole.log(functionResponse['function']);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/functions/copy',
    httpMethod: 'post',
    summary: 'Copy a Function',
    description: 'Copy a Function',
    stainlessPath: '(resource) functions.copy > (method) create',
    qualified: 'client.functions.copy.create',
    params: [
      'sourceFunctionName: string;',
      'targetFunctionName: string;',
      'tags?: string[];',
      'targetDisplayName?: string;',
      'targetEnvironment?: string;',
    ],
    response: '{ function: object | object | object | object | object | object | object | object; }',
    markdown:
      "## create\n\n`client.functions.copy.create(sourceFunctionName: string, targetFunctionName: string, tags?: string[], targetDisplayName?: string, targetEnvironment?: string): { function: function; }`\n\n**post** `/v3/functions/copy`\n\nCopy a Function\n\n### Parameters\n\n- `sourceFunctionName: string`\n  Name of the function to copy from. Must be a valid existing function name.\n\n- `targetFunctionName: string`\n  Name for the new copied function. Must be unique within the target environment.\n\n- `tags?: string[]`\n  Optional array of tags for the copied function. If not provided, defaults to the source function's tags.\n\n- `targetDisplayName?: string`\n  Optional display name for the copied function. If not provided, defaults to the source function's display name with \" (Copy)\" appended.\n\n- `targetEnvironment?: string`\n  Optional environment name to copy the function to. If not provided, the function will be copied within the same environment.\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: route_list_item[]; type: 'route'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function response wrapper used by V3 function endpoints.\nV3 wraps individual function responses in a `{\"function\": ...}` envelope\nfor consistency with other V3 resource endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; type: 'route'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst functionResponse = await client.functions.copy.create({ sourceFunctionName: 'sourceFunctionName', targetFunctionName: 'targetFunctionName' });\n\nconsole.log(functionResponse);\n```",
    perLanguage: {
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
    description: 'List Function Versions',
    stainlessPath: '(resource) functions.versions > (method) list',
    qualified: 'client.functions.versions.list',
    params: ['functionName: string;'],
    response:
      '{ totalCount?: number; versions?: object | object | object | object | object | object | object | object[]; }',
    markdown:
      "## list\n\n`client.functions.versions.list(functionName: string): { totalCount?: number; versions?: function_version[]; }`\n\n**get** `/v3/functions/{functionName}/versions`\n\nList Function Versions\n\n### Parameters\n\n- `functionName: string`\n\n### Returns\n\n- `{ totalCount?: number; versions?: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: route_list_item[]; type: 'route'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }[]; }`\n\n  - `totalCount?: number`\n  - `versions?: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; type: 'route'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst listFunctionVersionsResponse = await client.functions.versions.list('functionName');\n\nconsole.log(listFunctionVersionsResponse);\n```",
    perLanguage: {
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
    description: 'Get a Function Version',
    stainlessPath: '(resource) functions.versions > (method) retrieve',
    qualified: 'client.functions.versions.retrieve',
    params: ['functionName: string;', 'versionNum: number;'],
    response: '{ function: object | object | object | object | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.functions.versions.retrieve(functionName: string, versionNum: number): { function: function_version; }`\n\n**get** `/v3/functions/{functionName}/versions/{versionNum}`\n\nGet a Function Version\n\n### Parameters\n\n- `functionName: string`\n\n- `versionNum: number`\n\n### Returns\n\n- `{ function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: route_list_item[]; type: 'route'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; printPageSplitConfig?: object; semanticPageSplitConfig?: object; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { config: enrich_config; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: function_audit; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: workflow_usage_info[]; }; }`\n  Single-function-version response wrapper used by V3 endpoints.\n\n  - `function: { emailAddress: string; functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; tabularChunkingEnabled: boolean; type: 'transform'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; outputSchema: object; outputSchemaName: string; type: 'analyze'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; emailAddress: string; functionID: string; functionName: string; routes: { name: string; description?: string; functionID?: string; functionName?: string; isErrorFallback?: boolean; origin?: object; regex?: object; }[]; type: 'route'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { destinationType: 'webhook' | 's3' | 'google_drive'; functionID: string; functionName: string; type: 'send'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; googleDriveFolderId?: string; s3Bucket?: string; s3Prefix?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; webhookSigningEnabled?: boolean; webhookUrl?: string; } | { functionID: string; functionName: string; splitType: 'print_page' | 'semantic_page'; type: 'split'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; printPageSplitConfig?: { nextFunctionID?: string; }; semanticPageSplitConfig?: { itemClasses?: object[]; }; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { description: string; functionID: string; functionName: string; joinType: 'standard'; outputSchema: object; outputSchemaName: string; type: 'join'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { config: { steps: enrich_step[]; }; functionID: string; functionName: string; type: 'enrich'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; } | { functionID: string; functionName: string; shapingSchema: string; type: 'payload_shaping'; versionNum: number; audit?: { functionCreatedBy?: user_action_summary; functionLastUpdatedBy?: user_action_summary; versionCreatedBy?: user_action_summary; }; createdAt?: string; displayName?: string; tags?: string[]; usedInWorkflows?: { currentVersionNum: number; usedInWorkflowVersionNums: number[]; workflowID: string; workflowName: string; }[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst version = await client.functions.versions.retrieve(0, { functionName: 'functionName' });\n\nconsole.log(version);\n```",
    perLanguage: {
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
      "{ callID: string; createdAt: string; errors: object[]; outputs: object | object | object | object | error_event | object | object | object | object[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: object; singleFile?: object; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }",
    markdown:
      "## list\n\n`client.calls.list(callIDs?: string[], endingBefore?: string, limit?: number, referenceIDs?: string[], referenceIDSubstring?: string, sortOrder?: 'asc' | 'desc', startingAfter?: string, statuses?: 'pending' | 'running' | 'completed' | 'failed'[], workflowIDs?: string[], workflowNames?: string[]): { callID: string; createdAt: string; errors: error_event[]; outputs: event[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n**get** `/v3/calls`\n\n**List workflow calls with filtering and pagination.**\n\nReturns calls created via `POST /v3/workflows/{workflowName}/call`.\n\n## Filtering\n\n- `callIDs`: Specific call identifiers\n- `referenceIDs`: Your custom reference IDs\n- `workflowIDs` / `workflowNames`: Filter by workflow\n\n## Pagination\n\nUse `startingAfter` and `endingBefore` cursors with a default limit of 50.\n\n### Parameters\n\n- `callIDs?: string[]`\n\n- `endingBefore?: string`\n\n- `limit?: number`\n\n- `referenceIDs?: string[]`\n\n- `referenceIDSubstring?: string`\n  Case-insensitive substring match against `callReferenceID`.\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `statuses?: 'pending' | 'running' | 'completed' | 'failed'[]`\n  Filter by one or more statuses.\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  A workflow call returned by the V3 API.\n\nCompared to the V2 `Call` model:\n- Terminal outputs are split into `outputs` (non-error events) and `errors` (error events)\n- `callType` and function-scoped fields are removed — V3 calls are always workflow calls\n- The deprecated `functionCalls` field is removed (use `GET /v3/calls/{callID}/trace`)\n- `url` and `traceUrl` hint fields are included for resource discovery\n\n  - `callID: string`\n  - `createdAt: string`\n  - `errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]`\n  - `outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]`\n  - `traceUrl: string`\n  - `url: string`\n  - `callReferenceID?: string`\n  - `finishedAt?: string`\n  - `input?: { batchFiles?: { inputs?: { inputType?: string; itemReferenceID?: string; s3URL?: string; }[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }`\n  - `status?: 'pending' | 'running' | 'completed' | 'failed'`\n  - `workflowID?: string`\n  - `workflowName?: string`\n  - `workflowVersionNum?: number`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const call of client.calls.list()) {\n  console.log(call);\n}\n```",
    perLanguage: {
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
      "{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: event[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }",
    markdown:
      "## retrieve\n\n`client.calls.retrieve(callID: string): { call?: call; error?: string; }`\n\n**get** `/v3/calls/{callID}`\n\n**Retrieve a workflow call by ID.**\n\nReturns the full call object including status, workflow details, terminal outputs,\nand terminal errors. `outputs` and `errors` are both populated once the call finishes —\nthey are not mutually exclusive (a partially-completed workflow may have both).\n\n## Status\n\n| Status | Description |\n|--------|-------------|\n| `pending` | Queued, not yet started |\n| `running` | Currently executing |\n| `completed` | All enclosed function calls finished without errors |\n| `failed` | One or more enclosed function calls produced an error event |\n\nPoll this endpoint or configure a webhook subscription to detect completion.\n\n### Parameters\n\n- `callID: string`\n\n### Returns\n\n- `{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: event[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }`\n\n  - `call?: { callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst callGetResponse = await client.calls.retrieve('callID');\n\nconsole.log(callGetResponse);\n```",
    perLanguage: {
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
      'functionIDs?: string[];',
      'functionNames?: string[];',
      'includeIntermediate?: boolean;',
      'limit?: number;',
      'referenceIDs?: string[];',
      'referenceIDSubstring?: string;',
      "sortOrder?: 'asc' | 'desc';",
      'startingAfter?: string;',
      'workflowIDs?: string[];',
      'workflowNames?: string[];',
    ],
    response: 'object | object | object | object | error_event | object | object | object | object',
    markdown:
      "## list\n\n`client.outputs.list(callIDs?: string[], endingBefore?: string, functionIDs?: string[], functionNames?: string[], includeIntermediate?: boolean, limit?: number, referenceIDs?: string[], referenceIDSubstring?: string, sortOrder?: 'asc' | 'desc', startingAfter?: string, workflowIDs?: string[], workflowNames?: string[]): { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n**get** `/v3/outputs`\n\n**List terminal non-error output events.**\n\nReturns events that represent successful terminal outputs — primary events\n(non-split-collection) that did not trigger any downstream function calls.\nError events are excluded; use `GET /v3/errors` to retrieve those.\n\n## Intermediate Events\n\nBy default, intermediate events (those that spawned a downstream function call in a\nmulti-step workflow) are excluded. Pass `includeIntermediate=true` to include them.\n\n## Filtering\n\nFilter by call, workflow, function, or reference ID. Multiple filters are ANDed together.\n\n### Parameters\n\n- `callIDs?: string[]`\n  Filter to outputs from specific calls.\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `includeIntermediate?: boolean`\n  When `true`, includes intermediate events (those that spawned a downstream function call).\nDefault: `false`.\n\n- `limit?: number`\n\n- `referenceIDs?: string[]`\n\n- `referenceIDSubstring?: string`\n  Case-insensitive substring match against `referenceID`.\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const event of client.outputs.list()) {\n  console.log(event);\n}\n```",
    perLanguage: {
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
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const event of client.outputs.list()) {\n  console.log(event);\n}",
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
      '{ output: object | object | object | object | error_event | object | object | object | object; }',
    markdown:
      "## retrieve\n\n`client.outputs.retrieve(eventID: string): { output: event; }`\n\n**get** `/v3/outputs/{eventID}`\n\n**Retrieve a single output event by ID.**\n\nFetches any non-error event by its `eventID`. Returns `404` if the event does not exist\nor if it is an error event (use `GET /v3/errors/{eventID}` for those).\n\n### Parameters\n\n- `eventID: string`\n\n### Returns\n\n- `{ output: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; }`\n\n  - `output: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: { output?: object | object[] | string | number | boolean[]; } | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; inputs?: { inputContent?: string; inputType?: string; jsonInputContent?: object; s3URL?: string; }[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: { durationFunctionToEventSeconds?: number; }; metrics?: { differences?: { category?: string; correctedVal?: object; extractedVal?: object; jsonPointer?: string; }[]; metrics?: { accuracy?: number; f1Score?: number; precision?: number; recall?: number; }; }; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: { itemCount?: number; items?: { itemOffset?: number; itemReferenceID?: string; s3URL?: string; }[]; }; referenceID: string; semanticPageOutput: { itemCount?: number; items?: { itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemOffset?: number; itemReferenceID?: string; pageEnd?: number; pageStart?: number; s3URL?: string; }[]; pageCount?: number; }; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; printPageOutput?: { collectionReferenceID?: string; itemCount?: number; itemOffset?: number; s3URL?: string; }; semanticPageOutput?: { collectionReferenceID?: string; itemClass?: string; itemClassCount?: number; itemClassOffset?: number; itemCount?: number; itemOffset?: number; pageCount?: number; pageEnd?: number; pageStart?: number; s3URL?: string; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: object; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: { itemCount: number; itemOffset: number; itemReferenceID: string; s3URL?: string; }[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: { fileName: string; folderID: string; }; inboundEmail?: { from: string; subject: string; to: string; deliveredTo?: string; }; metadata?: { durationFunctionToEventSeconds?: number; }; s3Output?: { bucketName: string; key: string; }; webhookOutput?: { httpResponseBody: string; httpStatusCode: number; }; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst output = await client.outputs.retrieve('eventID');\n\nconsole.log(output);\n```",
    perLanguage: {
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
    description: 'List Workflows',
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
      '{ id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }',
    markdown:
      "## list\n\n`client.workflows.list(displayName?: string, endingBefore?: string, functionIDs?: string[], functionNames?: string[], limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: string, tags?: string[], workflowIDs?: string[], workflowNames?: string[]): { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n**get** `/v3/workflows`\n\nList Workflows\n\n### Parameters\n\n- `displayName?: string`\n\n- `endingBefore?: string`\n\n- `functionIDs?: string[]`\n\n- `functionNames?: string[]`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: string`\n\n- `tags?: string[]`\n\n- `workflowIDs?: string[]`\n\n- `workflowNames?: string[]`\n\n### Returns\n\n- `{ id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n  V3 read representation of a workflow version.\n\n  - `id: string`\n  - `createdAt: string`\n  - `edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]`\n  - `mainNodeName: string`\n  - `name: string`\n  - `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name: string; }[]`\n  - `updatedAt: string`\n  - `versionNum: number`\n  - `audit?: { versionCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowLastUpdatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; }`\n  - `displayName?: string`\n  - `emailAddress?: string`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.list()) {\n  console.log(workflow);\n}\n```",
    perLanguage: {
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
    description: 'Create a Workflow',
    stainlessPath: '(resource) workflows > (method) create',
    qualified: 'client.workflows.create',
    params: [
      'mainNodeName: string;',
      'name: string;',
      'nodes: { function: { id?: string; name?: string; versionNum?: number; }; name?: string; }[];',
      'displayName?: string;',
      'edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[];',
      'tags?: string[];',
    ],
    response:
      '{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## create\n\n`client.workflows.create(mainNodeName: string, name: string, nodes: { function: object; name?: string; }[], displayName?: string, edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[], tags?: string[]): { error?: string; workflow?: workflow; }`\n\n**post** `/v3/workflows`\n\nCreate a Workflow\n\n### Parameters\n\n- `mainNodeName: string`\n  Name of the entry-point node. Must not be a destination of any edge.\n\n- `name: string`\n  Unique name for the workflow. Must match `^[a-zA-Z0-9_-]{1,128}$`.\n\n- `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name?: string; }[]`\n  Call-site nodes in the DAG. At least one is required.\n\n- `displayName?: string`\n  Human-readable display name.\n\n- `edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]`\n  Directed edges between nodes. Omit or leave empty for single-node workflows.\n\n- `tags?: string[]`\n  Tags to categorize and organize the workflow.\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.create({\n  mainNodeName: 'mainNodeName',\n  name: 'name',\n  nodes: [{ function: {} }],\n});\n\nconsole.log(workflow);\n```",
    perLanguage: {
      csharp: {
        method: 'Workflows.Create',
        example:
          'WorkflowCreateParams parameters = new()\n{\n    MainNodeName = "mainNodeName",\n    Name = "name",\n    Nodes =\n    [\n        new()\n        {\n            Function = new()\n            {\n                ID = "id",\n                Name = "name",\n                VersionNum = 0,\n            },\n            Name = "name",\n        },\n    ],\n};\n\nvar workflow = await client.Workflows.Create(parameters);\n\nConsole.WriteLine(workflow);',
      },
      go: {
        method: 'client.Workflows.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.New(context.TODO(), bem.WorkflowNewParams{\n\t\tMainNodeName: "mainNodeName",\n\t\tName:         "name",\n\t\tNodes: []bem.WorkflowNewParamsNode{{\n\t\t\tFunction: bem.FunctionVersionIdentifierParam{},\n\t\t}},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.Error)\n}\n',
      },
      http: {
        example:
          'curl https://api.bem.ai/v3/workflows \\\n    -H \'Content-Type: application/json\' \\\n    -H "x-api-key: $BEM_API_KEY" \\\n    -d \'{\n          "mainNodeName": "mainNodeName",\n          "name": "name",\n          "nodes": [\n            {\n              "function": {}\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'workflows.create',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.create(\n    main_node_name="mainNodeName",\n    name="name",\n    nodes=[{\n        "function": {}\n    }],\n)\nprint(workflow.error)',
      },
      typescript: {
        method: 'client.workflows.create',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.create({\n  mainNodeName: 'mainNodeName',\n  name: 'name',\n  nodes: [{ function: {} }],\n});\n\nconsole.log(workflow.error);",
      },
    },
  },
  {
    name: 'copy',
    endpoint: '/v3/workflows/copy',
    httpMethod: 'post',
    summary: 'Copy a Workflow',
    description: 'Copy a Workflow',
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
      '{ copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]; environment?: string; error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## copy\n\n`client.workflows.copy(sourceWorkflowName: string, targetWorkflowName: string, sourceWorkflowVersionNum?: number, tags?: string[], targetDisplayName?: string, targetEnvironment?: string): { copiedFunctions?: object[]; environment?: string; error?: string; workflow?: workflow; }`\n\n**post** `/v3/workflows/copy`\n\nCopy a Workflow\n\n### Parameters\n\n- `sourceWorkflowName: string`\n  Name of the source workflow to copy from.\n\n- `targetWorkflowName: string`\n  Name for the new copied workflow. Must be unique within the target environment.\n\n- `sourceWorkflowVersionNum?: number`\n  Optional version number of the source workflow to copy. If not provided, copies the current version.\n\n- `tags?: string[]`\n  Optional tags for the copied workflow. If not provided, uses the source workflow's tags.\n\n- `targetDisplayName?: string`\n  Optional display name for the copied workflow. If not provided, uses the source workflow's display name with \" (Copy)\" appended.\n\n- `targetEnvironment?: string`\n  Optional target environment name. If provided, copies the workflow to a different environment. When copying to a different environment, all functions used in the workflow will also be copied.\n\n### Returns\n\n- `{ copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]; environment?: string; error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `copiedFunctions?: { sourceFunctionID: string; sourceFunctionName: string; sourceVersionNum: number; targetFunctionID: string; targetFunctionName: string; targetVersionNum: number; }[]`\n  - `environment?: string`\n  - `error?: string`\n  - `workflow?: { id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst response = await client.workflows.copy({ sourceWorkflowName: 'sourceWorkflowName', targetWorkflowName: 'targetWorkflowName' });\n\nconsole.log(response);\n```",
    perLanguage: {
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
    description: 'Delete a Workflow',
    stainlessPath: '(resource) workflows > (method) delete',
    qualified: 'client.workflows.delete',
    params: ['workflowName: string;'],
    markdown:
      "## delete\n\n`client.workflows.delete(workflowName: string): void`\n\n**delete** `/v3/workflows/{workflowName}`\n\nDelete a Workflow\n\n### Parameters\n\n- `workflowName: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nawait client.workflows.delete('workflowName')\n```",
    perLanguage: {
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
    description: 'Get a Workflow',
    stainlessPath: '(resource) workflows > (method) retrieve',
    qualified: 'client.workflows.retrieve',
    params: ['workflowName: string;'],
    response:
      '{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## retrieve\n\n`client.workflows.retrieve(workflowName: string): { error?: string; workflow?: workflow; }`\n\n**get** `/v3/workflows/{workflowName}`\n\nGet a Workflow\n\n### Parameters\n\n- `workflowName: string`\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.retrieve('workflowName');\n\nconsole.log(workflow);\n```",
    perLanguage: {
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
    description: 'Update a Workflow',
    stainlessPath: '(resource) workflows > (method) update',
    qualified: 'client.workflows.update',
    params: [
      'workflowName: string;',
      'displayName?: string;',
      'edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[];',
      'mainNodeName?: string;',
      'name?: string;',
      'nodes?: { function: { id?: string; name?: string; versionNum?: number; }; name?: string; }[];',
      'tags?: string[];',
    ],
    response:
      '{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## update\n\n`client.workflows.update(workflowName: string, displayName?: string, edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[], mainNodeName?: string, name?: string, nodes?: { function: object; name?: string; }[], tags?: string[]): { error?: string; workflow?: workflow; }`\n\n**patch** `/v3/workflows/{workflowName}`\n\nUpdate a Workflow\n\n### Parameters\n\n- `workflowName: string`\n\n- `displayName?: string`\n  Human-readable display name.\n\n- `edges?: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]`\n\n- `mainNodeName?: string`\n  `mainNodeName`, `nodes`, and `edges` must be provided together to update the DAG\ntopology. If none are provided the topology is copied unchanged from the current\nversion.\n\n- `name?: string`\n  New name for the workflow (renames it). Must match `^[a-zA-Z0-9_-]{1,128}$`.\n\n- `nodes?: { function: { id?: string; name?: string; versionNum?: number; }; name?: string; }[]`\n\n- `tags?: string[]`\n  Tags to categorize and organize the workflow.\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst workflow = await client.workflows.update('workflowName');\n\nconsole.log(workflow);\n```",
    perLanguage: {
      csharp: {
        method: 'Workflows.Update',
        example:
          'WorkflowUpdateParams parameters = new() { WorkflowName = "workflowName" };\n\nvar workflow = await client.Workflows.Update(parameters);\n\nConsole.WriteLine(workflow);',
      },
      go: {
        method: 'client.Workflows.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.Update(\n\t\tcontext.TODO(),\n\t\t"workflowName",\n\t\tbem.WorkflowUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.Error)\n}\n',
      },
      http: {
        example:
          "curl https://api.bem.ai/v3/workflows/$WORKFLOW_NAME \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"x-api-key: $BEM_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'workflows.update',
        example:
          'import os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.update(\n    workflow_name="workflowName",\n)\nprint(workflow.error)',
      },
      typescript: {
        method: 'client.workflows.update',
        example:
          "import Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.update('workflowName');\n\nconsole.log(workflow.error);",
      },
    },
  },
  {
    name: 'call',
    endpoint: '/v3/workflows/{workflowName}/call',
    httpMethod: 'post',
    summary: 'Call a Workflow Call a Workflow',
    description:
      '**Invoke a workflow.**\n\nSubmit the input file as either a multipart form request or a JSON request with\nbase64-encoded file content. The workflow name is derived from the URL path.\n\n## Input Formats\n\n- **Multipart form** (`multipart/form-data`): attach the file directly via the `file`\nor `files` fields. Set `wait` in the form body to control synchronous behaviour.\n- **JSON** (`application/json`): base64-encode the file content and set it in\n`input.singleFile.inputContent` or `input.batchFiles.inputs[*].inputContent`.\nPass `wait=true` as a query parameter to control synchronous behaviour.\n\n## Synchronous vs Asynchronous\n\nBy default the call is created asynchronously and this endpoint returns `202 Accepted`\nimmediately with a `pending` call object. Set `wait` to `true` to block until\nthe call completes (up to 30 seconds):\n\n- On success: returns `200 OK` with the completed call, `outputs` populated\n- On failure: returns `500 Internal Server Error` with the call and an `error` message\n- On timeout: returns `202 Accepted` with the still-running call\n\n## Tracking\n\nPoll `GET /v3/calls/{callID}` to check status, or configure a webhook subscription\nto receive events when the call finishes.',
    stainlessPath: '(resource) workflows > (method) call',
    qualified: 'client.workflows.call',
    params: [
      'workflowName: string;',
      'input: { batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }; singleFile?: { inputContent: string; inputType: string; }; };',
      'wait?: boolean;',
      'callReferenceID?: string;',
    ],
    response:
      "{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: event[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }",
    markdown:
      "## call\n\n`client.workflows.call(workflowName: string, input: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputContent: string; inputType: string; }; }, wait?: boolean, callReferenceID?: string): { call?: call; error?: string; }`\n\n**post** `/v3/workflows/{workflowName}/call`\n\n**Invoke a workflow.**\n\nSubmit the input file as either a multipart form request or a JSON request with\nbase64-encoded file content. The workflow name is derived from the URL path.\n\n## Input Formats\n\n- **Multipart form** (`multipart/form-data`): attach the file directly via the `file`\nor `files` fields. Set `wait` in the form body to control synchronous behaviour.\n- **JSON** (`application/json`): base64-encode the file content and set it in\n`input.singleFile.inputContent` or `input.batchFiles.inputs[*].inputContent`.\nPass `wait=true` as a query parameter to control synchronous behaviour.\n\n## Synchronous vs Asynchronous\n\nBy default the call is created asynchronously and this endpoint returns `202 Accepted`\nimmediately with a `pending` call object. Set `wait` to `true` to block until\nthe call completes (up to 30 seconds):\n\n- On success: returns `200 OK` with the completed call, `outputs` populated\n- On failure: returns `500 Internal Server Error` with the call and an `error` message\n- On timeout: returns `202 Accepted` with the still-running call\n\n## Tracking\n\nPoll `GET /v3/calls/{callID}` to check status, or configure a webhook subscription\nto receive events when the call finishes.\n\n### Parameters\n\n- `workflowName: string`\n\n- `input: { batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }; singleFile?: { inputContent: string; inputType: string; }; }`\n  Input to the workflow call. Provide exactly one of `singleFile` or `batchFiles`.\n  - `batchFiles?: { inputs?: { inputContent: string; inputType: string; itemReferenceID?: string; }[]; }`\n  - `singleFile?: { inputContent: string; inputType: string; }`\n\n- `wait?: boolean`\n  When `true`, the endpoint blocks until the call completes (up to 30 seconds)\nand returns the finished call object. Default: `false`.\n\n- `callReferenceID?: string`\n  Your reference ID for tracking this call.\n\n### Returns\n\n- `{ call?: { callID: string; createdAt: string; errors: error_event[]; outputs: event[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: object; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }; error?: string; }`\n\n  - `call?: { callID: string; createdAt: string; errors: { eventID: string; functionID: string; functionName: string; message: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'error'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; outputs: { eventID: string; functionID: string; functionName: string; itemCount: number; itemOffset: number; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; correctedContent?: object | object | object[] | string | number | boolean; createdAt?: string; eventType?: 'transform'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; inputs?: object[]; inputType?: string; invalidProperties?: string[]; isRegression?: boolean; lastPublishErrorAt?: string; metadata?: object; metrics?: object; orderMatching?: boolean; pipelineID?: string; publishedAt?: string; s3URL?: string; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { choice: string; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'route'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; s3URL?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; printPageOutput: object; referenceID: string; semanticPageOutput: object; callID?: string; createdAt?: string; eventType?: 'split_collection'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { eventID: string; functionID: string; functionName: string; outputType: 'print_page' | 'semantic_page'; referenceID: string; callID?: string; createdAt?: string; eventType?: 'split_item'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; printPageOutput?: object; semanticPageOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | object | { eventID: string; functionID: string; functionName: string; invalidProperties: string[]; items: object[]; joinType: 'standard'; referenceID: string; transformedContent: object; avgConfidence?: number; callID?: string; createdAt?: string; eventType?: 'join'; fieldConfidences?: object; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; transformationID?: string; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { enrichedContent: object; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; eventType?: 'enrich'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; inboundEmail?: inbound_email_event; metadata?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; } | { collectionID: string; collectionName: string; eventID: string; operation: 'add' | 'update'; processedCount: number; referenceID: string; status: 'success' | 'failed'; collectionItemIDs?: string[]; createdAt?: string; errorMessage?: string; eventType?: 'collection_processing'; functionCallTryNumber?: number; inboundEmail?: inbound_email_event; metadata?: object; } | { deliveryStatus: 'success' | 'skip'; destinationType: 'webhook' | 's3' | 'google_drive'; eventID: string; functionID: string; functionName: string; referenceID: string; callID?: string; createdAt?: string; deliveredContent?: object; eventType?: 'send'; functionCallID?: string; functionCallTryNumber?: number; functionVersionNum?: number; googleDriveOutput?: object; inboundEmail?: inbound_email_event; metadata?: object; s3Output?: object; webhookOutput?: object; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }[]; traceUrl: string; url: string; callReferenceID?: string; finishedAt?: string; input?: { batchFiles?: { inputs?: object[]; }; singleFile?: { inputType?: string; s3URL?: string; }; }; status?: 'pending' | 'running' | 'completed' | 'failed'; workflowID?: string; workflowName?: string; workflowVersionNum?: number; }`\n  - `error?: string`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst callGetResponse = await client.workflows.call('workflowName', { input: {} });\n\nconsole.log(callGetResponse);\n```",
    perLanguage: {
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
    description: 'List Workflow Versions',
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
      '{ id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }',
    markdown:
      "## list\n\n`client.workflows.versions.list(workflowName: string, endingBefore?: number, limit?: number, sortOrder?: 'asc' | 'desc', startingAfter?: number): { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n**get** `/v3/workflows/{workflowName}/versions`\n\nList Workflow Versions\n\n### Parameters\n\n- `workflowName: string`\n\n- `endingBefore?: number`\n\n- `limit?: number`\n\n- `sortOrder?: 'asc' | 'desc'`\n\n- `startingAfter?: number`\n\n### Returns\n\n- `{ id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n  V3 read representation of a workflow version.\n\n  - `id: string`\n  - `createdAt: string`\n  - `edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]`\n  - `mainNodeName: string`\n  - `name: string`\n  - `nodes: { function: { id?: string; name?: string; versionNum?: number; }; name: string; }[]`\n  - `updatedAt: string`\n  - `versionNum: number`\n  - `audit?: { versionCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowCreatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; workflowLastUpdatedBy?: { createdAt: string; userActionID: string; apiKeyName?: string; emailAddress?: string; userEmail?: string; userID?: string; }; }`\n  - `displayName?: string`\n  - `emailAddress?: string`\n  - `tags?: string[]`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\n// Automatically fetches more pages as needed.\nfor await (const workflow of client.workflows.versions.list('workflowName')) {\n  console.log(workflow);\n}\n```",
    perLanguage: {
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
    description: 'Get a Workflow Version',
    stainlessPath: '(resource) workflows.versions > (method) retrieve',
    qualified: 'client.workflows.versions.retrieve',
    params: ['workflowName: string;', 'versionNum: number;'],
    response:
      '{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }',
    markdown:
      "## retrieve\n\n`client.workflows.versions.retrieve(workflowName: string, versionNum: number): { error?: string; workflow?: workflow; }`\n\n**get** `/v3/workflows/{workflowName}/versions/{versionNum}`\n\nGet a Workflow Version\n\n### Parameters\n\n- `workflowName: string`\n\n- `versionNum: number`\n\n### Returns\n\n- `{ error?: string; workflow?: { id: string; createdAt: string; edges: workflow_edge_response[]; mainNodeName: string; name: string; nodes: workflow_node_response[]; updatedAt: string; versionNum: number; audit?: workflow_audit; displayName?: string; emailAddress?: string; tags?: string[]; }; }`\n\n  - `error?: string`\n  - `workflow?: { id: string; createdAt: string; edges: { destinationNodeName: string; sourceNodeName: string; destinationName?: string; }[]; mainNodeName: string; name: string; nodes: { function: function_version_identifier; name: string; }[]; updatedAt: string; versionNum: number; audit?: { versionCreatedBy?: user_action_summary; workflowCreatedBy?: user_action_summary; workflowLastUpdatedBy?: user_action_summary; }; displayName?: string; emailAddress?: string; tags?: string[]; }`\n\n### Example\n\n```typescript\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem();\n\nconst version = await client.workflows.versions.retrieve(0, { workflowName: 'workflowName' });\n\nconsole.log(version);\n```",
    perLanguage: {
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
      '**Analyze a file and infer a JSON Schema from its contents.**\n\nAccepts a file via multipart form upload and uses Gemini to analyze the document,\nreturning a description of its contents, an inferred JSON Schema capturing all\nextractable fields, and document classification metadata.\n\nThe returned schema is designed to be reusable across many similar documents of the\nsame type, not just the specific file uploaded. It can be used directly as the\n`outputSchema` when creating a Transform function.\n\nThe endpoint also detects whether the file contains multiple bundled documents\nand classifies the content nature (textual, visual, audio, video, or mixed).\n\n## Supported file types\n\nPDF, PNG, JPEG, HEIC, HEIF, WebP, CSV, XLS, XLSX, DOCX, JSON, HTML, XML, EML,\nplain text, WAV, MP3, M4A, MP4.\n\n## File size limit\n\nMaximum file size is **20 MB**.\n\n## Example\n\n```bash\ncurl -X POST https://api.bem.ai/v3/infer-schema \\\n  -H "x-api-key: YOUR_API_KEY" \\\n  -F "file=@invoice.pdf"\n```',
    stainlessPath: '(resource) infer_schema > (method) create',
    qualified: 'client.inferSchema.create',
    params: ['file: object;'],
    response:
      '{ analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }; filename: string; }',
    markdown:
      '## create\n\n`client.inferSchema.create(file: object): { analysis: object; filename: string; }`\n\n**post** `/v3/infer-schema`\n\n**Analyze a file and infer a JSON Schema from its contents.**\n\nAccepts a file via multipart form upload and uses Gemini to analyze the document,\nreturning a description of its contents, an inferred JSON Schema capturing all\nextractable fields, and document classification metadata.\n\nThe returned schema is designed to be reusable across many similar documents of the\nsame type, not just the specific file uploaded. It can be used directly as the\n`outputSchema` when creating a Transform function.\n\nThe endpoint also detects whether the file contains multiple bundled documents\nand classifies the content nature (textual, visual, audio, video, or mixed).\n\n## Supported file types\n\nPDF, PNG, JPEG, HEIC, HEIF, WebP, CSV, XLS, XLSX, DOCX, JSON, HTML, XML, EML,\nplain text, WAV, MP3, M4A, MP4.\n\n## File size limit\n\nMaximum file size is **20 MB**.\n\n## Example\n\n```bash\ncurl -X POST https://api.bem.ai/v3/infer-schema \\\n  -H "x-api-key: YOUR_API_KEY" \\\n  -F "file=@invoice.pdf"\n```\n\n### Parameters\n\n- `file: object`\n  The file to analyze and infer a JSON schema from.\n\n### Returns\n\n- `{ analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }; filename: string; }`\n  Response from the infer-schema endpoint.\n\n  - `analysis: { contentNature: string; contentType: string; description: string; documentTypes: { count: number; description: string; name: string; }[]; fileName: string; fileType: string; isMultiDocument: boolean; sizeBytes: number; schema?: object; }`\n  - `filename: string`\n\n### Example\n\n```typescript\nimport Bem from \'bem-ai-sdk\';\n\nconst client = new Bem();\n\nconst inferSchema = await client.inferSchema.create({ file: {} });\n\nconsole.log(inferSchema);\n```',
    perLanguage: {
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
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Bem Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/bem-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/bem-sdk/)\n\nThe Bem Python library provides convenient access to the Bem REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install bem-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom bem import Bem\n\nclient = Bem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\n\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="transform",\n)\nprint(function_response.function)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `BEM_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncBem` instead of `Bem` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom bem import AsyncBem\n\nclient = AsyncBem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  function_response = await client.functions.create(\n      function_name="functionName",\n      type="transform",\n  )\n  print(function_response.function)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install bem-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom bem import DefaultAioHttpClient\nfrom bem import AsyncBem\n\nasync def main() -> None:\n  async with AsyncBem(\n    api_key=os.environ.get("BEM_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    function_response = await client.functions.create(\n        function_name="functionName",\n        type="transform",\n    )\n    print(function_response.function)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Bem API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom bem import Bem\n\nclient = Bem()\n\nall_functions = []\n# Automatically fetches more pages as needed.\nfor function in client.functions.list():\n    # Do something with function here\n    all_functions.append(function)\nprint(all_functions)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom bem import AsyncBem\n\nclient = AsyncBem()\n\nasync def main() -> None:\n    all_functions = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for function in client.functions.list():\n        all_functions.append(function)\n    print(all_functions)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.functions.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.functions)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.functions.list()\n\nprint(f"next page cursor: {first_page.starting_after}") # => "next page cursor: ..."\nfor function in first_page.functions:\n    print(function)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom bem import Bem\n\nclient = Bem()\n\nfunction_response = client.functions.create(\n    function_name="functionName",\n    type="split",\n    print_page_split_config={},\n)\nprint(function_response.print_page_split_config)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `bem.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `bem.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `bem.APIError`.\n\n```python\nimport bem\nfrom bem import Bem\n\nclient = Bem()\n\ntry:\n    client.functions.create(\n        function_name="functionName",\n        type="transform",\n    )\nexcept bem.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept bem.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept bem.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom bem import Bem\n\n# Configure the default for all requests:\nclient = Bem(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).functions.create(\n    function_name="functionName",\n    type="transform",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom bem import Bem\n\n# Configure the default for all requests:\nclient = Bem(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Bem(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).functions.create(\n    function_name="functionName",\n    type="transform",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `BEM_LOG` to `info`.\n\n```shell\n$ export BEM_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom bem import Bem\n\nclient = Bem()\nresponse = client.functions.with_raw_response.create(\n    function_name="functionName",\n    type="transform",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nfunction = response.parse()  # get the object that `functions.create()` would have returned\nprint(function.function)\n```\n\nThese methods return an [`APIResponse`](https://github.com/bem-team/bem-python-sdk/tree/main/src/bem/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/bem-team/bem-python-sdk/tree/main/src/bem/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.functions.with_streaming_response.create(\n    function_name="functionName",\n    type="transform",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom bem import Bem, DefaultHttpxClient\n\nclient = Bem(\n    # Or use the `BEM_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom bem import Bem\n\nwith Bem() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-python-sdk/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport bem\nprint(bem.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Bem Go API Library\n\n<a href="https://pkg.go.dev/github.com/bem-team/bem-go-sdk"><img src="https://pkg.go.dev/badge/github.com/bem-team/bem-go-sdk.svg" alt="Go Reference"></a>\n\nThe Bem Go library provides convenient access to the [Bem REST API](docs.bem.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/bem-team/bem-go-sdk" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/bem-team/bem-go-sdk@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/bem-team/bem-go-sdk"\n\t"github.com/bem-team/bem-go-sdk/option"\n)\n\nfunc main() {\n\tclient := bem.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("BEM_API_KEY")\n\t)\n\tfunctionResponse, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", functionResponse.Function)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Functions.New(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/bem-team/bem-go-sdk/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Functions.ListAutoPaging(context.TODO(), bem.FunctionListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tfunction := iter.Current()\n\tfmt.Printf("%+v\\n", function)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Functions.List(context.TODO(), bem.FunctionListParams{})\nfor page != nil {\n\tfor _, function := range page.Functions {\n\t\tfmt.Printf("%+v\\n", function)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Functions.New(context.TODO(), bem.FunctionNewParams{\n\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\tFunctionName: "functionName",\n\t\t},\n\t},\n})\nif err != nil {\n\tvar apierr *bem.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v3/functions": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Functions.New(\n\tctx,\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := bem.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Functions.New(\n\tcontext.TODO(),\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nfunctionResponse, err := client.Functions.New(\n\tcontext.TODO(),\n\tbem.FunctionNewParams{\n\t\tCreateFunction: bem.CreateFunctionUnionParam{\n\t\t\tOfTransform: &bem.CreateFunctionTransformParam{\n\t\t\t\tFunctionName: "functionName",\n\t\t\t},\n\t\t},\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", functionResponse)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-go-sdk/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Bem TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/bem-ai-sdk.svg?label=npm%20(stable))](https://npmjs.org/package/bem-ai-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/bem-ai-sdk)\n\nThis library provides convenient access to the Bem REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Bem MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=bem-ai-sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImJlbS1haS1zZGstbWNwIl0sImVudiI6eyJCRU1fQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22bem-ai-sdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22bem-ai-sdk-mcp%22%5D%2C%22env%22%3A%7B%22BEM_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install bem-ai-sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst functionResponse = await client.functions.create({\n  functionName: 'functionName',\n  type: 'transform',\n});\n\nconsole.log(functionResponse['function']);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  apiKey: process.env['BEM_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Bem.FunctionCreateParams = { functionName: 'functionName', type: 'transform' };\nconst functionResponse: Bem.FunctionResponse = await client.functions.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst functionResponse = await client.functions\n  .create({ functionName: 'functionName', type: 'transform' })\n  .catch(async (err) => {\n    if (err instanceof Bem.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Bem({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.functions.create({ functionName: 'functionName', type: 'transform' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Bem({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.functions.create({ functionName: 'functionName', type: 'transform' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Bem API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllFunctions(params) {\n  const allFunctions = [];\n  // Automatically fetches more pages as needed.\n  for await (const _function of client.functions.list()) {\n    allFunctions.push(_function);\n  }\n  return allFunctions;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.functions.list();\nfor (const _function of page.functions) {\n  console.log(_function);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Bem();\n\nconst response = await client.functions\n  .create({ functionName: 'functionName', type: 'transform' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: functionResponse, response: raw } = await client.functions\n  .create({ functionName: 'functionName', type: 'transform' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(functionResponse['function']);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `BEM_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Bem({\n  logger: logger.child({ name: 'Bem' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.functions.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Bem({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Bem from 'bem-ai-sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Bem({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Bem from 'bem-ai-sdk';\n\nconst client = new Bem({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Bem from 'npm:bem-ai-sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Bem({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/bem-team/bem-typescript-sdk/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'csharp',
    content:
      '# Bem C# API Library\n\nThe Bem C# SDK provides convenient access to the [Bem REST API](docs.bem.ai) from applications written in   C#.\n\n## Installation\n\n```bash\ngit clone git@github.com:bem-team/bem-csharp-sdk.git\ndotnet add reference bem-csharp-sdk/src/Bem\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nBemClient client = new();\n\nFunctionCreateParams parameters = new()\n{\n    CreateFunction = new Transform("functionName")\n};\n\nvar functionResponse = await client.Functions.Create(parameters);\n\nConsole.WriteLine(functionResponse);\n```',
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
