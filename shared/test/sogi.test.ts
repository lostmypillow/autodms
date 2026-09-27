import { describe, expect, it } from 'vitest'
import { dmsScrape } from 'shared'
import { NewsArticleTestSchema } from 'shared/interfaces.js'

describe('Test scraping sogi articles', () => {
    it('should successfully parse an old article (2024-09-04)', async () => {
        const result = await dmsScrape(
            'https://www.sogi.com.tw/articles/samsung_galaxy_s25_ultra/6262880'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('scrape sogi unwanted content', async () => {
        const result = await dmsScrape(
            'https://www.sogi.com.tw/articles/realme_13_pro_plus/6263085'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    it('scrape sogi mediatek', async () => {
      const result = await dmsScrape('https://www.sogi.com.tw/articles/mediatek/6263140');
      console.log(result)
      expect(result).toMatchObject(NewsArticleTestSchema);
    });

    it('scrape sogi promotion', async () => {
      const result = await dmsScrape(
        'https://www.sogi.com.tw/articles/samsung_galaxy_tab_s10_ultra/6263080',
      );
      console.log(result)
      expect(result).toMatchObject(NewsArticleTestSchema);
    });
})
