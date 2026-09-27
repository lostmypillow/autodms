import type { CheerioAPI } from 'cheerio'
import type { NewsArticle } from 'shared/dmsScrape/interfaces.js'

export function MASHDIGI($: CheerioAPI): NewsArticle {
    const data: NewsArticle = {
        title: '',
        date: '',
        author: '',
        content: [],
        source: 'string;',
    }
    const link = $('link[rel="canonical"]').attr('href')
    data.title = $('meta[property="og:title"]').attr('content').trim()
    data.date = $('meta[property="article:published_time"]')
        .attr('content')
        .split('T')[0]
    data['author'] = $('meta[name="twitter:data1"]')
        .attr('content')
        .replace(' (Mash Yang)', '')

    data['content'] = []
    $('div.content-inner p').each(function () {
        const htmlContent = $(this).html().trim()
        const textContent = $(this).text().trim()

        if (
            !htmlContent.includes('<img') &&
            !textContent.startsWith('▲') &&
            textContent !== ''
        ) {
            data['content'].push(textContent.replace('undefined', '').trim())
        }
    })
    data['source'] = 'Mashdigi'
    return data
}
