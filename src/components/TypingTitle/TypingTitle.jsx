import React, { useEffect } from 'react';
import Typed from 'typed.js';

const TypingTitle = ({
  titles = [],
  speed = 50,
  loop = true,
  className = '',
} = {}) => {
  useEffect(() => {
    const options = {
      strings: [...titles],
      smartBackspace: true,
      typeSpeed: speed,
      backSpeed: speed,
      backDelay: 1000,
      loop,
    };

    const typed = new Typed('.typing-title', options);

    return () => {
      typed.destroy();
    };
  }, [titles, speed, loop]);

  return (
    <div
      className={`w-full h-auto px-0 py-0 mx-auto my-0 text-5xl font-extrabold text-center typing-title-container lg:text-9xl ${className}`}
    >
      <span className="typing-title" />
    </div>
  );
};

export default TypingTitle;
