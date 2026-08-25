import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
    APIGatewayProxyResultV2,
} from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import {
    FullArticleSchema,
    type NewsArticleAddition,
} from 'core/schemas/NewsArticle.js'
import { UrlOnlySchema } from 'core/schemas/NewsArticle.js'
import { createHash } from 'crypto'
import { dmsScrape } from 'core'

function generateKey(rawUrl: string): string {
    const url = new URL(rawUrl.trim())
    url.hostname = url.hostname.toLowerCase()
    let cleanUrl = url.toString()
    if (cleanUrl.endsWith('/') && url.pathname === '/') {
        cleanUrl = cleanUrl.slice(0, -1)
    }
    const hash = createHash('sha256').update(cleanUrl).digest('hex')
    return `URL#${hash}`
}
const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({})
)
const tableName: string = process.env['TABLE_NAME'] || ''

export const handler = async (
    event: LambdaFunctionUrlEvent,
    context: Context
): Promise<APIGatewayProxyResultV2> => {
    let processedDocument
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Request body is malformed' }),
            }
        }
        const rawDocument: NewsArticleAddition = JSON.parse(event.body)
        const parseResult = FullArticleSchema.safeParse(rawDocument)
        const urlParseResult = UrlOnlySchema.safeParse(rawDocument)
        if (!parseResult.success && !urlParseResult.success) {
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
        } else if (parseResult.success) {
            const now = new Date().toISOString()
            const today = new Date().toISOString().split('T')[0]
            processedDocument = {
                PK: `DATE#${today}`,
                SK: generateKey(rawDocument.url),
                ...rawDocument,
                createdAt: now,
                updatedAt: now,
            }
        } else if (urlParseResult.success) {
            const result = await dmsScrape(rawDocument.url)
            const now = new Date().toISOString()
            const today = new Date().toISOString().split('T')[0]
            processedDocument = {
                PK: `DATE#${today}`,
                SK: generateKey(rawDocument.url),
                ...result,
                createdAt: now,
                updatedAt: now,
            }
        }

        await docClient.send(
            new PutCommand({
                TableName: tableName,
                Item: processedDocument,
                ConditionExpression: 'attribute_not_exists(SK)',
            })
        )
        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Success' }),
        }
    } catch (error) {
        if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referenceId: context.awsRequestId,
                    message: `Error occurred with database provider.`,
                }),
            }
        }
        if (error instanceof Error) {
            // Fetch errors put the network root cause in error.cause
            const cause = (error as { cause?: unknown }).cause
            console.error('Scrape or Request Error:', {
                message: error.message,
                cause: cause instanceof Error ? cause.message : cause,
                stack: error.stack,
            })
        }
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                referenceId: context.awsRequestId,
                message: 'Failed to retrieve or process URL payload.',
                details: error.message,
                cause: cause instanceof Error ? cause.message : cause,
            }),
        }
    }
}
