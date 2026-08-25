import { describe, it, expect } from 'vitest'
import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
} from 'aws-lambda'
import { testDocClient } from '../setup.js'
import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { handler } from '../src/add.js'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = String(0)
const TABLE_NAME = process.env['TABLE_NAME'] ?? 'TestTable'
describe('Add News Article to DynamoDB Test', () => {
    it('adds new article manually and ensure it is present in database', async () => {
        const mockContext: Context = {
            done(): void {},
            fail(): void {},
            callbackWaitsForEmptyEventLoop: false,
            awsRequestId: 'test-request-id-12345',
            functionName: 'test-dms-add',
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
                body: JSON.stringify({
                    title: '聯想推3款AI筆電　瞄準創作者打造專屬軟體「可快速生成圖片」',
                    date: '2024-09-07',
                    author: '葉韋辰',
                    source: '三立新聞網',
                    content:
                        'Lenovo於2024年9月6日 舉行的IFA 2024柏林展會中展現其在AI技術領域的最新突破。此次新品包括家用及商用筆電，有搭載Intel Core Ultra處理器的「Lenovo Yoga Slim 7i Aura Edition」、使用Snapdragon X Plus處理器的「Lenovo IdeaPad Slim 5x」，以及專為企業客戶推出的旗艦商用筆 電「ThinkPad X1 Carbon Gen 13 Aura Edition」。此外，Lenovo還公開最新AI軟體「Lenovo Creator Zone」，進一步簡化創作過程。\n這次的產品發佈展現了Lenovo與Intel的密切合作，特別是推出了整合多項智慧功能的「Lenovo Aura Edition」系列。此系列筆電具備「智慧模式」可動態調整效能，提供個性化的使用體驗；「專注模式」則封鎖分心的網站，提升工作效率。健康功能包括護眼和姿勢警告，協作工具如虛擬演講者和背景模糊功能，優化視訊通話體驗，進一步提升遠距協作的效果。該系列筆電還具備智慧分享功能，支持Android和iOS系統，實現手機與筆電間的無縫圖像分享，強化了產品的多樣性和實用性。\nLenovo的商用筆電「ThinkPad X1 Carbon Gen 13 Aura Edition」延續了旗艦系列的輕巧設計，重量不到1公斤，是目前最輕的ThinkPad機種之一。此款筆電搭載Intel Core Ultra處理器和Intel Arc Xe2顯示卡，AI效能較前代高出三倍，電池續航力達18小時以上。該機型 還設有專用的Copilot按鍵，支援Microsoft最新的Copilot+ PC功能，並配備2.8K OLED防眩光螢幕及多項視覺和操作優化設計。此外，產品強調永續性，採用90%再生鎂製成，並榮獲EPEAT Gold和ENERGY STAR 9.0等環保認證。\nLenovo此次還推出了名為「AI PC Fast Start」的解決方案，旨在助力企業加速AI設備的部署和應用，通過AI驅動的諮詢和簡化流程，最大化投資報酬率。這一系列發佈展現了Lenovo在推動AI技術和產品創新方面的不懈努力，並致力於將更高效、智慧的科技應用於日常生活和工作中，期待進一步推動全球的智慧 化轉型。\n同時，Lenovo推出AI軟體「Lenovo Creator Zone」，讓用戶能以自然語言生成圖像，功能包含文字轉圖像、塗鴉轉圖像 、圖像轉圖像和進階圖像編輯。',
                    category: 'other',
                    url: 'https://www.setn.com/News.aspx?NewsID=1526574',
                }),
            } as LambdaFunctionUrlEvent,
            mockContext
        )
        // console.log('\n--- HANDLER RESPONSE ---')
        // console.log(JSON.stringify(response, null, 2))
        if (typeof response === 'object' && 'statusCode' in response) {
            expect(response.statusCode).toBe(201)
        } else {
            throw new Error(
                `Expected structured object response, but received: ${response}`
            )
        }

        const today = new Date().toISOString().split('T')[0]

        const scanResult = await testDocClient.send(
            new ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: 'PK = :sk',
                ExpressionAttributeValues: {
                    ':sk': `DATE#${today}`,
                },
            })
        )
        // console.log('\n--- DYNAMODB ITEMS WRITTEN ---')
        // console.log(JSON.stringify(scanResult.Items, null, 2))

        expect(scanResult.Items?.length).toBeGreaterThan(0)
        // @ts-expect-error It's a test?
        expect(scanResult.Items[0]).toBeDefined()
        expect(scanResult.Items).toEqual(
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
    })
    it('adds new article via link and ensure it is present in database', async () => {
        const mockContext: Context = {
            done(): void {},
            fail(): void {},
            callbackWaitsForEmptyEventLoop: false,
            awsRequestId: 'test-request-id-12345',
            functionName: 'test-dms-add',
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
                body: JSON.stringify({
                    url: 'https://www.cool3c.com/article/226021',
                }),
            } as LambdaFunctionUrlEvent,
            mockContext
        )
        console.log('\n--- HANDLER RESPONSE ---')
        console.log(JSON.stringify(response, null, 2))
        if (typeof response === 'object' && 'statusCode' in response) {
            expect(response.statusCode).toBe(201)
        } else {
            throw new Error(
                `Expected structured object response, but received: ${response}`
            )
        }

        const today = new Date().toISOString().split('T')[0]

        const scanResult = await testDocClient.send(
            new ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: 'PK = :sk',
                ExpressionAttributeValues: {
                    ':sk': `DATE#${today}`,
                },
            })
        )
        console.log('\n--- DYNAMODB ITEMS WRITTEN ---')
        console.log(JSON.stringify(scanResult.Items, null, 2))

        expect(scanResult.Items?.length).toBeGreaterThan(0)
        // @ts-expect-error It's a test?
        expect(scanResult.Items[0]).toBeDefined()
        expect(scanResult.Items).toEqual(
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
                    url: 'https://www.cool3c.com/article/226021',
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ])
        )
    })
})
