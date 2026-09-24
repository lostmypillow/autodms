// Get the full HTML of the document
const fullHTML = document.documentElement.outerHTML
const pageURL = window.location.href
// Create a temporary DOM element to manipulate the HTML
const tempDiv = document.createElement('div')
tempDiv.innerHTML = fullHTML

// Remove all <script> and <style> tags
const scriptsAndStyles = tempDiv.querySelectorAll(
    'script, style, link, g, noscript, svg, img, symbol, figure, figcaption, ins'
)
scriptsAndStyles.forEach((tag) => tag.remove())
const { dmsScrape } = await import('shared/dmsScrape')
const data = await dmsScrape(pageURL, tempDiv.innerHTML)
// Send the cleaned HTML back to the background script
browser.runtime.sendMessage({
    action: 'sendHTMLFromContent',
    html: tempDiv.innerHTML,
    url: pageURL,
    scrape: data
})
