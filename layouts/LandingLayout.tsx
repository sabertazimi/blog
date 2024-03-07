import { MetaHeader } from '@components'
import { cx } from '@components/utils'
import landingImage from '@images/landing.jpg'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LandingLayout = ({ children }: Props): JSX.Element => (
  <div>
    <MetaHeader />
    <div
      className={cx(
        'flex-container m-0 h-screen w-full flex-col overflow-y-auto overflow-x-hidden',
        'bg-cover bg-center bg-no-repeat p-0 text-light'
      )}
      style={{
        backgroundImage: `url("${landingImage.src}")`,
      }}
    >
      {children}
    </div>
  </div>
)

export default LandingLayout
