import type { Metadata, Viewport } from 'next'
import ProgressBarProvider from '@/components/progress-bar-provider'
import SandpackProvider from '@/components/sandpack-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { getMetadata, getViewport } from '@/lib/seo'
import './globals.css'

export function generateMetadata(): Metadata {
  return getMetadata()
}

export function generateViewport(): Viewport {
  return getViewport()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SandpackProvider />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
