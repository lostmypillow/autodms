import { createHash } from 'crypto'

export function generateKey(rawUrl: string): string {
    const url = new URL(rawUrl.trim())
    url.hostname = url.hostname.toLowerCase()
    let cleanUrl = url.toString()
    if (cleanUrl.endsWith('/') && url.pathname === '/') {
        cleanUrl = cleanUrl.slice(0, -1)
    }
    const hash = createHash('sha256').update(cleanUrl).digest('hex')
    return `URL#${hash}`
}
