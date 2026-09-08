import {
    DynamoDBClient,
    DeleteTableCommand,
    CreateTableCommand,
    ResourceNotFoundException,
    ResourceInUseException,
    waitUntilTableExists,
    waitUntilTableNotExists,
} from '@aws-sdk/client-dynamodb'
import 'dotenv/config'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
const endpoint = process.env.DYNAMODB_ENDPOINT
const hasCustomCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID)

const rawClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    ...(endpoint && { endpoint }),
    ...(hasCustomCredentials && {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            ...(process.env.AWS_SESSION_TOKEN && {
                sessionToken: process.env.AWS_SESSION_TOKEN,
            }),
        },
    }),
})
export const docClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(rawClient)
export async function initTable() {
    console.log(`[Init] Checking table ${process.env.TABLE_NAME}...`)

    try {
        await rawClient.send(
            new DeleteTableCommand({ TableName: process.env.TABLE_NAME })
        )
        console.log(
            `[Init] Deleting existing table ${process.env.TABLE_NAME}...`
        )

        await waitUntilTableNotExists(
            { client: rawClient, maxWaitTime: 120 },
            { TableName: process.env.TABLE_NAME }
        )
    } catch (error) {
        if (!(error instanceof ResourceNotFoundException)) throw error
    }

    // 2. Create the table
    try {
        const TABLE_NAME = process.env['TABLE_NAME']!
        await rawClient.send(
            new CreateTableCommand({
                TableName: TABLE_NAME,
                KeySchema: [
                    { AttributeName: 'PK', KeyType: 'HASH' },
                    { AttributeName: 'SK', KeyType: 'RANGE' },
                ],
                AttributeDefinitions: [
                    { AttributeName: 'PK', AttributeType: 'S' },
                    { AttributeName: 'SK', AttributeType: 'S' },
                ],
                GlobalSecondaryIndexes: [
                    {
                        IndexName: 'SK-index',
                        KeySchema: [
                            { AttributeName: 'SK', KeyType: 'HASH' }, // Query directly by date
                            { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sorts items chronologically
                        ],
                        Projection: { ProjectionType: 'ALL' },
                    },
                ],
                BillingMode: 'PAY_PER_REQUEST',
            })
        )
        await waitUntilTableExists(
            { client: rawClient, maxWaitTime: 120 },
            { TableName: process.env.TABLE_NAME }
        )
        await rawClient.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    SK: 'DATE#2026-09-30',
                    PK: 'URL#44e99e457ac35cc5751a254b82bb0422af6e4f2069bfd65a8c5f49025bdb51bc',
                    title: 'AMD宣布為AM5主機板釋出AGESA 1.2.0.2 BIOS韌體，解放Ryzen 9000處理器的105W cTDP模式與改善多CCD延遲',
                    date: '2024-09-30',
                    author: 'Chevelle.fu',
                    content:
                        'AMD於AMD X870E、X870主機板解禁後宣布為AMD 600系列與AMD 800系列的主機板釋出AGESA Pi 1.2.0.2 BIOS韌體，進一步提升Ryzen 9000系列處理器的性能，其中針對Ryzen 5 9600X、Ryzen 7 9700X提供獲得AMD官方嚴謹測試且不影響保固的105W cTDP模式，多核效能將顯著提升，同時Ryzen 7000與Ryzen 9000系列由兩個CCD構成的Ryzen 9處理器則能改善核心延遲。\n\n消費者在安裝透過板卡廠釋出包含AGESA Pi 1.2.0.2的韌體後將能進一步解放Ryzen 9000處理器的性能；其中原本設定於65W TDP的Ryzen 5 9600X、Ryzen 7 9700X可於BIOS開啟105W cTDP模式(預設為關閉，需手動於BIOS開啟)，此模式已經過AMD嚴謹測試，不會影響處理器保固，旨在顯著提升多核心運算的性能，對於單核心性能也會有些許的提升，不過AMD強調雖然工程團隊確保105W cTDP模式不會超出處理器的負荷範圍，但建議消費者須搭配合適的散熱器使用。\n\nAMD X870可支援DDR5-8000 EXPO記憶體\n\nAMD目前AM5平台主機板的功能與規格比較\n\n隨著Ryzen 9000系列一起公布的全新晶片組AMD X870與AMD X870E主機板也於即日起推出，AMD X870與AMD X870E晶片為AMD X670與AMD X670E的增強版，皆於NVMe與PCIe通道提供全速的PCIe Gen 5，同時標配USB 4介面，並支援DDR-8000 EXPO，相較DDR-6000可縮減1ns至2ns的延遲，滿足極緻玩家與超頻玩家的需求。',
                    source: 'Cool3c',
                    category: 'E',
                    url: 'https://www.cool3c.com/article/225793',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            })
        )
        await rawClient.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    SK: 'DATE#2026-09-30',
                    PK: 'URL#c4c531283353bc2be26166eff42bdd280ec72b51485b43b7c57bb8a7e82c4636',
                    title: '高通推出全新8 核Snapdragon X Plus，將效能領先地位擴展到更多的Copilot+ PC使用者',
                    date: '2024-09-06',
                    source: 'XFastest',
                    author: 'Kimi',
                    content:
                        '高通推出全新8 核Snapdragon X Plus，將效能領先地位擴展到更多的Copilot+ PC使用者\n高通執行長Cristiano Amon在IFA展前登台，宣布擴展Snapdragon X系列的產品組合，助力OEM廠商推出700至900美元價格範圍內的Copilot+ PC。\n8核Snapdragon X Plus維持其在輕薄型PC中的效能領先地位，配備客製化的高通Oryon CPU和同級中最佳的功耗效率，為使用者提供反應迅速的效能和多達數日的電池續航力。\n消費者和企業使用者將透過45 TOPS NPU，帶來突破性的裝置上AI體驗，並在更多裝置上導入Copilot+。宏碁、華碩、戴爾、惠普、聯想、三星等大廠將推出搭載8 核Snapdragon X Plus的產品，部分裝置現已上市。\n【2024年9月4日，柏林訊】高通技術公司在2024年柏林消費性電子展（IFA 2024）展前宣布推出8核Snapdragon X Plus，擴展其Snapdragon X系列產品組合。此一突破性平台將為更多使用者提供多達數日的電池續航力、前所未有的效能和AI驅動的Copilot+體驗。\nSnapdragon X Plus平台由8核心的高通Oryon CPU提供支援，實現如閃電般迅速的反應速度和效率，提供61%更快的CPU效能，而競爭對手的產品在同效能的所需功耗多出179%。此平台採用整合GPU和並支援多達三台外部顯示器，確保出色的圖像和沉浸的視覺體驗。\n8 核Snapdragon X Plus受惠於45 TOPS的強大NPU核心，具備先進的AI 處理能力和領先的每瓦效能，結合平台在連網方面的重大進步，將帶來具驚人的電池續航力的超便攜設計，將生產力推向新高度。無論是隨時隨地建立簡報或視訊會議，此平台的多樣化功能將實現變革的體驗。\n高通總裁暨執行長Cristiano Amon\n表示：「全球首款也同時是全球最佳的Copilot+ PC由Snapdragon X系列平台提供支援，開創個人運算的新世代，這一切都歸功於我們突破性的NPU。現在透過8核Snapdragon X Plus，高通為全球更多使用者帶來變革的AI體驗，以及由我們高功效的客製化高通Oryon CPU所提供的同級最佳效能和前所未有的電池續航力。我們很自豪能與領先的全球OEM廠商和零售夥伴攜手，擴展我們的產品組合，驅動企業客戶和消費者。」\n華碩消費電腦事業部副總裁張仰光\n表示：「我們很高興看到8核心版Snapdragon X Plus平台將Copilot+ 的變革力量帶給全球更多使用者。華碩致力於推廣ProArt PZ13等尖端技術，使其普及至全球各地的使用者，與高通合作是朝此方向邁進的重要一步。」\n微軟Windows+裝置部門副總裁Pavan Davuluri\n表示：「高通推出的8核Snapdragon X Plus是自五月以來的Copilot+ PC所帶來的驚人能量與動能。高通的突破性平台帶來全天候的電池續航力、無與倫比的效能和效率，加上其強大的NPU，將為更多使用者帶來AI驅動的Windows體驗。我們將持續與高通在橫跨整個Windows生態系合作，突破Copilot+ PC可能性的界限。」\n搭載8 核Snapdragon X Plus平台的部分PC即日起上市。\n產品簡介',
                    category: 'A',
                    url: 'https://www.xfastest.com/thread-291944-1-1.html',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            })
        )

        console.log(
            `[Init] Table ${process.env.TABLE_NAME} is active and ready.`
        )
    } catch (error) {
        if (!(error instanceof ResourceInUseException)) throw error
    }
}
