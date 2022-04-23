import { useEffect } from 'react';

const loadScript = (url: string) => {
  const script = document.createElement('script');
  script.src = `${url}/embed.js`;
  script.setAttribute('data-timestamp', (+new Date()).toString());
  document.body.appendChild(script);
};

const useDisqus = (url: string): void => {
  useEffect(() => loadScript(url), [url]);
};

export default useDisqus;
