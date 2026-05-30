import { useEffect, useMemo, useRef, useState } from 'react'
import { GameCanvas } from './GameCanvas'
import './Layout.css'
import type { IBetDTO } from '../models'

const USER_ID = 'de*****eq'
const presetAmounts = [1, 5, 10, 20]

const sampleBets: IBetDTO[] = [
  { userId: 'de*****eq', amount: 100, cashoutAt: 0, prize: 0 },
  { userId: 'de*****eq', amount: 100, cashoutAt: 0, prize: 0 },
  { userId: 'de*****eq', amount: 100, cashoutAt: 0, prize: 0 },
]

type GamePhase = 'betting' | 'running' | 'crash'

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function Layout() {
  const [betAmount, setBetAmount] = useState(10)
  const [phase, setPhase] = useState<GamePhase>('betting')
  const [multiplier, setMultiplier] = useState(1)
  const [bets, setBets] = useState<IBetDTO[]>(sampleBets)
  const [connected, setConnected] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Connecting to server...')
  const [connectionError, setConnectionError] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    wsRef.current = ws

    ws.addEventListener('open', () => {
      setConnected(true)
      setStatusMessage('Connected')
      setConnectionError('')
    })

    ws.addEventListener('message', ({ data }) => {
      try {
        const message = JSON.parse(data)

        if (message.type === 'sync') {
          const gameState = message.gameState || {}
          setPhase(gameState.phase || 'betting')
          setMultiplier(gameState.multiplier || 1)
          setBets(gameState.bets || [])
          return
        }

        if (message.type === 'betting' || message.type === 'running' || message.type === 'crash') {
          const gameData = message.data || {}
          setPhase(gameData.phase || 'betting')
          setMultiplier(gameData.multiplier || 1)
          setBets(gameData.bets || [])
          return
        }
      } catch (error) {
        console.error('Invalid websocket message', error)
      }
    })

    ws.addEventListener('close', () => {
      setConnected(false)
      setConnectionError('Unable to reach the crash server.')
      setStatusMessage('Disconnected')
    })

    ws.addEventListener('error', () => {
      setConnected(false)
      setConnectionError('Unable to reach the crash server.')
      setStatusMessage('Disconnected')
    })

    return () => {
      ws.close()
    }
  }, [])

  const playerBet = useMemo(
    () => bets.find((bet) => bet.userId === USER_ID) ?? null,
    [bets],
  )

  const placeBetDisabled = phase !== 'betting' || Boolean(playerBet) || !connected
  const cashoutDisabled = phase !== 'running' || !playerBet || Boolean(playerBet.prize) || !connected

  function changeBet(delta: number) {
    setBetAmount((current) => Math.max(1, current + delta))
  }

  function placeBet() {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return
    }

    const message = {
      type: 'bet',
      data: {
        userId: USER_ID,
        value: betAmount,
        cashoutAt: 0,
      },
    }

    wsRef.current.send(JSON.stringify(message))
    setBets((prevBets) => [
      ...prevBets.filter((bet) => bet.userId !== USER_ID),
      { userId: USER_ID, amount: betAmount, cashoutAt: 0, prize: 0 },
    ])
  }

  function cashout() {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return
    }

    wsRef.current.send(
      JSON.stringify({
        type: 'cashout',
        data: {
          userId: USER_ID,
        },
      }),
    )
  }

  const displayedBets = bets.length > 0 ? bets : sampleBets

  return (
    <div className="layout-shell">
      <header className="top-bar">
        <div className="top-left">
          <span className={`connection-pill ${connected ? 'online' : 'offline'}`} />
          {connected ? phase.toUpperCase() : connectionError || statusMessage}
        </div>
        <div className="top-badges">
          <span className="badge">10.00</span>
          <span className="badge">1.67</span>
          <span className="badge">5000.00</span>
          <span className="badge">5.32</span>
          <span className="badge">41.13</span>
          <span className="badge">500.01</span>
        </div>
      </header>

      <main className="game-screen">
        <section className="round-card">
          <div className="round-card-title">{multiplier.toFixed(2)}x</div>
          <div className="spinner-ring">
            <GameCanvas phase={phase} multiplier={multiplier} />
          </div>
        </section>

        <section className="controls-panel">
          <div className="bet-card">
            <div className="bet-card-header">
              <span>Bet USD</span>
            </div>
            <div className="bet-input-row">
              <button type="button" onClick={() => changeBet(-1)} disabled={betAmount <= 1}>
                -
              </button>
              <div className="bet-value">${formatCurrency(betAmount)}</div>
              <button type="button" onClick={() => changeBet(1)}>
                +
              </button>
            </div>
            <div className="bet-presets">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={amount === betAmount ? 'preset-button active' : 'preset-button'}
                  onClick={() => setBetAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`place-bet-button ${placeBetDisabled ? 'disabled' : ''}`}
            type="button"
            onClick={placeBet}
            disabled={placeBetDisabled}
          >
            PLACE BET 1
            <span>${formatCurrency(betAmount)}</span>
          </button>

          <button
            className={`cashout-button ${cashoutDisabled ? 'disabled' : ''}`}
            type="button"
            onClick={cashout}
            disabled={cashoutDisabled}
          >
            {cashoutDisabled ? 'CASHOUT DISABLED' : 'CASHOUT'}
          </button>

          <div className="bets-panel">
            <div className="bets-panel-header">
              <h2>Bets</h2>
            </div>
            <div className="bets-table">
              <div className="bets-table-row bets-table-header">
                <span>User</span>
                <span>Bet USD</span>
                <span>Multiplier</span>
                <span>Bet</span>
              </div>
              {displayedBets.map((row, index) => {
                const multiplierValue = row.prize ? row.prize / row.amount : 0
                const betValue = row.prize || row.amount

                return (
                  <div className="bets-table-row" key={`${row.userId}-${index}`}>
                    <span className="bets-user">{row.userId}</span>
                    <span>${formatCurrency(row.amount)}</span>
                    <span>{row.prize ? `${multiplierValue.toFixed(2)}x` : '—'}</span>
                    <span>${formatCurrency(betValue)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
