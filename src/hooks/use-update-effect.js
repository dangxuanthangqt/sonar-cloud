import { useEffect, useRef } from 'react';

export const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);

  // for react-refresh
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      effect();
    }
  }, deps);
};
