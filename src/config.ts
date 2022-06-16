const pixelRatio = Math.ceil(window.devicePixelRatio);

export const config = {
  pixelRatio,
  canvas: {
    grid: {
      size: {
        width: 7,
        height: 24,
      },
      pxHeight: 1000 * pixelRatio,
      gap: 1 * pixelRatio,
    },
    timeblock: {
      padding: 4 * pixelRatio,
      outlineWidth: 0.01 * pixelRatio,
      radius: 10 * pixelRatio,
    },
    shroud: {
      offset: 2 * pixelRatio, // offset from edge of ongoing timeblock
      lineWidth: 2 * pixelRatio,
      lineDash: {
        opacity: 0.1,
        width: 5 * pixelRatio,
        spacing: 5 * pixelRatio,
      },
    },
  },
};
