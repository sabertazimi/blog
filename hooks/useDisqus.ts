import { useEffect } from 'react'

function loadScript(url: string) {
  const script = document.createElement('script')
  script.src = `${url}/embed.js`
  script.setAttribute('data-timestamp', Date.now().toString())
  document.body.appendChild(script)
}

function useDisqus(url: string): void {
  useEffect(() => loadScript(url), [url])
}

export default useDisqus
