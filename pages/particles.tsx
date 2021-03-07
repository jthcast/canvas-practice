import { useEffect, useRef } from 'react'
import { isContext } from 'vm';
import styles from '../styles/Breakout.module.css'

interface Layer {
  x: number;
  y: number;
  r: number;
}

export default function Particles() {
  const canvasEl = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let animationId = undefined;
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');

    const velocity = 1;
    const initParticles = 400;
    let mouse = {
      x: 0,
      y: 0
    };
    const particles = [];
    const colors = [`#000000`, `#FF0000`, `#FFFF00`];

    function initialize() {
      for (let i = 0; i < initParticles; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: ((Math.random() * (velocity * 2)) - velocity),
          vy: ((Math.random() * (velocity * 2)) - velocity),
          size: 1 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // canvas.addEventListener('mousemove', mouseMoveHandling);
      // window.addEventListener('mousedown', mouseDownHandling);
      // window.addEventListener('resize', resizeCanvas);

      // requestAnimationFrame(timeUpdate);
      // resizeCanvas();
    }



    return () => {
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`https://lab.hakim.se/particles/01/`}
        target='_blank'
        rel='noopener noreferer'
      >particles</a>
    </div>
  )
}
