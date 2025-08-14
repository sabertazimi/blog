'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { siteConfig } from '@/config'

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar height="3px" color={siteConfig.themeColor} />
    </>
  )
};
