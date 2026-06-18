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
- <code><a href="./src/resources/functions/functions.ts">ParseConfig</a></code>
- <code><a href="./src/resources/functions/functions.ts">SendDestinationType</a></code>
- <code><a href="./src/resources/functions/functions.ts">SplitFunctionSemanticPageItemClass</a></code>
- <code><a href="./src/resources/functions/functions.ts">UpdateFunction</a></code>
- <code><a href="./src/resources/functions/functions.ts">UserActionSummary</a></code>
- <code><a href="./src/resources/functions/functions.ts">WorkflowUsageInfo</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionCompareMetricsResponse</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionEstimateReviewRequirementsResponse</a></code>
- <code><a href="./src/resources/functions/functions.ts">FunctionGetMetricsResponse</a></code>

Methods:

- <code title="post /v3/functions">client.functions.<a href="./src/resources/functions/functions.ts">create</a>({ ...params }) -> FunctionResponse</code>
- <code title="get /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">retrieve</a>(functionName) -> FunctionResponse</code>
- <code title="patch /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">update</a>(pathFunctionName, { ...params }) -> FunctionResponse</code>
- <code title="get /v3/functions">client.functions.<a href="./src/resources/functions/functions.ts">list</a>({ ...params }) -> FunctionsFunctionsPage</code>
- <code title="delete /v3/functions/{functionName}">client.functions.<a href="./src/resources/functions/functions.ts">delete</a>(functionName) -> void</code>
- <code title="post /v3/functions/compare">client.functions.<a href="./src/resources/functions/functions.ts">compareMetrics</a>({ ...params }) -> FunctionCompareMetricsResponse</code>
- <code title="post /v3/functions/review">client.functions.<a href="./src/resources/functions/functions.ts">estimateReviewRequirements</a>({ ...params }) -> FunctionEstimateReviewRequirementsResponse</code>
- <code title="get /v3/functions/metrics">client.functions.<a href="./src/resources/functions/functions.ts">getMetrics</a>({ ...params }) -> FunctionGetMetricsResponse</code>

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

## Regression

Types:

- <code><a href="./src/resources/functions/regression.ts">RegressionApplyCorrectionsResponse</a></code>
- <code><a href="./src/resources/functions/regression.ts">RegressionRunResponse</a></code>

Methods:

- <code title="post /v3/functions/regression/corrections">client.functions.regression.<a href="./src/resources/functions/regression.ts">applyCorrections</a>({ ...params }) -> RegressionApplyCorrectionsResponse</code>
- <code title="post /v3/functions/regression">client.functions.regression.<a href="./src/resources/functions/regression.ts">run</a>({ ...params }) -> RegressionRunResponse</code>

# Calls

Types:

- <code><a href="./src/resources/calls.ts">Call</a></code>
- <code><a href="./src/resources/calls.ts">CallGetResponse</a></code>
- <code><a href="./src/resources/calls.ts">CallRetrieveTraceResponse</a></code>

Methods:

- <code title="get /v3/calls/{callID}">client.calls.<a href="./src/resources/calls.ts">retrieve</a>(callID) -> CallGetResponse</code>
- <code title="get /v3/calls">client.calls.<a href="./src/resources/calls.ts">list</a>({ ...params }) -> CallsCallsPage</code>
- <code title="get /v3/calls/{callID}/trace">client.calls.<a href="./src/resources/calls.ts">retrieveTrace</a>(callID) -> CallRetrieveTraceResponse</code>

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
- <code><a href="./src/resources/outputs.ts">InputType</a></code>
- <code><a href="./src/resources/outputs.ts">OutputRetrieveResponse</a></code>

Methods:

- <code title="get /v3/outputs/{eventID}">client.outputs.<a href="./src/resources/outputs.ts">retrieve</a>(eventID) -> OutputRetrieveResponse</code>
- <code title="get /v3/outputs">client.outputs.<a href="./src/resources/outputs.ts">list</a>({ ...params }) -> EventsOutputsPage</code>

# Workflows

Types:

- <code><a href="./src/resources/workflows/workflows.ts">FunctionVersionIdentifier</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">Workflow</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowAudit</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowConnector</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowConnectorError</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowConnectorType</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowEdge</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowEdgeResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowNode</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowNodeResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRetrieveResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowUpdateResponse</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCopyResponse</a></code>

Methods:

- <code title="post /v3/workflows">client.workflows.<a href="./src/resources/workflows/workflows.ts">create</a>({ ...params }) -> Workflow</code>
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

# Collections

Types:

- <code><a href="./src/resources/collections/collections.ts">Collection</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionItem</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionListResponse</a></code>
- <code><a href="./src/resources/collections/collections.ts">CollectionCountTokensResponse</a></code>

Methods:

