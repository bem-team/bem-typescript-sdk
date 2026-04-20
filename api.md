# Functions

Types:

- <code><a href="./src/resources/functions/functions.ts">ClassificationListItem</a></code>
- <code><a href="./src/resources/functions/functions.ts">CreateFunction</a></code>
- <code><a href="./src/resources/functions/functions.ts">EnrichConfig</a></code>
- <code><a href="./src/resources/functions/functions.ts">EnrichStep</a></code>
- <code><a href="./src/resources/functions/functions.ts">Function</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionAudit</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionResponse</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionType</a></code>
- <code><a href="./src/resources/functions/functions.ts">ListFunctionsResponse</a></code>
- <code><a href="./src/resources/functions/functions.ts">SplitFunctionSemanticPageItemClass</a></code>
- <code><a href="./src/resources/functions/functions.ts">UpdateFunction</a></code>
- <code><a href="./src/resources/functions/functions.ts">UserActionSummary</a></code>
- <code><a href="./src/resources/functions/functions.ts">WorkflowUsageInfo</a></code>

Methods:

- <code title="post /v3/functions">client.functions.<a href="./src/resources/functions/functions.ts">create</a>({ ...params }) -> FunctionResponse</code>
- <code title="get /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">retrieve</a>(functionName) -> FunctionResponse</code>
- <code title="patch /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">update</a>(pathFunctionName, { ...params }) -> FunctionResponse</code>
- <code title="get /v3/functions">client.functions.<a href="./src/resources/functions/functions.ts">list</a>({ ...params }) -> FunctionsFunctionsPage</code>
- <code title="delete /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">delete</a>(functionName) -> void</code>

## Copy

Types:

- <code><a href="./src/resources/functions/copy.ts">FunctionCopyRequest</a></code>

Methods:

- <code title="post /v3/functions/copy">client.functions.copy.<a href="./src/resources/functions/copy.ts">create</a>({ ...params }) -> FunctionResponse</code>

## Versions

Types:

- <code><a href="./src/resources/functions/versions.ts">FunctionVersion</a></code>
- <code><a href="./src/resources/functions/versions.ts">ListFunctionVersionsResponse</a></code>
- <code><a href="./src/resources/functions/versions.ts">VersionRetrieveResponse</a></code>

Methods:

- <code title="get /v3/functions/{functionName}/versions/{versionNum}">client.functions.versions.<a href="./src/resources/functions/versions.ts">retrieve</a>(versionNum, { ...params }) -> VersionRetrieveResponse</code>
- <code title="get /v3/functions/{functionName}/versions">client.functions.versions.<a href="./src/resources/functions/versions.ts">list</a>(functionName) -> ListFunctionVersionsResponse</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>
- <code><a href="./src/resources/calls.ts">CallGetResponse</a></code>

Methods:

- <code title="get /v3/calls/{callID}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callID) -> CallGetResponse</code>
- <code title="get /v3/calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallsCallsPage</code>

# Errors

Types:

- <code><a href="./src/resources/errors.ts">ErrorEvent</a></code>
- <code><a href="./src/resources/errors.ts">InboundEmailEvent</a></code>
- <code><a href="./src/resources/errors.ts">ErrorRetrieveResponse</a></code>

Methods:

- <code title="get /v3/errors/{eventID}">client.errors.<a href="./src/resources/errors.ts">retrieve</a>(eventID) -> ErrorRetrieveResponse</code>
- <code title="get /v3/errors">client.errors.<a href="./src/resources/errors.ts">list</a>({ ...params }) -> ErrorEventsErrorsPage</code>

# Outputs

Types:

- <code><a href="./src/resources/outputs.ts">AnyType</a></code>
- <code><a href="./src/resources/outputs.ts">Event</a></code>
- <code><a href="./src/resources/outputs.ts">OutputRetrieveResponse</a></code>

Methods:

- <code title="get /v3/outputs/{eventID}">client.outputs.<a href="./src/resources/outputs.ts">retrieve</a>(eventID) -> OutputRetrieveResponse</code>
- <code title="get /v3/outputs">client.outputs.<a href="./src/resources/outputs.ts">list</a>({ ...params }) -> EventsOutputsPage</code>

# Workflows

Types:

- <code><a href="./src/resources/workflows/workflows.ts">FunctionVersionIdentifier</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">Workflow</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowAudit</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowEdgeResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowNodeResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCreateResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRetrieveResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowUpdateResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCopyResponse</a></code>

Methods:

- <code title="post /v3/workflows">client.workflows.<a href="./src/resources/workflows/workflows.ts">create</a>({ ...params }) -> WorkflowCreateResponse</code>
- <code title="get /v3/workflows/{workflowName}">client.workflows.<a href="./src/resources/workflows/workflows.ts">retrieve</a>(workflowName) -> WorkflowRetrieveResponse</code>
- <code title="patch /v3/workflows/{workflowName}">client.workflows.<a href="./src/resources/workflows/workflows.ts">update</a>(workflowName, { ...params }) -> WorkflowUpdateResponse</code>
- <code title="get /v3/workflows">client.workflows.<a href="./src/resources/workflows/workflows.ts">list</a>({ ...params }) -> WorkflowsWorkflowsPage</code>
- <code title="delete /v3/workflows/{workflowName}">client.workflows.<a href="./src/resources/workflows/workflows.ts">delete</a>(workflowName) -> void</code>
- <code title="post /v3/workflows/{workflowName}/call">client.workflows.<a href="./src/resources/workflows/workflows.ts">call</a>(workflowName, { ...params }) -> CallGetResponse</code>
- <code title="post /v3/workflows/copy">client.workflows.<a href="./src/resources/workflows/workflows.ts">copy</a>({ ...params }) -> WorkflowCopyResponse</code>

## Versions

Types:

- <code><a href="./src/resources/workflows/versions.ts">VersionRetrieveResponse</a></code>

Methods:

- <code title="get /v3/workflows/{workflowName}/versions/{versionNum}">client.workflows.versions.<a href="./src/resources/workflows/versions.ts">retrieve</a>(versionNum, { ...params }) -> VersionRetrieveResponse</code>
- <code title="get /v3/workflows/{workflowName}/versions">client.workflows.versions.<a href="./src/resources/workflows/versions.ts">list</a>(workflowName, { ...params }) -> WorkflowsWorkflowVersionsPage</code>

# InferSchema

Types:

- <code><a href="./src/resources/infer-schema.ts">InferSchemaCreateResponse</a></code>

Methods:

- <code title="post /v3/infer-schema">client.inferSchema.<a href="./src/resources/infer-schema.ts">create</a>({ ...params }) -> InferSchemaCreateResponse</code>
