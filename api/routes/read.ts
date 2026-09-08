import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
const tableName: string = process.env['TABLE_NAME'] || ''
import { Router } from 'express'
import { v7 as uuidv7 } from 'uuid'
import 'dotenv/config'
import { docClient } from '../lib/initTable.js'
const router = Router()

router.get('/:targetDate', async (req, res) => {
    try {
        const params = req.params

        const scanResult = await docClient.send(
            new ScanCommand({
                TableName: tableName,
                FilterExpression: 'SK = :sortkey',
                ExpressionAttributeValues: {
                    ':sortkey': `DATE#${params.targetDate}`,
                },
            })
        )

        res.json(scanResult.Items)
        return
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(JSON.stringify(error))
            res.json({
                referenceId: uuidv7(),
                message: `Data in body contains type error. ${JSON.stringify(error.message)}`,
            })
            return
        } else if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            res.json({
                referenceId: uuidv7(),
                message: `Error occurred with database provider.`,
            })
            return
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

            res.json({
                referenceId: uuidv7(),
                message: `Unknown error occurred. ${error instanceof Error ? JSON.stringify(error.message) : ''}`,
            })
            return
        }
    }
})
export default router
