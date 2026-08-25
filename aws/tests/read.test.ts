import { describe, it, expect } from 'vitest'
import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
} from 'aws-lambda'
import { handler } from '../src/read.js'
describe('Read News Article in DynamoDB Test', () => {
    it('executes read handler and reads item', async () => {
        const mockContext: Context = {
            done(): void {},
            fail(): void {},
            callbackWaitsForEmptyEventLoop: false,
            awsRequestId: 'test-request-id-12345',
            functionName: 'test-dms-read',
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
                queryStringParameters: {
                    targetDate: '2026-09-30',
                },
            } as unknown as LambdaFunctionUrlEvent,
            mockContext
        )
        // console.log('\n--- HANDLER RESPONSE ---')
        // console.log(JSON.stringify(response, null, 2))
        if (typeof response === 'object' && 'statusCode' in response) {
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeDefined()
            // @ts-expect-error previous test already checks it
            const parsedBody = JSON.parse(response.body)
            expect(Array.isArray(parsedBody)).toBe(true)
            expect(parsedBody.length).toBeGreaterThan(0)
            expect(parsedBody).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        PK: expect.stringMatching(/^DATE#/),
                        SK: expect.any(String),
                        title: expect.any(String),
                        date: expect.any(String),
                        author: expect.any(String),
                        source: expect.any(String),
                        content: expect.any(String),
                        category: expect.any(String),
                        url: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }),
                ])
            )
        } else {
            throw new Error(
                `Expected structured object response, but received: ${response}`
            )
        }
    })
})
