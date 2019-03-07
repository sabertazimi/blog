import React from 'react';
import SocialShareButton from './SocialShareButton';
import './SocialGroup.css';

const SocialGroup = () => {
  return (
    <div style={{
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      top: '50%',
      left: 0,
    }}
    className="social-group"
    >
      <SocialShareButton color="red" type="weibo" url={`http://service.weibo.com/share/share.php?url=${window.location.href}`} />
      <SocialShareButton color="facebook" type="facebook" url={`https://www.facebook.com/sharer.php?u=${window.location.href}`}/>
      <SocialShareButton color="twitter" type="twitter" url={`https://twitter.com/intent/tweet?url=${window.location.href}`} />
      <SocialShareButton color="linkedin" type="linkedin" url={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}/>
    </div>
  );
};

export default SocialGroup;
