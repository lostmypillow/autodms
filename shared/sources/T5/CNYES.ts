import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from '../../interfaces.js'

export function CNYES($: CheerioAPI): NewsArticle {
    const base = $.extract({
        title: {
            selector: 'title',
            value: (el) => $(el).text().split('|')[0].trim(),
        },
        date: {
            selector: 'time:nth-child(3)',
            value: (el) => $(el).text(),
        },

        author: {
            selector: 'span.signature',
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
    })
    return {
        ...base,
        source: '鉅亨網',
    } as NewsArticle

}
