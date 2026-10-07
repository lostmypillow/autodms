import { WebSocket, type WebSocketServer, type RawData } from 'ws'

let wssInstance: WebSocketServer | null = null

export function setupWebSocketRoutes(wss: WebSocketServer) {
    wssInstance = wss

    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected')

        ws.on('message', (data: RawData) => {
            const message = data.toString()
            console.log('Received:', message)
            // Broadcast to all connected clients
            broadcast(message)
        })
    })
}

// Helper to broadcast to all connected clients
export function broadcast(data: unknown) {
    if (!wssInstance) return
    const payload = typeof data === 'string' ? data : JSON.stringify(data)

    wssInstance.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload)
        }
    })
}
