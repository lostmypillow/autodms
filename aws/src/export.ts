import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
    APIGatewayProxyResultV2,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'

const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
)
const tableName: string = process.env['TABLE_NAME'] || ''
import { ReadParamsSchema } from 'core/schemas/ReadParamsSchema.js'

export const handler = async (
    event: LambdaFunctionUrlEvent,
    context: Context
): Promise<APIGatewayProxyResultV2> => {
    try {
        const params: APIGatewayProxyEventQueryStringParameters | undefined =
            event.queryStringParameters
        const parseResult = ReadParamsSchema.safeParse(params)
        if (!parseResult.success) {
            const missingOrInvalid = parseResult.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                issue: issue.message,
            }))

            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: 'Validation failed.',
                    errors: missingOrInvalid,
                }),
            }
        }

        const scanResult = await docClient.send(
            new ScanCommand({
                TableName: tableName,
                FilterExpression: 'PK = :sk',
                ExpressionAttributeValues: {
                    // @ts-expect-error params is not defined as it is yet to be typed
                    ':sk': `DATE#${params.targetDate}`,
                },
            })
        )
        const todayDocs = scanResult.Items
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        }
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(JSON.stringify(error))
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Data in body contains type error. ${JSON.stringify(error.message)}`,
                }),
            }
        } else if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Error occurred with database provider.`,
                }),
            }
        } else {
            if (error instanceof Error) {
                console.error(
                    error.message ? error.message : JSON.stringify(error)
                )
            } else {
                console.error(
                    `Error is of type unknown. Error object: ${JSON.stringify(error)}`
                )
            }

            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Unknown error occurred. ${error instanceof Error ? JSON.stringify(error.message) : ''}`,
                }),
            }
        }
    }
}
