'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { siteConfig } from '@/lib/site'

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider height="4px" color={siteConfig.themeColor} options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}
