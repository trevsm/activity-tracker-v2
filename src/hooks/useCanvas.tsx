import {useRef, useState, useMemo, useEffect} from 'react';

interface CanvasProps {
  canvasSize: {
    width: number;
    height: number;
  };
  style?: any;
  events?: any;
}

export function useCanvas(props: CanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>();

  const [size, setSize] = useState<{width: number; height: number}>({
    ...props?.canvasSize,
  });

  const Canvas = useMemo(
    () => <canvas ref={canvas} style={{...props?.style}} {...props?.events} />,
    [props]
  );

  const draw = {
    clear: () => {
      if (!ctx.current) return;
      ctx.current.clearRect(0, 0, size.width, size.height);
    },
  };

  const fn = {};

  const setCanvasSize = () => {
    if (!canvas.current) return;

    canvas.current.width = size.width;
    canvas.current.height = size.height;
  };

  useEffect(() => {
    setCanvasSize();
  }, [size]);

  useEffect(() => {
    if (!canvas.current) return;

    const context = canvas.current.getContext('2d');
    if (!context) return;
    context.imageSmoothingEnabled = false;
    ctx.current = context;
  }, []);

  return {
    config: {
      canvasSize: size,
    },
    Canvas: () => Canvas,
    ctx,
    draw: {...draw},
    fn: {
      setSize,
      ...fn,
    },
  };
}
