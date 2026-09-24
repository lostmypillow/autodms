import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
    APIGatewayProxyResultV2,
} from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'

const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
)
const tableName: string = process.env['TABLE_NAME'] || ''

export const handler = async (
    event: LambdaFunctionUrlEvent,
    context: Context
): Promise<APIGatewayProxyResultV2> => {
    try {
        // event.rawPath = "/xyz"
        const rawPath = event.rawPath

        // Extract "xyz" using splitting or regular expressions
        const pathSegments = rawPath.split('/').filter(Boolean) // ["xyz"]
        const dateKey = `DATE#${pathSegments[0]}`
        const urlHash = `URL#${pathSegments[1]}`

        await docClient.send(
            new DeleteCommand({
                TableName: tableName,
                Key: {
                    PK: dateKey,
                    SK: urlHash,
                },
            })
        )
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Document deletion complete',
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