- <code title="post /v3/collections">client.collections.<a href="./src/resources/collections/collections.ts">create</a>({ ...params }) -> Collection</code>
- <code title="get /v3/collections">client.collections.<a href="./src/resources/collections/collections.ts">list</a>({ ...params }) -> CollectionListResponse</code>
- <code title="delete /v3/collections">client.collections.<a href="./src/resources/collections/collections.ts">delete</a>({ ...params }) -> void</code>
- <code title="post /v3/collections/token-count">client.collections.<a href="./src/resources/collections/collections.ts">countTokens</a>({ ...params }) -> CollectionCountTokensResponse</code>

## Items

Types:

- <code><a href="./src/resources/collections/items.ts">ItemUpdateResponse</a></code>
- <code><a href="./src/resources/collections/items.ts">ItemAddResponse</a></code>

Methods:

- <code title="get /v3/collections/items">client.collections.items.<a href="./src/resources/collections/items.ts">retrieve</a>({ ...params }) -> Collection</code>
- <code title="put /v3/collections/items">client.collections.items.<a href="./src/resources/collections/items.ts">update</a>({ ...params }) -> ItemUpdateResponse</code>
- <code title="delete /v3/collections/items">client.collections.items.<a href="./src/resources/collections/items.ts">delete</a>({ ...params }) -> void</code>
- <code title="post /v3/collections/items">client.collections.items.<a href="./src/resources/collections/items.ts">add</a>({ ...params }) -> ItemAddResponse</code>

# Events

Types:

- <code><a href="./src/resources/events.ts">EventSubmitFeedbackResponse</a></code>

Methods:

- <code title="post /v3/events/{eventID}/feedback">client.events.<a href="./src/resources/events.ts">submitFeedback</a>(eventID, { ...params }) -> EventSubmitFeedbackResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">ExtractWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ClassifyWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ParseWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">SplitCollectionWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">SplitItemWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">JoinWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">EnrichWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">PayloadShapingWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">SendWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">EvaluationWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CollectionProcessingWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>

# WebhookSecret

Types:

- <code><a href="./src/resources/webhook-secret.ts">WebhookSecret</a></code>

Methods:

- <code title="post /v3/webhook-secret">client.webhookSecret.<a href="./src/resources/webhook-secret.ts">create</a>() -> WebhookSecret</code>
- <code title="get /v3/webhook-secret">client.webhookSecret.<a href="./src/resources/webhook-secret.ts">retrieve</a>() -> WebhookSecret</code>
- <code title="delete /v3/webhook-secret">client.webhookSecret.<a href="./src/resources/webhook-secret.ts">revoke</a>() -> void</code>

# Eval

Types:

- <code><a href="./src/resources/eval/eval.ts">EvalTriggerEvaluationResponse</a></code>

Methods:

- <code title="post /v3/eval">client.eval.<a href="./src/resources/eval/eval.ts">triggerEvaluation</a>({ ...params }) -> EvalTriggerEvaluationResponse</code>

## Results

Types:

- <code><a href="./src/resources/eval/results.ts">EvaluationResults</a></code>

Methods:

- <code title="get /v3/eval/results">client.eval.results.<a href="./src/resources/eval/results.ts">retrieveResults</a>({ ...params }) -> EvaluationResults</code>

## Score

Types:

- <code><a href="./src/resources/eval/score.ts">ScoreCreateResponse</a></code>
- <code><a href="./src/resources/eval/score.ts">ScoreRetrieveResponse</a></code>
- <code><a href="./src/resources/eval/score.ts">ScoreCancelResponse</a></code>

Methods:

- <code title="post /v3/eval/score">client.eval.score.<a href="./src/resources/eval/score.ts">create</a>({ ...params }) -> ScoreCreateResponse</code>
- <code title="get /v3/eval/score/{scoreRunID}">client.eval.score.<a href="./src/resources/eval/score.ts">retrieve</a>(scoreRunID) -> ScoreRetrieveResponse</code>
- <code title="post /v3/eval/score/{scoreRunID}/cancel">client.eval.score.<a href="./src/resources/eval/score.ts">cancel</a>(scoreRunID) -> ScoreCancelResponse</code>

# Fs

Types:

- <code><a href="./src/resources/fs.ts">FsOp</a></code>
- <code><a href="./src/resources/fs.ts">FNavigateResponse</a></code>

Methods:

- <code title="post /v3/fs">client.fs.<a href="./src/resources/fs.ts">navigate</a>({ ...params }) -> FNavigateResponse</code>

# Connectors

Types:

- <code><a href="./src/resources/connectors.ts">Connector</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorType</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorDeleteResponse</a></code>

Methods:

