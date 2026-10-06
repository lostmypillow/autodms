import { describe, expect, test } from 'vitest'
import { dmsScrape } from '../index.js'
import { NewsArticle, NewsArticleTestSchema } from '../interfaces.js'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
describe('Test scraping from fetch', () => {
    test('scrape kocpc', async () => {
        const result = await dmsScrape(
            'https://www.kocpc.com.tw/archives/563640'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape technews', async () => {
        const result = await dmsScrape(
            'https://technews.tw/2024/09/12/snapdragon-8-gen-4-and-dimensity-9400-configuration-unveiled/'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape xfastest', async () => {
        const result = await dmsScrape(
            'https://www.xfastest.com/thread-291944-1-1.html'
        )

        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape ettoday', async () => {
        const result = await dmsScrape(
            'https://www.ettoday.net/news/20240905/2810968.htm'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape udn', async () => {
        const result = await dmsScrape(
            'https://udn.com/news/story/6813/9796413?from=udn_ch2_menu_v2_main_cate'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape money udn', async () => {
        const result = await dmsScrape(
            'https://money.udn.com/money/story/5618/9796450'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    // Will pass, but doesn't work behind Cloudflare WARP. Fucking dumbass engineers over there.
    // test('scrape ltn 3c', async () => {
    //     const result = await dmsScrape('https://3c.ltn.com.tw/news/59270')
    //     expect(result).toMatchObject(NewsArticleTestSchema)
    // })
    //
    // Will pass, but doesn't work behind Cloudflare WARP. Fucking dumbass engineers over there.
    // test('scrape ltn ec', async () => {
    //     const result = await dmsScrape(
    //         'https://ec.ltn.com.tw/article/breakingnews/4790282'
    //     )
    //     expect(result).toMatchObject({
    //         source: '自由時報',
    //         title: expect.any(String),
    //         content: expect.any(String),
    //         url: 'https://ec.ltn.com.tw/article/breakingnews/4790282',
    //     })
    // })

    // TODO: fix failed test here


    test('scrape inside', async () => {
        const result = await dmsScrape(
            // TODO: cloudflare
            'https://www.inside.com.tw/article/36326-meta-announces-300-quest-3s-a-cheaper'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape compotechasia', async () => {
        const result = await dmsScrape(
            'https://www.compotechasia.com/a/new_product/2024/0919/58658.html'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape xfastest bug', async () => {
        const result = await dmsScrape(
            'https://www.xfastest.com/thread-292861-1-1.html'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape eprice bug', async () => {
        const result = await dmsScrape(
            'https://www.eprice.com.tw/mobile/talk/6113/5812708/1'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    // TODO: unable to fix now
    // test('scrape digitimes undefined bug', async () => {
    //   const result = await dmsScrape(
    //     'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?cnlid=1&id=0000703998_EAN8YJ9ZLL4AQU7Z9IWZT',
    //   );
    //   expect(result).toMatchObject(NewsArticleTestSchema);
    // });

    test('scrape money udn bug', async () => {
        const result = await dmsScrape(
            'https://money.udn.com/money/story/122328/9796048'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape eprice alternative', async () => {
        const result = await dmsScrape(
            'https://www.eprice.com.tw/mobile/talk/4523/5811558/1/'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape money udn alternative', async () => {
        const result = await dmsScrape(
            'https://money.udn.com/money/story/7307/9795061'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape setn', async () => {
        const result: undefined | NewsArticle = await dmsScrape(
            'https://www.setn.com/News.aspx?NewsID=1526574'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape money udn no match found', async () => {
        const result = await dmsScrape(
            'https://money.udn.com/money/story/5607/9779351'
        )
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape ltn 3c secondary', async () => {
        const result = await dmsScrape('https://3c.ltn.com.tw/news/59704')
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    test('scrape cnyes', async () => {
        const result = await dmsScrape('https://news.cnyes.com/news/id/5745265')

        expect(result).toMatchObject(NewsArticleTestSchema)
    })
})

