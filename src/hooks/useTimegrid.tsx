import {useCanvas} from './useCanvas';
import {grid, roundRect, shadeColor, to12Hour} from '../tools';
import styled from 'styled-components';
import {config} from '../config';
import {useEffect, useRef} from 'react';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - 65; // 65px for the header

const {
  pixelRatio,
  canvas: {
    grid: {
      gap,
      pxHeight,
      size: gridSize,
      lineColor,
      offset: gridOffset,
      fontColor,
    },
    timeblock: {padding, outlineWidth, radius},
    shroud: {offset, dashed, lineDash, lineWidth},
  },
} = config;

const CanvasWrapper = styled.div<{width: number}>`
  position: relative;
  overflow: hidden;
  width: 100vw;
  max-width: ${({width}) => width + 'px'};
  height: ${windowHeight - 1}px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  .times {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    border-right: 1px solid ${lineColor};
    div.time {
      position: relative;
      height: 100%;
      div.label {
        font-size: 12px;
        padding: 5px;
        min-width: 50px;
        text-align: center;
        background: white;
        color: ${fontColor};
      }
    }
  }
`;

export function useTimegrid() {
  const {
    Canvas,
    ctx,
    fn: dFn,
    draw: dDraw,
    config: {canvasSize},
  } = useCanvas({
    canvasSize: {width: windowWidth * pixelRatio - 4, height: pxHeight},
  });

  const ratio = {
    x: canvasSize.width / gridSize.width,
    y: canvasSize.height / gridSize.height,
  };

  const draw = {
    ...dDraw,
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
          if (!ctx.current || x !== 0) return;

          ctx.current.strokeStyle = lineColor;
          ctx.current.beginPath();
          ctx.current.moveTo(0, y * ratio.y + gridOffset);
          ctx.current.lineTo(canvasSize.width, y * ratio.y + gridOffset);
          ctx.current.stroke();
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

  const initialize = () => {
    draw.clear();
    draw.bgGrid();
  };

  const resizeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initialize();
    window.addEventListener('resize', () => {
      if (resizeRef.current) clearTimeout(resizeRef.current);
      resizeRef.current = setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }, []);

  return {
    Canvas: () => (
      <CanvasWrapper width={canvasSize.width}>
        <div
          className="times"
          style={{
            height:
              canvasSize.height / pixelRatio + padding / pixelRatio + 'px',
          }}
        >
          {Array(24)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="time">
                <div className="label">{to12Hour(i)}</div>
              </div>
            ))}
        </div>
        <Canvas />
      </CanvasWrapper>
    ),
    fn,
    draw,
  };
}
