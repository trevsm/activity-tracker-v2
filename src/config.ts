const pixelRatio = Math.ceil(window.devicePixelRatio);

export const config = {
  pixelRatio,
  header: {
    height: 65,
  },
  canvas: {
    grid: {
      lineColor: '#e5e5e5',
      fontColor: '#70757a',
      offset: 12 * pixelRatio,
      size: {
        width: 8,
        height: 24,
      },
      pxHeight: 1500 * pixelRatio,
      gap: 1 * pixelRatio,
    },
    timeblock: {
      padding: 4 * pixelRatio,
      outlineWidth: 0.01 * pixelRatio,
      radius: 10 * pixelRatio,
    },
    shroud: {
      dashed: false,
      lineWidth: 2 * pixelRatio,
      offset: 0, // offset from edge of ongoing timeblock
      lineDash: {
        opacity: 0.1,
        width: 5 * pixelRatio,
        spacing: 5 * pixelRatio,
      },
    },
  },
};
