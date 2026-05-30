import { Application, AnimatedSprite, Assets, Text, TextStyle } from 'pixi.js'

export type CrashPhase = 'betting' | 'running' | 'crash'
export interface GameSceneState {
  phase: CrashPhase
  multiplier: number
}

export interface CrashGameScene {
  update(state: GameSceneState): void
  destroy(): void
}

export async function createCrashGame(container: HTMLElement): Promise<CrashGameScene> {
  const app = new Application({
    backgroundAlpha: 0,
    antialias: true,
    resizeTo: container,
  })

  container.appendChild(app.view as HTMLCanvasElement)

  const loaded = (await Assets.load('/assets/texture.json')) as any
  const textures = loaded?.animations?.spinning ?? Object.values(loaded?.textures ?? {})
  const spinner = new AnimatedSprite(textures)

  spinner.anchor.set(0.5)
  spinner.loop = true
  spinner.animationSpeed = 0.2
  spinner.x = app.screen.width / 2
  spinner.y = app.screen.height / 2 - 10
  spinner.scale.set(Math.min(app.screen.width, app.screen.height) / 420)
  spinner.gotoAndStop(0)

  const multiplierText = new Text(
    '1.00x',
    new TextStyle({
      fill: '#ffffff',
      fontSize: 48,
      fontWeight: 'bold',
    }),
  )

  multiplierText.anchor.set(0.5)
  multiplierText.x = app.screen.width / 2
  multiplierText.y = app.screen.height - 70

  app.stage.addChild(spinner)
  app.stage.addChild(multiplierText)

  const resizeScene = () => {
    const width = container.clientWidth
    const height = container.clientHeight

    app.renderer.resize(width, height)
    spinner.x = width / 2
    spinner.y = height / 2 - 10
    multiplierText.x = width / 2
    multiplierText.y = height - 70
    spinner.scale.set(Math.min(width, height) / 420)
  }

  const observer = new ResizeObserver(resizeScene)
  observer.observe(container)
  resizeScene()

  const update = ({ phase, multiplier }: GameSceneState) => {
    multiplierText.text = `${multiplier.toFixed(2)}x`

    if (phase === 'betting') {
      spinner.gotoAndStop(0)
    }

    if (phase === 'running') {
      if (!spinner.playing) {
        spinner.play()
      }
      spinner.animationSpeed = 0.25
    }

    if (phase === 'crash') {
      spinner.gotoAndStop(spinner.totalFrames - 1)
    }
  }

  return {
    update,
    destroy() {
      observer.disconnect()
      spinner.destroy({ children: true, texture: true })
      multiplierText.destroy({ children: true, texture: true })
      app.destroy(true)
    },
  }
}


