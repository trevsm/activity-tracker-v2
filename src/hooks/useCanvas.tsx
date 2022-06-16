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

  const fn = {
    clear: () => {
      if (!ctx.current) return;
      ctx.current.clearRect(0, 0, size.width, size.height);
    },
  };

  const setCanvasSize = () => {
    if (!canvas.current) return;

    canvas.current.width = size.width;
    canvas.current.height = size.height;
  };

  useEffect(() => {
    if (!canvas.current) return;

    const context = canvas.current.getContext('2d');
    if (!context) return;
    context.imageSmoothingEnabled = false;
    ctx.current = context;
  }, []);

  useEffect(() => {
    setCanvasSize();
  }, [size]);

  return {
    config: {
      canvasSize: size,
    },
    Canvas: () => Canvas,
    ctx,
    fn: {
      setSize,
      ...fn,
    },
  };
}
