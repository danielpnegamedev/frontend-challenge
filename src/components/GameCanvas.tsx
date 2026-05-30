import { useEffect, useRef } from 'react'
import { createCrashGame, CrashGameScene, CrashPhase } from '../game'

interface GameCanvasProps {
  phase: CrashPhase
  multiplier: number
}

export function GameCanvas({ phase, multiplier }: GameCanvasProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<CrashGameScene | null>(null)

  useEffect(() => {
    let mounted = true
    if (!canvasRef.current) {
      return
    }

    createCrashGame(canvasRef.current)
      .then((scene) => {
        if (!mounted) {
          scene.destroy()
          return
        }
        sceneRef.current = scene
        scene.update({ phase, multiplier })
      })
      .catch((error) => {
        console.error('Unable to initialize game scene', error)
      })

    return () => {
      mounted = false
      sceneRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.update({ phase, multiplier })
  }, [phase, multiplier])

  return <div className="game-canvas" ref={canvasRef} />
}
