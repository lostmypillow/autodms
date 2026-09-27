const ext = globalThis.browser || globalThis.chrome

// Listen for window events from Vue
window.addEventListener('message', (event) => {
    if (event.source !== window || event.data?.source !== 'VUE_APP') return
    if (event.data.action === 'SCRAPE') {
        ext.runtime.sendMessage({
            action: 'SCRAPE',
            url: event.data.url,
        })
    }
    if (event.data.action === 'PING') {
        ext.runtime.sendMessage({ action: 'PING' }, (response) => {
            window.postMessage(
                {
                    source: 'EXTENSION_BRIDGE',
                    action: 'PONG',
                    payload: response,
                },
                '*'
            )
        })
    }
})


