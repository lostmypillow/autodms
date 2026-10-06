import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from '../../interfaces.js'

export function SOGI($: CheerioAPI): NewsArticle {
    return <NewsArticle>$.extract({
        title: 'h1.h1',
        author: {
            selector: 'div.d-inline-block:nth-child(2) > a:nth-child(2)',
        },
        date: {
            selector: 'div.d-inline-block.mr-3',
            value: (el) =>
                $(el)
                    .text()
                    .replace('\n', '')
                    .trim()
                    .replace(/\//g, '-')
                    .split(' (')[0],
        },
        content: {
            selector: 'div.editable.my-2',
            value: (el) => {
                const $clone = $(el).clone()
                // Replace <br> tags with newline tokens
                $clone.find('br').replaceWith('\n')

                return $clone
                    .text()
                    // Replace non-breaking spaces, full-width spaces, and zero-width spaces
                    .replace(
                        /[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g,
                        ' '
                    )
                    // Split on two or more consecutive newlines
                    .split(/\n\s*\n+/)
                    // Clean whitespace inside each paragraph
                    .map((line) => line.replace(/\s+/g, ' ').trim())
                    .filter((line) => line.length > 0)
            },
        },
        source: {
            selector: ':root',
            value: () => '手機王',
        },
    })
}
