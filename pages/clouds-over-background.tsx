import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

export default function TearableCloth() {
  const canvasEl = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');
    const width = 640;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    let animationId = undefined;
    let background = undefined;
    let cloud = undefined;
    let cloud_x = undefined;

    function init() {
      background = new Image();
      background.src = 'http://silveiraneto.net/wp-content/uploads/2011/06/forest.png';

      cloud = new Image();
      cloud.src = 'http://silveiraneto.net/wp-content/uploads/2011/06/cloud.png';
      cloud.onload = () => {
        cloud_x = -cloud.width;
      }
    }

    function update() {
      if (cloud_x !== undefined) {
        cloud_x += 1;
      }
      if (cloud_x > width) {
        cloud_x = -cloud.width;
      }
      ctx.drawImage(background, 0, 0);
      ctx.drawImage(cloud, cloud_x, 0);
      animationId = requestAnimationFrame(update);
    }

    init();
    update();

    return () => {
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`http://silveiraneto.net/2011/06/02/simple-html5-animation-clouds-over-background/`}
        target='_blank'
        rel='noopener noreferer'
      >simple HTML5 animation: clouds over background</a>
    </div>
  )
}
