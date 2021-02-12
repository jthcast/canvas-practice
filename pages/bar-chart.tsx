import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

interface BarchartOptions {
  canvas: HTMLCanvasElement;
  padding: number;
  gridColor: string;
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
    const padding = options.padding;
    const colors = options.colors;
    const data = options.data;
    const gridColor = options.gridColor;
    const gridScale = options.gridScale;

    function draw() {
      const maxValue = Math.max.apply(null, Object.values(data)) ?? 0; //drawing the grid lines
      const canvasActualHeight = canvas.height - padding * 2;
      const canvasActualWidth = canvas.width - padding * 2;
      let gridValue = 0;

      while (gridValue <= maxValue) {
        const gridY = canvasActualHeight * (1 - gridValue / maxValue) + padding;
        drawLine(ctx, 0, gridY, canvas.width, gridY, gridColor);
        ctx.save();
        ctx.fillStyle = gridColor;
        ctx.font = 'bold 10px Arial';
        ctx.fillText(gridValue.toString(), 0, gridY - 2);
        ctx.restore();
        gridValue += gridScale;
      }

      let barIndex = 0; //drawing the bars
      const numberOfBars = Object.keys(data).length;
      const barSize = canvasActualWidth / numberOfBars;

      for (const categ in data) {
        const val = data[categ];
        const barHeight = Math.round(canvasActualHeight * (val / maxValue));
        drawBar(ctx, padding + (barIndex * barSize), canvas.height - barHeight - padding, barSize, barHeight, colors[barIndex % colors.length]);
        barIndex++;
      }
    }
    draw();
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    canvas.width = 300;
    canvas.height = 300;
    drawBarchart({
      canvas: canvas,
      padding: 10,
      gridScale: 5,
      gridColor: "#e5e5e5",
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
