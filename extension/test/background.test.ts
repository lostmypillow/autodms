/// <reference types="chrome" />
import { describe, expect, it, vi, beforeEach } from 'vitest'

type MessageSender = chrome.runtime.MessageSender

interface MockRequest {
    action: string
    url?: string
}

describe('Extension Background Service Worker Logic', () => {
    let onMessageListener: ((request: MockRequest, sender: MessageSender | object, sendResponse: (response?: unknown) => void) => boolean | void) | null = null

    const mockChrome = {
        runtime: {
            onInstalled: { addListener: vi.fn() },
            onMessage: {
                addListener: vi.fn((listener) => {
                    onMessageListener = listener
                }),
            },
            getURL: vi.fn((path: string) => `chrome-extension://dummy-id/${path}`),
        },
        contextMenus: {
            create: vi.fn(),
            onClicked: {
                addListener: vi.fn(() => {}),
            },
        },
        tabs: {
            create: vi.fn().mockResolvedValue({ id: 99 }),
            remove: vi.fn().mockResolvedValue(undefined),
        },
        notifications: {
            create: vi.fn().mockResolvedValue('notif-1'),
        },
    }

    beforeEach(() => {
        vi.clearAllMocks()

        ;(globalThis as unknown as { chrome: unknown }).chrome = mockChrome

        mockChrome.runtime.onMessage.addListener(
            (request: MockRequest, _sender: MessageSender | object, sendResponse: (response?: unknown) => void) => {
                if (request.action === 'PING') {
                    sendResponse({ status: 'pong', timestamp: Date.now() })
                    return
                }
                if (request.action === 'SCRAPE') {
                    mockChrome.tabs.create({
                        url: request.url,
                        active: false,
                    })
                }
            }
        )
    })

    it('should respond to PING with pong status', () => {
        const sendResponse = vi.fn()
        onMessageListener?.({ action: 'PING' }, {}, sendResponse)
        expect(sendResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                status: 'pong',
                timestamp: expect.any(Number),
            })
        )
    })

    it('should create a background tab when receiving SCRAPE action', () => {
        onMessageListener?.({ action: 'SCRAPE', url: 'https://www.cool3c.com' }, {}, vi.fn())
        expect(mockChrome.tabs.create).toHaveBeenCalledWith({
            url: 'https://www.cool3c.com',
            active: false,
        })
    })
})


