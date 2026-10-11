const fullHTML = document.documentElement.outerHTML
const pageURL = window.location.href
const tempDiv = document.createElement('div')
tempDiv.innerHTML = fullHTML
const scriptsAndStyles = tempDiv.querySelectorAll(
    'script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins'
)
scriptsAndStyles.forEach((tag) => tag.remove())
const { dmsScrape } = await import('shared')
const data = await dmsScrape(pageURL, tempDiv.innerHTML)
browser.runtime
    .sendMessage({
        action: 'sendHTMLFromContent',
        url: pageURL,
        scrape: data,
    })
    .then((r) =>
        console.log(
            `Scraped and sent back to background.js: ${JSON.stringify(r)}`
        )
    )
