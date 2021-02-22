import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

interface Lightning {
  x: number;
  y: number;
  xRange: number;
  yRange: number;
  path: [{
    x: number,
    y: number
  }];
  pathLimit: number;
  canSpawn: boolean;
  hasFired: boolean;
}

export default function canvasLightning() {
  const canvasEl = useRef<HTMLCanvasElement>();

  class CanvasLightning {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    cw: number;
    ch: number;
    mx: number;
    my: number;
    lightning: Lightning[];
    lightTimeCurrent: number;
    lightTimeTotal: number;

    constructor(canvas: HTMLCanvasElement, cw: number, ch: number) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.cw = cw;
      this.ch = ch;
      this.mx = 0;
      this.my = 0;

      this.lightning = [];
      this.lightTimeCurrent = 0;
      this.lightTimeTotal = 50;
    };

    rand(rMi: number, rMa: number) {
      return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
    };

    hitTest(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
      return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
    };

    createLightning(x: number, y: number, canSpawn: boolean) {
      this.lightning.push({
        x,
        y,
        xRange: this.rand(5, 30),
        yRange: this.rand(5, 25),
        path: [{
          x,
          y
        }],
        pathLimit: this.rand(10, 35),
        canSpawn,
        hasFired: false
      });
    };

    updateLightning() {
      for (let i = this.lightning.length - 1; i > 0; i--) {
        const light = this.lightning[i];

        light.path.push({
          x: light.path[light.path.length - 1].x + (this.rand(0, light.xRange) - (light.xRange / 2)),
          y: light.path[light.path.length - 1].y + (this.rand(0, light.yRange))
        });

        if (light.path.length > light.pathLimit) {
          this.lightning.splice(i, 1);
        }
        light.hasFired = true;
      }

    };

    renderLightning() {
      for (let i = this.lightning.length - 1; i > 0; i--) {
        const light = this.lightning[i];

        this.ctx.strokeStyle = `hsla(0, 100%, 100%, ${this.rand(10, 100) / 100})`;
        this.ctx.lineWidth = 1;
        if (this.rand(0, 30) === 0) {
          this.ctx.lineWidth = 2;
        }
        if (this.rand(0, 60) === 0) {
          this.ctx.lineWidth = 3;
        }
        if (this.rand(0, 90) === 0) {
          this.ctx.lineWidth = 4;
        }
        if (this.rand(0, 120) === 0) {
          this.ctx.lineWidth = 5;
        }
        if (this.rand(0, 150) === 0) {
          this.ctx.lineWidth = 6;
        }

        this.ctx.beginPath();

        const pathCount = light.path.length;
        this.ctx.moveTo(light.x, light.y);
        for (let pc = 0; pc < pathCount; pc++) {
          this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
          if (light.canSpawn) {
            if (this.rand(0, 100) === 0) {
              light.canSpawn = false;
              this.createLightning(light.path[pc].x, light.path[pc].y, false);
            }
          }
        }

        if (!light.hasFired) {
          this.ctx.fillStyle = `rgba(255, 255, 255, ${this.rand(4, 12) / 100})`;
          this.ctx.fillRect(0, 0, this.cw, this.ch);
        }

        if (this.rand(0, 30) === 0) {
          this.ctx.fillStyle = `rgba(255, 255, 255, ${this.rand(1, 3) / 100})`;
          this.ctx.fillRect(0, 0, this.cw, this.ch);
        }

        this.ctx.stroke();
      }
    };

    lightningTimer() {
      this.lightTimeCurrent++;
      if (this.lightTimeCurrent >= this.lightTimeTotal) {
        const newX = this.rand(100, this.cw - 100);
        const newY = this.rand(0, this.ch / 2);
        let createCount = this.rand(1, 3);
        for (let i = createCount; i > 0; i--) {
          this.createLightning(newX, newY, true);
        }
        this.lightTimeCurrent = 0;
        this.lightTimeTotal = this.rand(30, 100);
      }
    };

    clearCanvas() {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.rand(1, 30) / 100})`;
      this.ctx.fillRect(0, 0, this.cw, this.ch);
      this.ctx.globalCompositeOperation = 'source-over';
    };
  }

  useEffect(() => {
    const canvas = canvasEl.current;
    const canvasWidth = canvas.width = window.innerWidth;
    const canvasHeight = canvas.height = window.innerHeight - 100;
    const canvasLightning = new CanvasLightning(canvas, canvasWidth, canvasHeight);
    let animationId = undefined;

    function draw() {
      canvasLightning.clearCanvas();
      canvasLightning.updateLightning();
      canvasLightning.lightningTimer();
      canvasLightning.renderLightning();

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.canvasLightning}>
        <canvas ref={canvasEl} />
      </div>
      <a
        href={`https://codepen.io/jackrugile/pen/fxqKJ?editors=0110`}
        target='_blank'
        rel='noopener noreferer'
      >Canvas Lightning</a>
    </div>
  )
}
