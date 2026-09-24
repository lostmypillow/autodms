import { WebSocket } from 'ws'

let wssInstance = null

export function setupWebSocketRoutes(wss) {
    wssInstance = wss

    wss.on('connection', (ws) => {
        console.log('Client connected')

        ws.on('message', (data) => {
            const message = data.toString()
            console.log('Received:', message)
            // Broadcast to all connected clients
            broadcast(message)
        })
    })
}

// Helper to broadcast to all connected clients
export function broadcast(data) {
    if (!wssInstance) return
    const payload = typeof data === 'string' ? data : JSON.stringify(data)

    wssInstance.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload)
        }
    })
}
