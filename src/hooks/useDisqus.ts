import { useEffect } from 'react';

const loadScript = (url) => {
  const script = document.createElement('script');
  script.src = `${url}/embed.js`;
  script.setAttribute('data-timestamp', +new Date());

  if (document.getElementById('disqus_thread')) {
    (document.body || document.head).appendChild(script);
  }
};

const useDisqus = (url) => {
  useEffect(() => loadScript(url), [url]);
};

export default useDisqus;
