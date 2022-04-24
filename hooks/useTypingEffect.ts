import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypingOptions {
  titles: string[];
  speed: number;
  delay: number;
  loop: boolean;
}

const useTypingEffect = (
  ref: RefObject<HTMLElement>,
  options: TypingOptions
): void => {
  const { titles, speed, delay, loop } = options;
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [...titles],
      smartBackspace: true,
      typeSpeed: speed,
      backSpeed: speed,
      backDelay: delay,
      loop,
    };

    if (ref.current) {
      typed.current = new Typed(ref.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [ref, titles, speed, delay, loop]);
};

export default useTypingEffect;
