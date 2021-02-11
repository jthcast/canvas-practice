import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

interface BarchartOptions {
  canvas: HTMLCanvasElement;
  padding: number;
  gridScale: number;
  data: Record<string, number>;
  colors: string[];
}

export default function BarChart() {
  const canvasEl = useRef<HTMLCanvasElement>();

  const mockData = {
    'Classical music': 10,
    'Alternative rock': 14,
    'Pop': 2,
    'Jazz': 12
  }

  function drawLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }

  function drawBar(
    ctx: CanvasRenderingContext2D,
    upperLeftCornerX: number,
    upperLeftCornerY: number,
    width: number,
    height: number,
    color: string) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
  }

  function drawBarchart(options: BarchartOptions) {
    const canvas = options.canvas;
    const ctx = canvas.getContext('2d');
    const colors = options.colors;
    const data = options.data;

    function draw() {
      let maxValue = 0;
      for (let categ in data) {
        maxValue = Math.max(maxValue, data[categ]);
      }
    }
    draw();
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    drawBarchart({
      canvas: canvas,
      padding: 10,
      gridScale: 5,
      // gridColor:"#eeeeee",
      data: mockData,
      colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"]
    });

    return () => {
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} />
      <a
        href={`https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561`}
        target='_blank'
        rel='noopener noreferer'
      >How to Draw Bar Charts Using JavaScript and HTML5 Canvas</a>
    </div>
  )
}
