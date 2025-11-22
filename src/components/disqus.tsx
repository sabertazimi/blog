'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const THREAD_ID = 'disqus_thread'
const EMBED_SCRIPT_ID = 'dsq-embed-scr'

const CALLBACKS = [
  'preData',
  'preInit',
  'onInit',
  'onReady',
  'afterRender',
  'preReset',
  'onIdentify',
  'beforeComment',
  'onNewComment',
  'onPaginate',
] as const

interface DisqusSSO {
  name?: string
  button?: string
  icon?: string
  url?: string
  logout?: string
  profile_url?: string
  width?: string
  height?: string
}

interface DisqusConfig {
  identifier?: string
  url?: string
  title?: string
  language?: string
  categoryID?: string
  remoteAuthS3?: string
  apiKey?: string
  sso?: DisqusSSO
  preData?: () => void
  preInit?: () => void
  onInit?: () => void
  onReady?: () => void
  afterRender?: () => void
  preReset?: () => void
  onIdentify?: () => void
  beforeComment?: () => void
  onNewComment?: () => void
  onPaginate?: () => void
}

interface DisqusProps extends React.ComponentPropsWithoutRef<'div'> {
  shortname: string
  config: DisqusConfig
}

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload?: boolean, config?: () => void }) => void
    }
    disqus_config?: () => void
    disqus_shortname?: string
  }
}

function insertScript(src: string, id: string, parentElement: HTMLElement): HTMLScriptElement {
  const script = window.document.createElement('script')
  script.async = true
  script.src = src
  script.id = id
  parentElement.appendChild(script)
  return script
}

function removeScript(id: string, parentElement: HTMLElement): void {
  const script = window.document.getElementById(id)
  if (script) {
    parentElement.removeChild(script)
  }
}

function removeResources(): void {
  const disqusResources = window.document.querySelectorAll(
    'link[href*="disquscdn.com/next/embed"], link[href*="disquscdn.com/next/recommendations"], link[href*="disqus.com/next/config.js"], script[src*="disquscdn.com/next/embed"], script[src*="disqus.com/count-data.js"], iframe[title="Disqus"]',
  )
  disqusResources.forEach(el => el.remove())
}

function Disqus({ shortname, config, className, ...rest }: DisqusProps) {
  const prevConfigRef = useRef<DisqusConfig | undefined>(undefined)

  const getDisqusConfig = (cfg: DisqusConfig) => {
    return function (this: {
      page: {
        identifier?: string
        url?: string
        title?: string
        category_id?: string
        remote_auth_s3?: string
        api_key?: string
      }
      sso?: DisqusSSO
      language?: string
      callbacks: Record<string, Array<(() => void) | undefined>>
    }) {
      this.page.identifier = cfg.identifier
      this.page.url = cfg.url
      this.page.title = cfg.title
      this.page.category_id = cfg.categoryID
      this.page.remote_auth_s3 = cfg.remoteAuthS3
      this.page.api_key = cfg.apiKey
      if (cfg.sso) {
        this.sso = cfg.sso
      }
      const language = cfg.language
      if (language !== undefined && language.length > 0) {
        this.language = language
      }

      CALLBACKS.forEach((callbackName) => {
        this.callbacks[callbackName] = [cfg[callbackName]]
      })
    }
  }

  const loadInstance = () => {
    if (typeof window === 'undefined') {
      return
    }

    const doc = window.document
    if (window.DISQUS && doc.getElementById(EMBED_SCRIPT_ID)) {
      window.DISQUS.reset({
        reload: true,
        config: getDisqusConfig(config),
      })
    } else {
      window.disqus_config = getDisqusConfig(config)
      window.disqus_shortname = shortname
      insertScript(`https://${shortname}.disqus.com/embed.js`, EMBED_SCRIPT_ID, doc.body)
    }
  }

  const cleanInstance = () => {
    if (typeof window === 'undefined') {
      return
    }

    const doc = window.document
    removeScript(EMBED_SCRIPT_ID, doc.body)
    if (window.DISQUS) {
      window.DISQUS.reset({})
    }

    try {
      delete window.DISQUS
    } catch {
      window.DISQUS = undefined
    }

    const disqusThread = doc.getElementById(THREAD_ID)
    if (disqusThread) {
      while (disqusThread.hasChildNodes()) {
        disqusThread.removeChild(disqusThread.firstChild!)
      }
    }
    removeResources()
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // If the shortname changes, clean the old instance
    const existingShortname = window.disqus_shortname
    if (existingShortname !== undefined && existingShortname.length > 0 && existingShortname !== shortname) {
      cleanInstance()
    }

    loadInstance()

    return () => {
      cleanInstance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-execute when shortname changes
  }, [shortname])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // shallow compare config, avoid unnecessary reload
    const hasConfigChanged
      = prevConfigRef.current !== undefined
        && (prevConfigRef.current.identifier !== config.identifier
          || prevConfigRef.current.url !== config.url
          || prevConfigRef.current.title !== config.title)

    if (hasConfigChanged) {
      loadInstance()
    }

    prevConfigRef.current = config
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-execute when config changes
  }, [config])

  return (
    <div
      id={THREAD_ID}
      className={cn(
        'after:bg-background relative after:absolute after:bottom-0 after:clear-both after:block after:h-14 after:content-[""]',
        className,
      )}
      {...rest}
    />
  )
}

export default Disqus
