import type { Metadata, Viewport } from 'next'
import { Providers, SandPackCSS } from '@/app/providers'
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
        <SandPackCSS />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
