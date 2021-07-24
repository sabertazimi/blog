import React, { useEffect } from 'react';
import classNames from 'classnames';
import Typed from 'typed.js';

const TypingTitle = ({
  titles = [],
  speed = 60,
  delay = 600,
  loop = true,
  className = '',
} = {}) => {
  useEffect(() => {
    const options = {
      strings: [...titles],
      smartBackspace: true,
      typeSpeed: speed,
      backSpeed: speed,
      backDelay: delay,
      loop,
    };

    const typed = new Typed('.typing-title', options);

    return () => {
      typed.destroy();
    };
  }, [titles, speed, loop]);

  return (
    <div
      className={classNames(
        'w-full h-auto px-0 py-0 mx-auto my-0',
        'text-5xl font-extrabold text-center',
        'typing-title-container lg:text-9xl',
        className
      )}
    >
      <span className="typing-title" />
    </div>
  );
};

export default TypingTitle;
