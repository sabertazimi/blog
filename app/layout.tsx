import { AntdRegistry } from '@ant-design/nextjs-registry'
import ProgressBarProvider from '@components/ProgressBarProvider'
import SandpackProvider from '@components/SandpackProvider'
import type { ReactNode } from 'react'

// Keep stylesheets importing order
import '../styles/globals.css'
import '../components/Article/Article.css'
import '../components/Button/Button.css'
import '../components/Card/Card.css'
import '../components/Skeleton/Skeleton.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SandpackProvider />
      </head>
      <body>
        <AntdRegistry>
          <ProgressBarProvider>
            {children}
          </ProgressBarProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
