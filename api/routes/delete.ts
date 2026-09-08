import { DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { v7 as uuidv7 } from 'uuid'
import 'dotenv/config'
import { Router } from 'express'
import { docClient } from '../lib/initTable.js'

const tableName: string = process.env['TABLE_NAME'] || ''

const router = Router()

router.delete('/:key/:hash', async (req, res) => {
    try {
        const params = req.params
        const dateKey = `DATE#${params.key}`
        const urlHash = `URL#${params.hash}`

        await docClient.send(
            new DeleteCommand({
                TableName: tableName,
                Key: {
                    SK: dateKey,
                    PK: urlHash,
                },
            })
        )
        res.json({
            message: 'Document deletion complete',
        })
        return
    } catch (error: any) {
        if (error.name === 'ConditionalCheckFailedException') {
            res.json({
                message: 'Update failed: condition z = 5 was not met.',
            })
        } else if (error instanceof TypeError) {
            console.error(JSON.stringify(error))
            res.json({
                referenceId: uuidv7(),
                message: `Data in body contains type error. Error reference ID: ${uuidv7()}`,
            })
            return
        } else if (error instanceof DynamoDBServiceException) {
            console.error(JSON.stringify(error))
            res.json({
                message: `Error occurred with database provider. Error reference ID: ${uuidv7()}`,
            })
            return
        } else {
            console.error(JSON.stringify(error))

            res.json({
                referenceId: uuidv7(),
                message: `Unknown error occurred. Error reference ID: ${uuidv7()}`,
            })
            return
        }
    }
})
export default router