- <code title="post /v3/connectors">client.connectors.<a href="./src/resources/connectors.ts">create</a>({ ...params }) -> Connector</code>
- <code title="get /v3/connectors">client.connectors.<a href="./src/resources/connectors.ts">list</a>({ ...params }) -> ConnectorListResponse</code>
- <code title="delete /v3/connectors/{connectorID}">client.connectors.<a href="./src/resources/connectors.ts">delete</a>(connectorID) -> string</code>

# Subscriptions

Types:

- <code><a href="./src/resources/subscriptions.ts">SubscriptionV3</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionListResponse</a></code>

Methods:

- <code title="post /v3/subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">create</a>({ ...params }) -> SubscriptionV3</code>
- <code title="get /v3/subscriptions/{subscriptionID}">client.subscriptions.<a href="./src/resources/subscriptions.ts">retrieve</a>(subscriptionID) -> SubscriptionV3</code>
- <code title="patch /v3/subscriptions/{subscriptionID}">client.subscriptions.<a href="./src/resources/subscriptions.ts">update</a>(subscriptionID, { ...params }) -> SubscriptionV3</code>
- <code title="get /v3/subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">list</a>({ ...params }) -> SubscriptionListResponse</code>
- <code title="delete /v3/subscriptions/{subscriptionID}">client.subscriptions.<a href="./src/resources/subscriptions.ts">delete</a>(subscriptionID) -> void</code>

# Views

Types:

- <code><a href="./src/resources/views.ts">ViewCreateResponse</a></code>
- <code><a href="./src/resources/views.ts">ViewRetrieveResponse</a></code>
- <code><a href="./src/resources/views.ts">ViewUpdateResponse</a></code>
- <code><a href="./src/resources/views.ts">ViewListResponse</a></code>
- <code><a href="./src/resources/views.ts">ViewGenerateAggregationDataResponse</a></code>
- <code><a href="./src/resources/views.ts">ViewGenerateTableDataResponse</a></code>

Methods:

- <code title="post /v3/views">client.views.<a href="./src/resources/views.ts">create</a>({ ...params }) -> ViewCreateResponse</code>
- <code title="get /v3/views/{view_id}">client.views.<a href="./src/resources/views.ts">retrieve</a>(viewID) -> ViewRetrieveResponse</code>
- <code title="put /v3/views/{view_id}">client.views.<a href="./src/resources/views.ts">update</a>(viewID, { ...params }) -> ViewUpdateResponse</code>
- <code title="get /v3/views">client.views.<a href="./src/resources/views.ts">list</a>({ ...params }) -> ViewListResponse</code>
- <code title="delete /v3/views/{view_id}">client.views.<a href="./src/resources/views.ts">delete</a>(viewID) -> void</code>
- <code title="post /v3/views/aggregation-data">client.views.<a href="./src/resources/views.ts">generateAggregationData</a>({ ...params }) -> ViewGenerateAggregationDataResponse</code>
- <code title="post /v3/views/table-data">client.views.<a href="./src/resources/views.ts">generateTableData</a>({ ...params }) -> ViewGenerateTableDataResponse</code>

# Buckets

Types:

- <code><a href="./src/resources/buckets.ts">BucketCreateResponse</a></code>
- <code><a href="./src/resources/buckets.ts">BucketRetrieveResponse</a></code>
- <code><a href="./src/resources/buckets.ts">BucketUpdateResponse</a></code>
- <code><a href="./src/resources/buckets.ts">BucketListResponse</a></code>

Methods:

- <code title="post /v3/buckets">client.buckets.<a href="./src/resources/buckets.ts">create</a>({ ...params }) -> BucketCreateResponse</code>
- <code title="get /v3/buckets/{bucketID}">client.buckets.<a href="./src/resources/buckets.ts">retrieve</a>(bucketID) -> BucketRetrieveResponse</code>
- <code title="patch /v3/buckets/{bucketID}">client.buckets.<a href="./src/resources/buckets.ts">update</a>(bucketID, { ...params }) -> BucketUpdateResponse</code>
- <code title="get /v3/buckets">client.buckets.<a href="./src/resources/buckets.ts">list</a>({ ...params }) -> BucketListResponse</code>
- <code title="delete /v3/buckets/{bucketID}">client.buckets.<a href="./src/resources/buckets.ts">delete</a>(bucketID, { ...params }) -> void</code>

# Entities

Types:

- <code><a href="./src/resources/entities/entities.ts">EntityUpdateResponse</a></code>
- <code><a href="./src/resources/entities/entities.ts">EntityBulkCreateResponse</a></code>
- <code><a href="./src/resources/entities/entities.ts">EntityBulkValidateResponse</a></code>
- <code><a href="./src/resources/entities/entities.ts">EntityRetrieveRelationsResponse</a></code>
- <code><a href="./src/resources/entities/entities.ts">EntityRetrieveSeedStatusResponse</a></code>

Methods:

