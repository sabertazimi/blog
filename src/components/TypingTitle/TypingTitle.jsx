import React, { useEffect } from 'react';
import Typed from 'typed.js';

const TypingTitle = ({ titles = [], speed = 50, loop = true, style = {}} = {}) => {
  useEffect(() => {
    const options = {
      strings: [...titles],
      smartBackspace: true,
      typeSpeed: speed,
      backSpeed: speed,
      backDelay: 1000,
      loop,
    };

    new Typed('.typing-title', options);
  }, [titles, speed, loop]);

  return (
    <div className="typing-title-container" style={{ width: '100%', height: '100%', fontSize: '5em', fontWeight: 800, textAlign: 'center', ...style }} >
      <span className="typing-title" />
    </div>
  );
};

export default TypingTitle;
