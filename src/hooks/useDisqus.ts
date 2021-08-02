import { useEffect } from 'react';

const loadScript = (url: string) => {
  const script = document.createElement('script');
  script.src = `${url}/embed.js`;
  script.setAttribute('data-timestamp', (+new Date()).toString());

  if (document.getElementById('disqus_thread')) {
    (document.body || document.head).appendChild(script);
  }
};

const useDisqus = (url: string): void => {
  useEffect(() => loadScript(url), [url]);
};

export default useDisqus;
