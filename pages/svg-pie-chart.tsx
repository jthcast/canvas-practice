import { useEffect, useRef } from 'react'
import styles from '../styles/Breakout.module.css'

interface BarchartOptions {
  canvas: HTMLCanvasElement;
  padding: number;
  gridColor: string;
  gridScale: number;
  data: Record<string, number>;
  colors: string[];
  seriesName: string;
}

export default function SvgPieChart() {
  const divEl = useRef<HTMLDivElement>();

  const mockData = [{
    fill: 15,
    color: '#80e080'
  }, {
    fill: 35,
    color: '#4fc3f7'
  }, {
    fill: 20,
    color: '#9575cd'
  }, {
    fill: 30,
    color: '#f06292'
  }];



  useEffect(() => {
    const div = divEl.current;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');

    let filled = 0;
    mockData.forEach((data) => {
      const { fill, color } = data;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const startAngle = -90;
      const radius = 30;
      const cx = 50;
      const cy = 50;
      const animationDuration = 1000;
      const strokeWidth = 15;
      const dashArray = 2 * Math.PI * radius;
      const dashOffset = dashArray - (dashArray * (fill / 100));
      const angle = ((filled * 360) / 100) + startAngle;
      const currentDuration = (animationDuration * fill) / 100;
      const delay = (animationDuration * filled) / 100;
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('cx', cx.toString());
      circle.setAttribute('cy', cy.toString());
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', strokeWidth.toString());
      circle.setAttribute('stroke-dasharray', dashArray.toString());
      circle.setAttribute('stroke-dashoffset', dashArray.toString());
      circle.style.transition = `stroke-dashoffset ${currentDuration}ms linear ${delay}ms`
      circle.setAttribute('transform', `rotate(${angle}, ${cx}, ${cy})`);
      svg.appendChild(circle);
      filled += fill;
      requestAnimationFrame(() => circle.style[`stroke-dashoffset`] = dashOffset);
    });
    div.appendChild(svg);

    return () => {
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={divEl} />
      <a
        href={`https://akzhy.com/blog/create-animated-donut-chart-using-svg-and-javascript`}
        target='_blank'
        rel='noopener noreferer'
      >Create animated donut chart using SVG and javascript</a>
    </div>
  )
}
