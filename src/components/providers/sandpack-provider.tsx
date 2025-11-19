'use client'

import { getSandpackCssText } from '@codesandbox/sandpack-react'
import { useServerInsertedHTML } from 'next/navigation'

/**
 * Ensures CSSinJS styles are loaded server side.
 */
export default function SandPackCSS() {
  useServerInsertedHTML(() => {
    return (
      <style
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- render sandpack css
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
        id="sandpack"
      />
    )
  })

  return null
}
