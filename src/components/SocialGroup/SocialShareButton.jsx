import React from 'react';
import { Button } from 'semantic-ui-react';

const SocialShareButton = ({ color, type, url }) => {
  const handleShare = () => {
    window.open(url, '_blank');
    window.focus();
  };

  return (
    <Button
      color={`${color}`}
      icon={`${type}`}
      style={{
        margin: 0,
        padding: 0,
        borderRadius: 0,
        width: '50px',
        height: '50px',
        zIndex: 999,
      }}
      size="huge"
      onClick={handleShare}
    />
  );
};

export default SocialShareButton;
