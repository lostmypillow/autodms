import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from '../../interfaces.js'

export function CNYES($: CheerioAPI): NewsArticle {
    return <NewsArticle>$.extract({
        title: {
            selector: 'title',
            value: (el) => $(el).text().split('|')[0].trim(),
        },
        date: {
            selector: 'meta[property="article:published_time"]',
            value: (el) => $(el).attr('content')?.split('T')[0],
        },

        author: {
            selector:
                'span.signature',
            value: (el) =>
                $(el)
                    .text()
                    .replace(' ', '')
                    .replace('鉅亨網編輯', '')
                    .replace('綜合報導', ''),
        },

        content: [
            {
                selector: 'main#article-container section p',
                value: (el) => $(el).text().trim(),
            },
        ],
        source: '鉅亨網'
    })

}
