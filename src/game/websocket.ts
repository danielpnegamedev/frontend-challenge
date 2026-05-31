let ws: WebSocket | null = null;
let gameState: any = null;
let messageCallback: ((msg: any) => void) | null = null;

export function connectWebSocket(onMessage: (msg: any) => void) {
  messageCallback = onMessage;
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    let userId = localStorage.getItem('game_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('game_user_id', userId);
    }
    ws?.send(JSON.stringify({ type: 'identify', userId }));
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      gameState = message;
      onMessage(message);
    } catch (e) {
      console.error(e);
    }
  };

  ws.onclose = () => {
    setTimeout(() => connectWebSocket(onMessage), 3000);
  };
}

export function sendBet(userId: string, amount: number) {
  ws?.send(JSON.stringify({ type: 'bet', data: { userId, value: amount } }));
}

export function sendCashout(userId: string) {
  ws?.send(JSON.stringify({ type: 'cashout', data: { userId } }));
}

export function sendCancelBet(userId: string) {
  ws?.send(JSON.stringify({ type: 'cancel-bet', data: { userId } }));
}

export function getGameState() {
  return gameState;
}