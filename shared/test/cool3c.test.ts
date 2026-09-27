import { describe, expect, it, test } from 'vitest'
import { dmsScrape } from 'shared/index.js'
import { NewsArticleTestSchema } from 'shared/interfaces.js'

describe('Test scraping cool3c articles', ()=> {
    it('should successfully parse an old article (20279)', async () => {
        const asset = (await import('../assets/cool3c/20279.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape('https://www.cool3c.com/article/202079', asset )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    it('should parse the  latest homepage article (252265)', async () => {
        const asset = (await import('../assets/cool3c/252265.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    it('should successfully parse an article from category 應用教學', async () => {
        const asset = (await import('../assets/cool3c/teaching.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 開箱評測', async () => {
        const asset = (await import('../assets/cool3c/review.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 新奇搞笑', async () => {
        const asset = (await import('../assets/cool3c/fresh.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 蘋果新聞', async () => {
        const asset = (await import('../assets/cool3c/apple.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category App', async () => {
        const asset = (await import('../assets/cool3c/app.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 新品資訊', async () => {
        const asset = (await import('../assets/cool3c/product.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 人物專訪', async () => {
        const asset = (await import('../assets/cool3c/people.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 科學新知', async () => {
        const asset = (await import('../assets/cool3c/science.html?raw')).default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 產業消息', async () => {
        const asset = (await import('../assets/cool3c/industry.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 科技應用', async () => {
        const asset = (await import('../assets/cool3c/technology.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 雲端服務', async () => {
        const asset = (await import('../assets/cool3c/cloud.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 遊戲天堂', async () => {
        const asset = (await import('../assets/cool3c/game.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 文化創意', async () => {
        const asset = (await import('../assets/cool3c/creative.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 專家觀點', async () => {
        const asset = (await import('../assets/cool3c/focus.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 在地生活', async () => {
        const asset = (await import('../assets/cool3c/localnews.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 快訊', async () => {
        const asset = (await import('../assets/cool3c/newsletter.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 電影劇線上看', async () => {
        const asset = (await import('../assets/cool3c/movie-drama.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article from category 汽車未來', async () => {
        const asset = (await import('../assets/cool3c/car.html?raw'))
            .default
        expect(typeof asset).eq('string')
        const result = await dmsScrape(
            'https://www.cool3c.com/article/252265',
            asset
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
})
