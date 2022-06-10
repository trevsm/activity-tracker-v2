import {useRef} from 'react';
import {useEffect} from 'react';

export function useMountEffect(callback: () => void, deps?: any[]) {
  const mount = useRef(false);
  useEffect(() => {
    if (mount.current) {
      callback();
    }
    mount.current = true;
  }, deps);
}
