import { describe, it, expect } from 'vitest'
import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
} from 'aws-lambda'
import { handler } from '../src/delete.js'
import { testDocClient } from '../setup.js'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
const TABLE_NAME = process.env['TABLE_NAME'] ?? 'TestTable'

describe('Deletes News Article to DynamoDB Test', () => {
    it('delets new article and ensure it is NOT present in database', async () => {
        const mockContext: Context = {
            done(): void {},
            fail(): void {},
            callbackWaitsForEmptyEventLoop: false,
            awsRequestId: 'test-request-id-12345',
            functionName: 'test-dms-delete',
            functionVersion: '$LATEST',
            invokedFunctionArn:
                'arn:aws:lambda:us-east-1:123456789012:function:test-dms-add',
            memoryLimitInMB: '128',
            logGroupName: '/aws/lambda/test-function',
            logStreamName: '2026/08/25/[$LATEST]12345',
            getRemainingTimeInMillis: () => 30000,
            succeed: () => {},
        }
        const response = await handler(
            {
                rawPath:
                    '/2026-09-30/44e99e457ac35cc5751a254b82bb0422af6e4f2069bfd65a8c5f49025bdb51bc',
            } as unknown as LambdaFunctionUrlEvent,
            mockContext
        )
        // console.log('\n--- HANDLER RESPONSE ---')
        // console.log(JSON.stringify(response, null, 2))
        if (typeof response === 'object' && 'statusCode' in response) {
            expect(response.statusCode).toBe(200)
        } else {
            throw new Error(
                `Expected structured object response, but received: ${response}`
            )
        }

        const scanResult = await testDocClient.send(
            new ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: 'SK = :sk',
                ExpressionAttributeValues: {
                    ':sk': `URL#44e99e457ac35cc5751a254b82bb0422af6e4f2069bfd65a8c5f49025bdb51bc`,
                },
            })
        )

        expect(scanResult.Items?.length).toBe(0)
    })
})
