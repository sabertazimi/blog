import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface Props {
  titles: string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
}

const TypingTitle = ({
  titles,
  speed = 60,
  delay = 600,
  loop = true,
  className = '',
}: Props): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
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

    typed.current = new Typed(ref.current as HTMLSpanElement, options);

    return () => {
      typed.current!.destroy();
    };
  }, [titles, speed, delay, loop]);

  return (
    <div
      className={classNames(
        'w-full h-auto px-0 py-0 mx-auto my-0',
        'text-5xl font-extrabold text-center',
        'typing-title-container lg:text-9xl',
        className
      )}
    >
      <span ref={ref} />
    </div>
  );
};

export default TypingTitle;
