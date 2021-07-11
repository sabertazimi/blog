import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Visibility } from 'semantic-ui-react';
import { useResponsive } from 'hooks';
import { BreakPoints, Colors } from 'config';

const ScrollButton = () => {
  const [direction, setDirection] = useState('down');
  const isMobile = useResponsive({ maxWidth: BreakPoints.mobile });

  const onScroll = (e, { calculations }) =>
    setDirection(calculations.direction);

  const scrollTo = event => {
    event.preventDefault();
    event.stopPropagation();

    const element = document.querySelector(
      direction === 'down' ? '#scroll-top-anchor' : '.blog-footer'
    );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // only run when mounting
  useEffect(() => {
    const topAnchor = document.createElement('div');
    topAnchor.id = 'scroll-top-anchor';
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = 0;
    document.body.appendChild(topAnchor);

    return () => {
      topAnchor.remove();
    };
  }, []);

  return (
    <Visibility onUpdate={onScroll} once={false}>
      <Button
        type="primary"
        shape="circle"
        icon={direction === 'down' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        size={isMobile ? 'small' : 'large'}
        style={{
          position: 'fixed',
          right: isMobile ? '10px' : '30px',
          bottom: isMobile ? '2%' : '3%',
          margin: 0,
          zIndex: 999,
          color: Colors.light,
        }}
        onClick={scrollTo}
      />
    </Visibility>
  );
};

export default ScrollButton;
