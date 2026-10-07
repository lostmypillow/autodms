import * as cheerio from 'cheerio'

import { filterContent } from './filterContent.js'
import { determineCategory } from './determineCategory.js'
import { sources } from '../sources/index.js'
import { NotSupportedError } from './customErrors.js'
import { CheerioAPI } from 'cheerio'
import { NewsArticle } from '../interfaces.js'

function determineSource(link: string): ($: CheerioAPI) => NewsArticle {
    for (const [key, value] of Object.entries(sources)) {
        if (link.includes(key)) {
            return value
        }
    }
    throw new NotSupportedError(
        'AutoDMS does not support scraping for this website',
        link
    )
}

export async function processHTML(link: string, html: string | null = null) {
    let sourceHTML: string | null = html
    if (link && !html) {
        if (link.includes('lpcomment') && link.includes('/amp/')) {
            link = link.replace('amp/', '')
        }

        const rawText: string = await (
            await fetch(link, {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                },
            })
        ).text()
        const sanitizedText: string = rawText.replace(/\$\{/g, '')
        const $: CheerioAPI = cheerio.load(sanitizedText)
        $(
            'script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins'
        ).remove()
        sourceHTML = $.html()
    }
    if (!sourceHTML) {
        return
    }

    const handlerFunction: ($: CheerioAPI) => NewsArticle = determineSource(link)
    const scrapedContent: NewsArticle = handlerFunction(cheerio.load(sourceHTML))
    scrapedContent['content'] = Array.isArray(scrapedContent['content'])
            ? filterContent(scrapedContent['content']).join('\n\n')
            : []
        scrapedContent['title'] = scrapedContent['title'].replace(/《[^》]*》/g, '').trim()
        scrapedContent['category'] = determineCategory(scrapedContent['title'])
        scrapedContent['url'] = link
    return scrapedContent
}
