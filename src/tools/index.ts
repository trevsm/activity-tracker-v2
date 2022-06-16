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

// function that returns an empty grid of size rows x cols
// used to easily iterate a 2d n amount of times
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
  uncap,
  fill = true,
  stroke = false,
}: {
  ctx: React.MutableRefObject<CanvasRenderingContext2D | undefined>;
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  uncap?: {
    top?: boolean;
    bottom?: boolean;
  };
  fill?: boolean;
  stroke?: boolean;
}) {
  if (!ctx.current) return;

  const radius = {tl: r, tr: r, br: r, bl: r};
  ctx.current.beginPath();
  ctx.current.moveTo(x + radius.tl, y);

  if (uncap?.top) {
    ctx.current.lineTo(x + width, y);
  } else {
    ctx.current.lineTo(x + width - radius.tr, y);
    ctx.current.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  }

  if (uncap?.bottom) {
    ctx.current.lineTo(x + width, y + height);
    ctx.current.lineTo(x, y + height);
  } else {
    ctx.current.lineTo(x + width, y + height - radius.br);
    ctx.current.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.current.lineTo(x + radius.bl, y + height);
    ctx.current.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  }

  if (uncap?.top) {
    ctx.current.lineTo(x, y);
  } else {
    ctx.current.lineTo(x, y + radius.tl);
    ctx.current.quadraticCurveTo(x, y, x + radius.tl, y);
  }
  ctx.current.closePath();

  if (fill) {
    ctx.current.fill();
  }
  if (stroke) {
    ctx.current.stroke();
  }
}
//credit: https://gist.github.com/renancouto/4675192
export const shadeColor = function (color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;

  const final = (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1);

  return '#' + final;
};

export function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}
