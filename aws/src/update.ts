import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
    APIGatewayProxyResultV2,
} from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { UpdateParamsSchema } from 'core/schemas/UpdateParamsSchema.js'

const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
)
const tableName: string = process.env['TABLE_NAME'] || ''

export const handler = async (
    event: LambdaFunctionUrlEvent,
    context: Context
): Promise<APIGatewayProxyResultV2> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Request body is malformed',
                }),
            }
        }
        const parseResult = UpdateParamsSchema.safeParse(event.body)
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

        // event.rawPath = "/xyz"
        const rawPath = event.rawPath

        // Extract "xyz" using splitting or regular expressions
        const pathSegments = rawPath.split('/').filter(Boolean) // ["xyz"]
        const dateKey = `DATE#${pathSegments[0]}`
        const urlHash = `URL#${pathSegments[1]}`
        const changeList =
            typeof event.body === 'string' ? JSON.parse(event.body) : event.body
        const attributeNames: Record<string, string> = {}
        const attributeValues: Record<string, any> = {}
        const updateExpressionsArray: string[] = []
        for (const [key, value] of Object.entries(changeList)) {
            // Attribute Names start with '#'
            const nameKey = `#n_${crypto.randomUUID().slice(0, 4)}`
            attributeNames[nameKey] = key

            // Attribute Values MUST start with ':'
            const valueKey = `:v_${crypto.randomUUID().slice(0, 4)}`
            attributeValues[valueKey] = value

            updateExpressionsArray.push(`${nameKey} = ${valueKey}`)
        }
        const updateExpression = `SET ${updateExpressionsArray.join(', ')}`

        const result = await docClient.send(
            new UpdateCommand({
                TableName: tableName,
                Key: {
                    PK: dateKey,
                    SK: urlHash,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: attributeNames,
                ExpressionAttributeValues: attributeValues,
                ReturnValues: 'ALL_NEW',
            })
        )
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Document update complete',
                data: result.Attributes,
            }),
        }
    } catch (error: any) {
        if (error.name === 'ConditionalCheckFailedException') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Update failed: condition z = 5 was not met.',
                }),
            }
        } else if (error instanceof TypeError) {
            console.error(JSON.stringify(error))
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Data in body contains type error. Error reference ID: ${context.awsRequestId}`,
                }),
            }
        } else if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Error occurred with database provider. Error reference ID: ${context.awsRequestId}`,
                }),
            }
        } else {
            console.error(JSON.stringify(error))

            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Unknown error occurred. Error reference ID: ${context.awsRequestId}`,
                }),
            }
        }
    }
}
