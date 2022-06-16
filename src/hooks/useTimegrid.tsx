import {useCanvas} from './useCanvas';
import {grid, roundRect, shadeColor} from '../tools';
import styled from 'styled-components';

const CanvasWrapper = styled.div<{width: number}>`
  overflow: hidden;
  width: ${({width}) => width + 'px'};
  height: ${window.innerHeight - 5}px;
  overflow-y: auto;
  margin: 0 auto;
  clip-path: inset(2px);
`;

export function useTimegrid() {
  const grey = '#f1f1f1';
  const maxWidth = 800;
  const width = window.innerWidth <= maxWidth ? window.innerWidth : maxWidth;

  const {
    Canvas,
    ctx,
    fn: dFn,
    config: {canvasSize},
  } = useCanvas({
    canvasSize: {width: width - 4, height: 1500},
    style: {backgroundColor: grey},
  });

  const gridSize = {
    w: 5,
    h: 48,
  };
  const ratio = {
    x: canvasSize.width / gridSize.w,
    y: canvasSize.height / gridSize.h,
  };
  const pad = 1;

  const draw = {
    block: ({
      startTime,
      endTime,
      color = '#000',
    }: {
      startTime: number;
      endTime: number;
      color?: string;
    }) => {
      if (!ctx.current) return;

      const padding = 5;

      const x = ratio.x + padding / 2 + 1;
      const y = ratio.y * startTime + padding / 2 + 1;
      const w = ratio.x - padding - 1;
      const h = ratio.y * (endTime - startTime) - padding - 1;
      const r = 10;

      ctx.current.fillStyle = color;
      ctx.current.strokeStyle = shadeColor(color, -30);
      ctx.current.lineWidth = 3;

      roundRect({
        ctx,
        x,
        y,
        width: w,
        height: h,
        r,
        stroke: true,
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
              x * ratio.x + pad,
              y * ratio.y + pad,
              ratio.x - pad,
              ratio.y - pad
            );
        },
      });
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
