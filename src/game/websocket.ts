import type { IGameEvent } from '../models';

let ws: WebSocket | null = null;
let gameState: IGameEvent | null = null;
let messageCallback: ((msg: any) => void) | null = null;


export function connectWebSocket(onMessage: (msg: any) => void) {
    messageCallback = onMessage;
    
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => console.log('✅ WebSocket conectado');
    ws.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            gameState = message;
            onMessage(message);
        } catch (e) {
            console.error('Erro ao parsear mensagem:', e);
        }
    };
    ws.onerror = (err) => console.error('❌ WebSocket error:', err);
    ws.onclose = () => {
        console.log('❌ Desconectado. Reconectando em 3s...');
        setTimeout(() => connectWebSocket(onMessage), 3000);
    };
}


export function sendBet(userId: string, amount: number) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: 'bet', data: { userId, value: amount } }));
}


export function sendCashout(userId: string) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: 'cashout', data: { userId } }));
}

export function getGameState(): IGameEvent | null {
    return gameState;
}

export function sendCancelBet(userId: string) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: 'cancel-bet', data: { userId } }));
}

