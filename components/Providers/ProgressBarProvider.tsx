'use client'

import { siteConfig } from '@/config'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar height="3px" color={siteConfig.themeColor} />
    </>
  )
};
