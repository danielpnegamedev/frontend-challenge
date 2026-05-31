import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;

// HTTP Server (necessário para o Render)
const server = http.createServer();

const wss = new WebSocketServer({
  server
});

server.listen(PORT, () => {
  console.log(`Crash game server running on port ${PORT}`);
});

// ========================
// GAME STATE
// ========================

const gameState = {
  phase: 'init',
  multiplier: 1.0,
  crashPoint: 0,
  nextGameAt: 0,
  bets: [],
  history: []
};

const connectedUsers = new Set();

const BETTING_PHASE_DURATION = 5000;
const TICK_INTERVAL = 100;
const MULTIPLIER_INCREMENT = 0.01;
const MAX_MULTIPLIER = 3;

let bettingTimer = null;
let runningTimer = null;

// ========================
// GAME START
// ========================

startBettingPhase();

// ========================
// CONNECTIONS
// ========================

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.userId = null;

  sendSyncEvent(ws);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === 'identify') {
        ws.userId = message.userId;

        if (ws.userId) {
          connectedUsers.add(ws.userId);
          broadcastOnlineCount();
        }

        return;
      }

      handleClientMessage(message);

    } catch (error) {
      console.error('Message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    if (ws.userId) {
      connectedUsers.delete(ws.userId);
      broadcastOnlineCount();
    }
  });
});

// ========================
// MESSAGE HANDLER
// ========================

function handleClientMessage(message) {
  const type = message?.type;
  const userId = message?.data?.userId;
  const value = message?.data?.value;
  const cashoutAt = message?.data?.cashoutAt;

  switch (type) {
    case 'bet':
      if (
        gameState.phase === 'betting' &&
        userId &&
        value > 0
      ) {
        const alreadyBet = gameState.bets.some(
          (b) => b.userId === userId
        );

        if (!alreadyBet) {
          gameState.bets.push({
            userId,
            amount: value,
            cashoutAt
          });

          broadcastGameState();
          sendBetAddedEvent(userId, value);
        }
      }
      break;

    case 'cancel-bet':
      if (
        gameState.phase === 'betting' &&
        userId
      ) {
        gameState.bets = gameState.bets.filter(
          (bet) => bet.userId !== userId
        );

        broadcastGameState();
      }
      break;

    case 'cashout':
      const userBet = gameState.bets.find(
        (u) => u.userId === userId
      );

      if (
        gameState.phase === 'running' &&
        userBet &&
        !userBet.prize
      ) {
        userBet.prize =
          userBet.amount * gameState.multiplier;

        broadcastGameState();
      }
      break;
  }
}

// ========================
// EVENTS
// ========================

function sendBetAddedEvent(userId, value) {
  const payload = JSON.stringify({
    type: 'bet-added',
    data: {
      userId,
      value
    }
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

function sendSyncEvent(ws) {
  ws.send(
    JSON.stringify({
      type: 'sync',
      gameState: {
        phase: gameState.phase,
        multiplier: gameState.multiplier,
        nextGameAt: gameState.nextGameAt,
        history: gameState.history.slice(-10),
        bets: gameState.bets
      }
    })
  );
}

function broadcastOnlineCount() {
  const payload = JSON.stringify({
    type: 'online-count',
    count: connectedUsers.size
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

function broadcastGameState() {
  const payload = JSON.stringify({
    type: gameState.phase,
    data: {
      phase: gameState.phase,
      multiplier: gameState.multiplier,
      nextGameAt:
        gameState.phase === 'betting'
          ? gameState.nextGameAt
          : null,
      bets: gameState.bets,
      history: gameState.history
    }
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}

// ========================
// GAME LOOP
// ========================

function startBettingPhase() {
  gameState.phase = 'betting';
  gameState.multiplier = 1.0;
  gameState.bets = [];

  gameState.nextGameAt =
    Date.now() + BETTING_PHASE_DURATION;

  gameState.crashPoint =
    1 + Math.random() * (MAX_MULTIPLIER - 1);

  broadcastGameState();

  bettingTimer = setTimeout(() => {
    startRunningPhase();
  }, BETTING_PHASE_DURATION);
}

function startRunningPhase() {
  gameState.phase = 'running';

  broadcastGameState();

  runningTimer = setInterval(() => {
    gameState.multiplier += MULTIPLIER_INCREMENT;

    gameState.multiplier = Number(
      gameState.multiplier.toFixed(2)
    );

    gameState.bets.forEach((bet) => {
      if (
        !bet.prize &&
        bet.cashoutAt === gameState.multiplier
      ) {
        bet.prize =
          bet.amount * gameState.multiplier;
      }
    });

    broadcastGameState();

    if (
      gameState.multiplier >=
      gameState.crashPoint
    ) {
      clearInterval(runningTimer);

      gameState.history.push({
        crashPoint: gameState.multiplier,
        timestamp: Date.now()
      });

      if (gameState.history.length > 50) {
        gameState.history.shift();
      }

      gameState.phase = 'crash';

      broadcastGameState();

      setTimeout(() => {
        startBettingPhase();
      }, 3000);
    }
  }, TICK_INTERVAL);
}

// ========================
// SHUTDOWN
// ========================

process.on('SIGINT', () => {
  console.log('Shutting down...');

  clearTimeout(bettingTimer);
  clearInterval(runningTimer);

  wss.close(() => {
    server.close(() => {
      process.exit(0);
    });
  });
});