let port = null

function connectPort() {
    // Establish a long-lived Port connection to the Service Worker
    port = browser.runtime.connect({ name: 'keep-alive-worker' })
    port.onMessage.addListener((message) => {
        console.log('Content script received from background:', message)

        // 2. SEND TO VUE VIA WINDOW.POSTMESSAGE
        window.postMessage(
            {
                source: 'MY_EXTENSION_PORT',
                payload: message,
            },
            '*'
        )
    })
    port.onDisconnect.addListener(() => {
        // If the port disconnects, reconnect immediately
        connectPort()
    })
}

// 1. Open the initial port
connectPort()

// 2. Ping the worker every 20 seconds to reset Chrome's 30-second idle timer
setInterval(() => {
    if (port) {
        port.postMessage({ type: 'PING' })
    }
}, 20000)
