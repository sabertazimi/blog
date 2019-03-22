import React from 'react';

const LandingPanel = ({ children, style }) => (
  <div
    style={{
      boxSizing: 'border-box',
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '50%',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

export default LandingPanel;
