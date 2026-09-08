import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import {
    FullArticleSchema,
    type NewsArticleAddition,
    UrlOnlySchema,
} from 'core/schemas/NewsArticle.js'
import { dmsScrape } from 'core'
import { v7 as uuidv7 } from 'uuid'
import 'dotenv/config'
import { Router } from 'express'
import { generateKey } from '../lib/generateKey.js'
import { docClient } from '../lib/initTable.js'
import { generateKeyBetween } from 'fractional-indexing'
const tableName: string = process.env['TABLE_NAME'] || ''
// TODO: compotech returns 404 page
const router = Router()

router.post('/', async (req, res) => {
    let processedDocument
    const eventBody = req.body
    console.log(req.body)
    try {
        if (!eventBody) {
            res.status(400)
            res.json({ message: 'Request body is malformed' })
            return
        }
        const rawDocument: NewsArticleAddition = eventBody
        const parseResult = FullArticleSchema.safeParse(rawDocument)
        const urlParseResult = UrlOnlySchema.safeParse(rawDocument)
        if (!parseResult.success && !urlParseResult.success) {
            const missingOrInvalid = parseResult.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                issue: issue.message,
            }))

            res.status(400)

            res.json({
                referenceId: uuidv7(),
                message: 'Validation failed.',
                errors: missingOrInvalid,
            })
            return
        } else if (parseResult.success) {
            const now = new Date().toISOString()
            const today = new Date().toISOString().split('T')[0]
            processedDocument = {
                SK: `DATE#${today}`,
                PK: generateKey(rawDocument.url),
                ...rawDocument,
                createdAt: now,
                updatedAt: now,
            }
        } else if (urlParseResult.success) {
            const result = await dmsScrape(rawDocument.url)
            if (!result) {
                res.json({
                    message: 'dmsScrape sent malformed data',
                })
                return
            }
            const now = new Date().toISOString()
            const today = new Date().toISOString().split('T')[0]

            const response = await docClient.send(
                new QueryCommand({
                    TableName: tableName,
                    IndexName: 'SK-index',
                    KeyConditionExpression: 'SK = :sk',
                    FilterExpression: 'category = :cat',
                    ExpressionAttributeValues: {
                        ':sk': `DATE#${today}`,
                        ':cat': result.category,
                    },
                    ScanIndexForward: false,
                    Limit: 1,
                })
            )

            const lastItem = response.Items?.[0]
            const lastOrderKey = lastItem?.orderKey ?? null
            processedDocument = {
                SK: `DATE#${today}`,
                PK: generateKey(rawDocument.url),
                ...result,
                orderKey: `${generateKeyBetween(lastOrderKey, null)}`,
                createdAt: now,
                updatedAt: now,
            }
        }

        await docClient.send(
            new PutCommand({
                TableName: tableName,
                Item: processedDocument,
                ConditionExpression: 'attribute_not_exists(PK)',
            })
        )
        res.status(201)
        res.json({ message: 'Success' })
        return
    } catch (error) {
        if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            res.status(400)
            res.json({
                referenceId: uuidv7(),
                message: `Error occurred with database provider.`,
            })
            return
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
        res.status(500)
        res.json({
            referenceId: uuidv7(),
            message: 'Failed to retrieve or process URL payload.',
        })
        return
    }
})

export default router
