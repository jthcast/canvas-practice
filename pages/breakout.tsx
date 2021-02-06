import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

export default function Breakout() {
  const canvasEl = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');
    let ballRadius = 3;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let speed = 6;
    let dx = speed;
    let dy = -speed;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 60;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let score = 0;
    let lives = 3;
    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    function drawLives() {
      ctx.font = `16px Arial`;
      ctx.fillStyle = `#0095DD`;
      ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    }


    function drawScore() {
      ctx.font = `16px Arial`;
      ctx.fillStyle = `#0095DD`;
      ctx.fillText(`Score: ${score}`, 8, 20);
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
              if (score === brickRowCount * brickColumnCount) {
                document.location.reload();
              }
            }
          }
        }
      }
    }

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = `#0095DD`;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = `#0095DD`;
      ctx.fill();
      ctx.closePath();
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = `#0095DD`;
      ctx.fill();
      ctx.closePath();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = speed;
            dy = -speed;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }

    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === `Right` || e.key === `ArrowRight`) {
        rightPressed = true;
      } else if (e.key === `Left` || e.key === `ArrowLeft`) {
        leftPressed = true;
      }
    }

    function keyUpHandler(e: KeyboardEvent) {
      if (e.key === `Right` || e.key === `ArrowRight`) {
        rightPressed = false;
      } else if (e.key === `Left` || e.key === `ArrowLeft`) {
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e: MouseEvent) {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }

    document.addEventListener(`keydown`, keyDownHandler);
    document.addEventListener(`keyup`, keyUpHandler);
    document.addEventListener(`mousemove`, mouseMoveHandler);
    draw();

    return () => {
      document.removeEventListener(`keydown`, keyDownHandler);
      document.removeEventListener(`keyup`, keyUpHandler);
      document.removeEventListener(`mousemove`, mouseMoveHandler);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasEl} width={400} height={400} />
      <a
        href={`https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript`}
        target='_blank'
        rel='noopener noreferer'
      >2D breakout game using pure JavaScript</a>
    </div>
  )
}
