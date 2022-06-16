import {useCanvas} from './useCanvas';
import {grid, roundRect, shadeColor} from '../tools';
import styled from 'styled-components';
import {config} from '../config';

const maxWidth = 800;
const width = window.innerWidth <= maxWidth ? window.innerWidth : maxWidth;

const {
  pixelRatio,
  canvas: {
    grid: {gap, pxHeight, size: gridSize, opacity},
    timeblock: {padding, outlineWidth, radius},
    shroud: {offset, dashed, lineDash, lineWidth},
  },
} = config;

const CanvasWrapper = styled.div<{width: number}>`
  overflow: hidden;
  background: rgba(0, 0, 0, ${opacity});
  width: 100vw;
  max-width: ${({width}) => width + 'px'};
  height: ${window.innerHeight - 1}px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
`;

export function useTimegrid() {
  const {
    Canvas,
    ctx,
    fn: dFn,
    config: {canvasSize},
  } = useCanvas({
    canvasSize: {width: width * pixelRatio - 4, height: pxHeight},
    style: {backgroundColor: `rgba(0, 0, 0, ${opacity})`},
  });

  const ratio = {
    x: canvasSize.width / gridSize.width,
    y: canvasSize.height / gridSize.height,
  };

  const draw = {
    timeblock: ({
      col,
      startTime,
      endTime,
      color = '#000',
    }: {
      col: number;
      startTime: Date;
      endTime: Date | null;
      color?: string;
    }) => {
      if (!ctx.current) return;

      let cStart = new Date(startTime);
      let cEnd = endTime ? new Date(endTime) : new Date();

      const startHasPrevDay =
        cStart.getTime() < new Date().setHours(0, 0, 0, 0);

      if (startHasPrevDay) {
        cStart = new Date(new Date().setHours(0, 0, 0, 0));
      }

      if (cStart >= cEnd) return;

      const start = cStart.getHours() + cStart.getMinutes() / 60;
      let end = cEnd
        ? cEnd.getHours() + cEnd.getMinutes() / 60
        : new Date().getHours() + new Date().getMinutes() / 60;

      const x = ratio.x * col + gap + padding / 2;
      const y = ratio.y * start + gap + padding / 2;
      const w = ratio.x - gap - padding;
      const h = ratio.y * (end - start) - gap - padding;

      ctx.current.fillStyle = color;
      ctx.current.strokeStyle = shadeColor(color, -20);
      ctx.current.lineWidth = outlineWidth;

      roundRect({
        ctx,
        x,
        y,
        width: w,
        height: h,
        r: radius,
        stroke: true,
        uncap: {
          bottom: !endTime,
          top: startHasPrevDay,
        },
      });
    },
    bgGrid: () => {
      if (!ctx.current) return;

      ctx.current.fillStyle = '#fff';

      grid({
        rows: Math.round(canvasSize.height / ratio.y),
        cols: Math.round(canvasSize.width / ratio.x),
        callback: ({x, y}) => {
          if (ctx.current)
            ctx.current.fillRect(
              x * ratio.x + gap,
              y * ratio.y + gap,
              ratio.x,
              ratio.y - gap
            );
        },
      });
    },
    greyShroud: () => {
      if (!ctx.current) return;

      const now = new Date();

      const curr = ratio.y * (now.getHours() + now.getMinutes() / 60);

      ctx.current.globalAlpha = 0.1;

      ctx.current.fillStyle = '#000000';
      ctx.current.fillRect(
        0,
        curr - gap + offset / 2,
        canvasSize.width,
        ratio.y * 24
      );

      if (dashed) {
        ctx.current.globalAlpha = lineDash.opacity;
        ctx.current.lineWidth = lineWidth;
        ctx.current.beginPath();
        ctx.current.setLineDash([lineDash.width, lineDash.spacing]);
        ctx.current.moveTo(0, curr + offset);
        ctx.current.lineTo(canvasSize.width, curr + offset);
        ctx.current.stroke();
        ctx.current.setLineDash([]);
      }

      ctx.current.globalAlpha = 1;
    },
  };

  const fn = {
    ...dFn,
  };

  return {
    Canvas: () => (
      <CanvasWrapper width={canvasSize.width}>
        <Canvas />
      </CanvasWrapper>
    ),
    fn,
    draw,
  };
}
