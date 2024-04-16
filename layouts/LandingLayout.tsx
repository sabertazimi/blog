import cx from 'classnames'
import type { ReactNode } from 'react'
import landingImage from '@/images/landing.jpg'

interface Props {
  children: ReactNode
}

function LandingLayout({ children }: Props): JSX.Element {
  return (
    <div
      className={cx(
        'flex-container m-0 h-screen w-full flex-col overflow-y-auto overflow-x-hidden',
        'bg-cover bg-center bg-no-repeat p-0 text-light',
      )}
      style={{
        backgroundImage: `url("${landingImage.src}")`,
      }}
    >
      {children}
    </div>
  )
}

export default LandingLayout