- <code title="patch /v3/entities/{id}">client.entities.<a href="./src/resources/entities/entities.ts">update</a>(id, { ...params }) -> EntityUpdateResponse</code>
- <code title="post /v3/entities/bulk">client.entities.<a href="./src/resources/entities/entities.ts">bulkCreate</a>({ ...params }) -> EntityBulkCreateResponse</code>
- <code title="post /v3/entities/bulk-validate">client.entities.<a href="./src/resources/entities/entities.ts">bulkValidate</a>({ ...params }) -> EntityBulkValidateResponse</code>
- <code title="get /v3/entities/{id}/relations">client.entities.<a href="./src/resources/entities/entities.ts">retrieveRelations</a>(id, { ...params }) -> EntityRetrieveRelationsResponse</code>
- <code title="get /v3/entities/seed/{id}">client.entities.<a href="./src/resources/entities/entities.ts">retrieveSeedStatus</a>(id) -> EntityRetrieveSeedStatusResponse</code>

## Synonyms

Types:

- <code><a href="./src/resources/entities/synonyms.ts">SynonymAddResponse</a></code>

Methods:

- <code title="post /v3/entities/{id}/synonyms">client.entities.synonyms.<a href="./src/resources/entities/synonyms.ts">add</a>(id, { ...params }) -> SynonymAddResponse</code>
- <code title="delete /v3/entities/{id}/synonyms/{synonymID}">client.entities.synonyms.<a href="./src/resources/entities/synonyms.ts">remove</a>(synonymID, { ...params }) -> void</code>

# EntityTypes

Types:

- <code><a href="./src/resources/entity-types/entity-types.ts">EntityTypeCreateResponse</a></code>
- <code><a href="./src/resources/entity-types/entity-types.ts">EntityTypeRetrieveResponse</a></code>
- <code><a href="./src/resources/entity-types/entity-types.ts">EntityTypeUpdateResponse</a></code>
- <code><a href="./src/resources/entity-types/entity-types.ts">EntityTypeListResponse</a></code>

Methods:

- <code title="post /v3/entity-types">client.entityTypes.<a href="./src/resources/entity-types/entity-types.ts">create</a>({ ...params }) -> EntityTypeCreateResponse</code>
- <code title="get /v3/entity-types/{typeID}">client.entityTypes.<a href="./src/resources/entity-types/entity-types.ts">retrieve</a>(typeID) -> EntityTypeRetrieveResponse</code>
- <code title="patch /v3/entity-types/{typeID}">client.entityTypes.<a href="./src/resources/entity-types/entity-types.ts">update</a>(typeID, { ...params }) -> EntityTypeUpdateResponse</code>
- <code title="get /v3/entity-types">client.entityTypes.<a href="./src/resources/entity-types/entity-types.ts">list</a>({ ...params }) -> EntityTypeListResponse</code>
- <code title="delete /v3/entity-types/{typeID}">client.entityTypes.<a href="./src/resources/entity-types/entity-types.ts">delete</a>(typeID) -> void</code>

## Reviewers

Types:

- <code><a href="./src/resources/entity-types/reviewers.ts">ReviewerListResponse</a></code>
- <code><a href="./src/resources/entity-types/reviewers.ts">ReviewerAssignResponse</a></code>

Methods:

- <code title="get /v3/entity-types/{typeID}/reviewers">client.entityTypes.reviewers.<a href="./src/resources/entity-types/reviewers.ts">list</a>(typeID) -> ReviewerListResponse</code>
- <code title="post /v3/entity-types/{typeID}/reviewers">client.entityTypes.reviewers.<a href="./src/resources/entity-types/reviewers.ts">assign</a>(typeID, { ...params }) -> ReviewerAssignResponse</code>
- <code title="delete /v3/entity-types/{typeID}/reviewers/{userID}">client.entityTypes.reviewers.<a href="./src/resources/entity-types/reviewers.ts">remove</a>(userID, { ...params }) -> void</code>

# KnowledgeGraph

Types:

- <code><a href="./src/resources/knowledge-graph.ts">KnowledgeGraphRetrieveResponse</a></code>

Methods:

- <code title="get /v3/knowledge-graph">client.knowledgeGraph.<a href="./src/resources/knowledge-graph.ts">retrieve</a>({ ...params }) -> KnowledgeGraphRetrieveResponse</code>

# ReviewQueue

Types:

- <code><a href="./src/resources/review-queue.ts">ReviewQueueListResponse</a></code>

Methods:

- <code title="get /v3/review-queue">client.reviewQueue.<a href="./src/resources/review-queue.ts">list</a>({ ...params }) -> ReviewQueueListResponse</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">UserListReviewerAssignmentsResponse</a></code>

Methods:

- <code title="get /v3/users/{userID}/reviewer-assignments">client.users.<a href="./src/resources/users.ts">listReviewerAssignments</a>(userID) -> UserListReviewerAssignmentsResponse</code>
