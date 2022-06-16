const pixelRatio = Math.ceil(window.devicePixelRatio);

export const config = {
  pixelRatio,
  canvas: {
    grid: {
      opacity: 0.015,
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
