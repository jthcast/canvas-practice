import { useEffect, useRef } from 'react'
import { isContext } from 'vm';
import styles from '../styles/Breakout.module.css'

interface Layer {
  x: number;
  y: number;
  r: number;
}

export default function Hypnos() {
  const canvasEl = useRef<HTMLCanvasElement>();

  useEffect(() => {
    let animationId = undefined;
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');

    const width = window.innerWidth * 0.7;
    const height = window.innerHeight * 0.7;
    const radius = Math.min(width, height) * 0.5;
    const quality = 180;
    const layers: Layer[] = [];
    const layerSize = radius * 0.25;
    const layerOverlap = Math.round(quality * 0.1);

    function initialize() {
      for (let i = 0; i < quality; i++) {
        layers.push({
          x: width / 2 + Math.sin(i / quality * 2 * Math.PI) * (radius - layerSize),
          y: height / 2 + Math.cos(i / quality * 2 * Math.PI) * (radius - layerSize),
          r: (i / quality) * Math.PI
        });
      }
      console.log(layers);
      resize();
      update();
    }

    function resize() {
      canvas.width = width;
      canvas.height = height;
    }

    function update() {
      animationId = requestAnimationFrame(update);
      // step();
      // clear();
      paint();
    }

    function paintLayer(layer: Layer, mask?: boolean) {
      const size = layerSize + (mask ? 10 : 0);
      const size2 = size / 2;

      ctx.translate(layer.x, layer.y);
      ctx.rotate(layer.r);

      if (!mask) {
        ctx.strokeStyle = `#000`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-size2, -size2, size, size);
      }

      ctx.fillStyle = `#fff`;
      ctx.fillRect(-size2, -size2, size, size);
    }

    function paint() {
      const layersLength = layers.length;

      for (let i = layersLength - layerOverlap; i < layersLength; i++) {
        ctx.save();
        ctx.globalCompositeOperation = `destination-over`;
        paintLayer(layers[i]);
        ctx.restore();
      }

      ctx.save();
      ctx.globalCompositeOperation = `destination-in`;
      paintLayer(layers[0], true);
      ctx.restore();

      for (let i = 0; i < layersLength; i++) {
        ctx.save();
        ctx.globalCompositeOperation = `destination-over`;
        paintLayer(layers[i]);
        ctx.restore();
      }
    }

    initialize();



    return () => {
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`https://lab.hakim.se/hypnos/`}
        target='_blank'
        rel='noopener noreferer'
      >hypnos</a>
    </div>
  )
}
