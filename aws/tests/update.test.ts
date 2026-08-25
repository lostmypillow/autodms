import { describe, it, expect } from 'vitest'
import type {
    Context,
    APIGatewayProxyEventV2 as LambdaFunctionUrlEvent,
} from 'aws-lambda'
import { handler } from '../src/update.js'

describe('Updates News Article to DynamoDB Test', () => {
    it('updates new article and ensure it is present in database', async () => {
        const mockContext: Context = {
            done(): void {},
            fail(): void {},
            callbackWaitsForEmptyEventLoop: false,
            awsRequestId: 'test-request-id-12345',
            functionName: 'test-dms-update',
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
                body: {
                    title: 'AMD AGESA 1.2.0.2',
                    date: '2026-09-30',
                    author: 'Chevelle.fuck',
                    source: 'FT',
                    category: 'E',
                },
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
        const parsedBody = JSON.parse(response.body).data

        expect(parsedBody).toBeDefined()
        expect(parsedBody.PK).toBe(`DATE#2026-09-30`)
        expect(parsedBody.title).toBe('AMD AGESA 1.2.0.2')
        expect(parsedBody.date).toBe('2026-09-30')
        expect(parsedBody.author).toBe('Chevelle.fuck')
        expect(parsedBody.source).toBe('FT')
        expect(parsedBody.content).toBe(
            'AMD於AMD X870E、X870主機板解禁後宣布為AMD 600系列與AMD 800系列的主機板釋出AGESA Pi 1.2.0.2 BIOS韌體，進一步提升Ryzen 9000系列處理器的性能，其中針對Ryzen 5 9600X、Ryzen 7 9700X提供獲得AMD官方嚴謹測試且不影響保固的105W cTDP模式，多核效能將顯著提升，同時Ryzen 7000與Ryzen 9000系列由兩個CCD構成的Ryzen 9處理器則能改善核心延遲。\n\n消費者在安裝透過板卡廠釋出包含AGESA Pi 1.2.0.2的韌體後將能進一步解放Ryzen 9000處理器的性能；其中原本設定於65W TDP的Ryzen 5 9600X、Ryzen 7 9700X可於BIOS開啟105W cTDP模式(預設為關閉，需手動於BIOS開啟)，此模式已經過AMD嚴謹測試，不會影響處理器保固，旨在顯著提升多核心運算的性能，對於單核心性能也會有些許的提升，不過AMD強調雖然工程團隊確保105W cTDP模式不會超出處理器的負荷範圍，但建議消費者須搭配合適的散熱器使用。\n\nAMD X870可支援DDR5-8000 EXPO記憶體\n\nAMD目前AM5平台主機板的功能與規格比較\n\n隨著Ryzen 9000系列一起公布的全新晶片組AMD X870與AMD X870E主機板也於即日起推出，AMD X870與AMD X870E晶片為AMD X670與AMD X670E的增強版，皆於NVMe與PCIe通道提供全速的PCIe Gen 5，同時標配USB 4介面，並支援DDR-8000 EXPO，相較DDR-6000可縮減1ns至2ns的延遲，滿足極緻玩家與超頻玩家的需求。'
        )
        expect(parsedBody.category).toBe('E')
        expect(parsedBody.url).toBe('https://www.cool3c.com/article/225793')
    })
})
