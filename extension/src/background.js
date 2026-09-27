const ext = globalThis.browser || globalThis.chrome

const API_URL = 'http://localhost:3000/add'
import scraperScript from './scraper.js?script'

function createTabAndScrape(url) {
    ext.tabs.create({ url: url, active: false })
        .then((newTab) => {
        function onTabLoaded(details) {
            // Ensure the event matches our tab and the main frame
            if (details.tabId === newTab.id && details.frameId === 0) {
                browser.webNavigation.onCompleted.removeListener(onTabLoaded)

                browser.scripting.executeScript({
                    target: { tabId: newTab.id },
                    files: [scraperScript],
                })
            }
        }

        ext.webNavigation.onCompleted.addListener(onTabLoaded)
    })
}

async function postData(data = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return await response.json()
    } catch (error) {
        console.error('Request failed:', error)
    }
}

// Handle context menu
ext.runtime.onInstalled.addListener(() => {
    ext.contextMenus.create({
        id: 'log-link-url',
        title: 'Send to DMS',
        contexts: ['link'],
    })
})

ext.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'log-link-url') {
        console.log(info.linkUrl)
        createTabAndScrape(info.linkUrl)
    }
})

// Handle scraping complete and notify Vue tab
ext.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'PING') {
        sendResponse({ status: 'pong', timestamp: Date.now() })
        return
    }

    if (request.action === 'SCRAPE') {
        createTabAndScrape(request.url)
    }

    if (request.action === 'sendHTMLFromContent') {
        (async () => {
            if (sender.tab?.id) {
                await ext.tabs.remove(sender.tab.id)
            }
            await postData(request.scrape)

            await ext.notifications.create({
                type: 'basic',
                iconUrl: ext.runtime.getURL('icons/48.png'),
                title: 'Scrape Complete',
                message: `Added to DMS: ${request.url}`,
            })
        })()

        return true
    }
})
