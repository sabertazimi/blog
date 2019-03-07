import { useEffect } from 'react';

const useDisqus = (url) => {
  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `${url}/embed.js`;
    script.setAttribute('data-timestamp', +new Date());

    if (document.getElementById('disqus_thread')) {
      (document.body || document.head).appendChild(script);
    }
  };

  useEffect(() => loadScript());
};

export default useDisqus;

