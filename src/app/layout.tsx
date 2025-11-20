import type { Metadata, Viewport } from 'next'
import ProgressBarProvider from '@/components/providers/progress-bar-provider'
import SandpackProvider from '@/components/providers/sandpack-provider'
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
    <html lang="en">
      <head>
        <SandpackProvider />
      </head>
      <body className="antialiased">
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  )
}
