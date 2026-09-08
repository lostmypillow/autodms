import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { UpdateParamsSchema } from 'core/schemas/UpdateParamsSchema.js'
import { Router } from 'express'
import { v7 as uuidv7 } from 'uuid'
import 'dotenv/config'
import { docClient } from '../lib/initTable.js'

const tableName: string = process.env['TABLE_NAME'] || ''

const router = Router()

router.post('/', async (req, res) => {
    try {
        if (!req.body) {
            res.status(400)
            res.json({
                message: 'Request body is malformed',
            })
            return
        }
        const parseResult = UpdateParamsSchema.safeParse(req.body)
        if (!parseResult.success) {
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
        }

        const changeList =
            typeof req.body === 'string' ? JSON.parse(req.body) : req.body
        const attributeNames: Record<string, string> = {}
        const attributeValues: Record<string, any> = {}
        const updateExpressionsArray: string[] = []

        let dateKey: string | undefined
        let urlHash: string | undefined

        for (const [key, value] of Object.entries(changeList)) {
            if (key === 'dateKey') {
                dateKey = `DATE#${value}`
            } else if (key === 'urlHash') {
                urlHash = `URL#${value}`
            } else {
                const nameKey = `#${key}`
                const valueKey = `:${key}`

                attributeNames[nameKey] = key
                attributeValues[valueKey] = value
                updateExpressionsArray.push(`${nameKey} = ${valueKey}`)
            }
        }

        // Prevent empty UpdateExpression errors
        if (updateExpressionsArray.length === 0) {
            return // or handle case where there are no attributes to update
        }

        const updateExpression = `SET ${updateExpressionsArray.join(', ')}`

        const result = await docClient.send(
            new UpdateCommand({
                TableName: tableName,
                Key: {
                    SK: dateKey,
                    PK: urlHash,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: attributeNames,
                ExpressionAttributeValues: attributeValues,
                ReturnValues: 'ALL_NEW',
            })
        )
        res.status(200)
        res.json({
            message: 'Document update complete',
            data: result.Attributes,
        })
        return
    } catch (error: any) {
        if (error.name === 'ConditionalCheckFailedException') {
            res.status(400)
            res.json({
                message: 'Update failed: condition z = 5 was not met.',
            })
            return
        } else if (error instanceof TypeError) {
            console.error(JSON.stringify(error))
            res.status(400)
            res.json({
                referenceId: uuidv7(),
                message: `Data in body contains type error. Error reference ID: ${uuidv7()}`,
            })
            return
        } else if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            res.json({
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Error occurred with database provider. Error reference ID: ${uuidv7()}`,
                }),
            })
            return
        } else {
            console.error(JSON.stringify(error))

            res.status(400)
            res.json({
                referenceId: uuidv7(),
                message: `Unknown error occurred. Error reference ID: ${uuidv7()}`,
            })
            return
        }
    }
})
export default router
