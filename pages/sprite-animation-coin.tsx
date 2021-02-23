import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

interface SpriteOptions {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  image: HTMLImageElement;
  ticksPerFrame?: number;
  numberOfFrames?: number;
  loop: boolean
}

interface Sprite {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  image: HTMLImageElement;
  render: () => void;
  update: () => void;
}

export default function spriteAnimationCoin() {
  const canvasEl = useRef<HTMLCanvasElement>();

  function sprite({ context, width, height, image, ticksPerFrame = 0, numberOfFrames = 1, loop }: SpriteOptions): Sprite {
    let frameIndex = 0;
    let tickCount = 0;
    const that = {
      context,
      width,
      height,
      image,
      render: () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(
          image,
          frameIndex * width / numberOfFrames,
          0,
          width / numberOfFrames,
          height,
          0,
          0,
          width / numberOfFrames,
          height
        );
      },
      update: () => {
        tickCount++;
        if (tickCount > ticksPerFrame) {
          tickCount = 0;
          if (frameIndex < numberOfFrames - 1) {
            frameIndex++;
          } else if (loop) {
            frameIndex = 0;
          }
        }
      }
    };

    return that;
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    canvas.width = 100;
    canvas.height = 100;
    let animationId = undefined;

    const coinImage = new Image();
    coinImage.src = './coin-sprite-animation-sprite-sheet.png';
    const coin = sprite({
      context: canvas.getContext('2d'),
      width: 1000,
      height: 100,
      image: coinImage,
      numberOfFrames: 10,
      ticksPerFrame: 1,
      loop: true
    });

    function draw() {
      coin.update();
      coin.render();
      animationId = requestAnimationFrame(draw);
    }

    coinImage.addEventListener('load', draw);

    return () => {
      cancelAnimationFrame(animationId);
      coinImage.removeEventListener('load', draw);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`https://codepen.io/rachsmith/pen/fBoiD?editors=0010`}
        target='_blank'
        rel='noopener noreferer'
      >CREATE A SPRITE ANIMATION WITH HTML5 CANVAS AND JAVASCRIPT</a>
    </div>
  )
}
