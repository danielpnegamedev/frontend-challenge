import { Application, AnimatedSprite, Text, Assets, TextStyle, Container, Graphics } from 'pixi.js';
import { stall } from './utils/staller';

let spinningTopSprite: AnimatedSprite;
let multiplierText: Text;
let gameContainer: Container;

export function updateMultiplierText(value: number) {
    if (multiplierText) {
        multiplierText.text = `${value.toFixed(2)}x`;
    }
}

export async function initGame(container: HTMLDivElement) {
    await loadAssets();

    const app = new Application();
    await app.init({
        background: '#4b3a7a',
        resizeTo: container
    });

    container.appendChild(app.canvas);

    gameContainer = new Container();
    app.stage.addChild(gameContainer);

    const bg = new Graphics();
    bg.circle(0, 0, 70);
    bg.fill(0x000000);
    bg.alpha = 0.3;
    bg.y = 80;
    gameContainer.addChild(bg);

    const animations = Assets.cache.get('spinning-top').animations;
    const spinTextures = animations[Object.keys(animations)[0]];

    spinningTopSprite = new AnimatedSprite(spinTextures);
    spinningTopSprite.animationSpeed = 0.2;
    spinningTopSprite.anchor.set(0.5);
    spinningTopSprite.scale.set(0.7);
    spinningTopSprite.y = 80;
    spinningTopSprite.play();
    gameContainer.addChild(spinningTopSprite);

    const textStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 80,
        fontWeight: 'bold',
        fill: '#ffffff'
    });

    multiplierText = new Text({ text: '1.00x', style: textStyle });
    multiplierText.anchor.set(0.5);
    multiplierText.y = -20;
    gameContainer.addChild(multiplierText);

    const center = () => {
        gameContainer.x = app.screen.width / 2;
        gameContainer.y = app.screen.height / 2;
    };

    center();
    app.renderer.on('resize', center);

    return app;
}

async function loadAssets() {
    await Assets.init({
        manifest: {
            bundles: [
                {
                    name: 'spinning-top',
                    assets: [{ alias: 'spinning-top', src: './assets/texture.json' }]
                },
                {
                    name: 'sounds',
                    assets: [{ alias: 'bg-sound', src: './assets/bg-sound.mp3' }]
                }
            ]
        },
    });

    await stall();
    await Assets.loadBundle('spinning-top', (p) => {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.getElementById('progress-bar') as HTMLProgressElement;
        if (loadingProgress) loadingProgress.value = p * 100;
        if (loadingScreen && p === 1) loadingScreen.style.display = 'none';
    });
    await Assets.loadBundle('sounds');
}