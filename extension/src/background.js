const WS_URL = 'ws://localhost:3000'
let socket = null
import scraperScript from './scraper.js?script'
function connectWebSocket() {
    socket = new WebSocket(WS_URL)

    socket.onopen = () => {
        console.log('[Extension] Connected to WebSocket')
        // Send a message upon connecting
        socket.send(
            JSON.stringify({ type: 'EXTENSION_INIT', id: chrome.runtime.id })
        )
    }

    // Listen for messages from Express or other clients
    socket.onmessage = (event) => {
        console.log('[Extension] Received:', event.data)

        try {
            const parsed = JSON.parse(event.data)
            // Handle specific event types
            if (parsed.event === 'REQUEST') {
                browser.tabs
                    .create({ url: parsed.data, active: false })
                    .then((newTab) => {
                        function onTabLoaded(details) {
                            // Ensure the event matches our tab and the main frame
                            if (
                                details.tabId === newTab.id &&
                                details.frameId === 0
                            ) {
                                browser.webNavigation.onCompleted.removeListener(
                                    onTabLoaded
                                )

                                browser.scripting.executeScript({
                                    target: { tabId: newTab.id },
                                    files: [scraperScript],
                                })
                            }
                        }

                        browser.webNavigation.onCompleted.addListener(
                            onTabLoaded
                        )
                    })
            }
        } catch (e) {
            // Handle raw text/string messages
        }
    }

    socket.onclose = () => {
        console.log('[Extension] Disconnected. Reconnecting in 5s...')
        setTimeout(connectWebSocket, 5000)
    }

    socket.onerror = (error) => {
        console.error('[Extension] WebSocket error:', error)
    }
}

// Initialize connection
connectWebSocket()

let activePort = null
// Listen for connections from content.js on target pages
browser.runtime.onConnect.addListener((port) => {
    if (port.name === 'keep-alive-worker') {
        activePort = port
        port.onMessage.addListener((msg) => {
            if (msg.type === 'PING') {
                // Receiving this message automatically resets Chrome's SW idle timer
                console.log(
                    '[SW] Ping received from target page - keeping alive'
                )
            }
        })
        port.onDisconnect.addListener(() => {
            activePort = null
        })
    }
})

browser.runtime.onMessage.addListener(async (request, sender) => {
    if (request.action === 'sendHTMLFromContent') {
        console.log(request)
        await browser.tabs.remove(sender.tab.id)
        try {
            activePort.postMessage({
                action: 'DATA_FROM_BACKGROUND',
                payload: request.scrape,
            })

        // Output of responseData:
        // { success: true, message: "Data received successfully!", receivedId: 1042 }
    } catch (error) {
        // Output of error (if server is down): TypeError: Failed to fetch
        console.error('Error posting data:', error)
    }
    }
})
