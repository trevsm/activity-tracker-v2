// function to get hours, minutes, and seconds between two dates
export function getTimeBetween(startDate: Date, endDate: Date) {
  let diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  return {
    hours,
    minutes,
    seconds,
  };
}

export const grid = ({
  rows,
  cols,
  callback,
}: {
  rows: number;
  cols: number;
  callback: (loc: {x: number; y: number}) => void;
}) =>
  Array(rows)
    .fill(null)
    .map((_, y) =>
      Array(cols)
        .fill(null)
        .map((_, x) => {
          callback({x, y});
        })
    );

export function roundRect({
  ctx,
  x,
  y,
  width,
  height,
  r,
  fill = true,
  stroke = false,
}: {
  ctx: React.MutableRefObject<CanvasRenderingContext2D | undefined>;
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  fill?: boolean;
  stroke?: boolean;
}) {
  if (!ctx.current) return;

  const radius = {tl: r, tr: r, br: r, bl: r};
  ctx.current.beginPath();
  ctx.current.moveTo(x + radius.tl, y);
  ctx.current.lineTo(x + width - radius.tr, y);
  ctx.current.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.current.lineTo(x + width, y + height - radius.br);
  ctx.current.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.current.lineTo(x + radius.bl, y + height);
  ctx.current.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.current.lineTo(x, y + radius.tl);
  ctx.current.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.current.closePath();
  if (fill) {
    ctx.current.fill();
  }
  if (stroke) {
    ctx.current.stroke();
  }
}

export function shadeColor(color: string, percent: number) {
  let R: any = parseInt(color.substring(1, 3), 16);
  let G: any = parseInt(color.substring(3, 5), 16);
  let B: any = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}
