import { describe, expect, it, vi, beforeEach } from 'vitest'

describe('Extension Bridge Unit Tests', () => {
    let listeners: Record<string, ((event: any) => void)[]> = {}
    const mockSendMessage = vi.fn()

    const mockWindow = {
        addEventListener: (event: string, listener: (event: any) => void) => {
            if (!listeners[event]) listeners[event] = []
            listeners[event].push(listener)
        },
        postMessage: vi.fn(),
    }

    const triggerWindowMessage = (data: any, source: any = mockWindow) => {
        const messageEvent = { source, data }
        listeners['message']?.forEach((fn) => fn(messageEvent))
    }

    beforeEach(() => {
        vi.clearAllMocks()
        listeners = {}

        globalThis.chrome = {
            runtime: {
                sendMessage: mockSendMessage,
            },
        } as unknown as typeof chrome

        mockWindow.addEventListener('message', (event) => {
            if (event.source !== mockWindow || event.data?.source !== 'VUE_APP') return
            if (event.data.action === 'SCRAPE') {
                globalThis.chrome.runtime.sendMessage({
                    action: 'SCRAPE',
                    url: event.data.url,
                })
            }
            if (event.data.action === 'PING') {
                globalThis.chrome.runtime.sendMessage({ action: 'PING' }, (response: unknown) => {
                    mockWindow.postMessage(
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
    })

    it('should ignore messages not originating from VUE_APP', () => {
        triggerWindowMessage({ source: 'OTHER', action: 'PING' }, mockWindow)
        expect(mockSendMessage).not.toHaveBeenCalled()
    })

    it('should ignore messages not from the same window source', () => {
        triggerWindowMessage({ source: 'VUE_APP', action: 'PING' }, {})
        expect(mockSendMessage).not.toHaveBeenCalled()
    })

    it('should forward SCRAPE action from Vue app to extension runtime', () => {
        triggerWindowMessage({ source: 'VUE_APP', action: 'SCRAPE', url: 'https://example.com' })
        expect(mockSendMessage).toHaveBeenCalledWith({
            action: 'SCRAPE',
            url: 'https://example.com',
        })
    })

    it('should forward PING action and reply with PONG on callback', () => {
        mockSendMessage.mockImplementation((msg, callback) => {
            if (msg.action === 'PING' && callback) {
                callback({ status: 'pong', timestamp: 12345 })
            }
        })

        triggerWindowMessage({ source: 'VUE_APP', action: 'PING' })

        expect(mockSendMessage).toHaveBeenCalledWith({ action: 'PING' }, expect.any(Function))
        expect(mockWindow.postMessage).toHaveBeenCalledWith(
            {
                source: 'EXTENSION_BRIDGE',
                action: 'PONG',
                payload: { status: 'pong', timestamp: 12345 },
            },
            '*'
        )
    })
})
