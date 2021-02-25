import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

export default function canvasAnimatedClock() {
  const canvasEl = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    let animationId = undefined;
    const primaryColor = `#28d1fa`;

    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 17;
    ctx.shadowBlur = 15
    ctx.shadowColor = primaryColor;

    function degToRadian(degree: number) {
      return (degree / 180) * Math.PI
    }

    function renderTime() {
      const now = new Date();
      const today = now.toDateString();
      const time = now.toLocaleTimeString();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      const newSeconds = seconds + (milliseconds / 1000);

      const gradient = ctx.createRadialGradient(200, 200, 5, 200, 200, 300);
      gradient.addColorStop(0, `#09303a`);
      gradient.addColorStop(1, `#000000`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 400);

      ctx.beginPath();
      ctx.arc(200, 200, 170, degToRadian(270), degToRadian(270 + (hours * 15)));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200, 200, 140, degToRadian(270), degToRadian(270 + (minutes * 6)));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200, 200, 110, degToRadian(270), degToRadian(270 + (newSeconds * 6)));
      ctx.stroke();

      ctx.font = `20px Helvetica`;
      ctx.fillStyle = primaryColor;
      ctx.fillText(today, 140, 200);

      ctx.font = `15px Helvetica`;
      ctx.fillStyle = primaryColor;
      ctx.fillText(time, 140, 230);

      animationId = requestAnimationFrame(renderTime)
    }

    renderTime();

    return () => {
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`https://codepen.io/tarick/pen/jWOWOV?editors=0010`}
        target='_blank'
        rel='noopener noreferer'
      >HTML5 Canvas animated clock</a>
    </div>
  )
}
