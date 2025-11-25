'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ProgressProvider } from '@bprogress/next/app'
import { getSandpackCssText } from '@codesandbox/sandpack-react'
import { ThemeProvider } from 'next-themes'
import { useServerInsertedHTML } from 'next/navigation'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      <ProgressProvider height="4px" color="var(--color-primary)" options={{ showSpinner: false }} shallowRouting>
        {children}
      </ProgressProvider>
    </ThemeProvider>
  )
}

/**
 * Ensures CSSinJS styles are loaded server side.
 */
export function SandPackCSS() {
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
