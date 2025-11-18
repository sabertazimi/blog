'use client'

import type { MotionProps } from 'framer-motion'
import type { KeyboardEvent } from 'react'
import type { Route } from '@/types'
import { useCallback, useState } from 'react'
import { Hamburger } from '@/components/Icons'
import { Switch } from '@/components/Motion'
import { routes as defaultRoutes } from '@/config'
import styles from './LandingNav.module.css'
import LandingNavLink from './LandingNavLink'

interface Props {
  routes?: Route[]
}

const navVariants: MotionProps['variants'] = {
  open: {
    x: 0,
    opacity: 1,
  },
  close: {
    x: '-100%',
    opacity: 0,
  },
}

const navTransition: MotionProps['transition'] = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
}

const bannerVariants: MotionProps['variants'] = {
  open: {
    x: 0,
  },
  close: {
    x: '-100%',
  },
}

const bannerTransition: MotionProps['transition'] = {
  type: 'tween',
  ease: 'circInOut',
  duration: 0.4,
}

function LandingNav({ routes = defaultRoutes }: Props) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = useCallback(() => {
    setExpanded(expanded => !expanded)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter')
      setExpanded(expanded => !expanded)
  }, [])

  return (
    <>
      <Hamburger
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={styles.icon}
        data-testid="hamburger-button"
      />
      <Switch
        className={styles.nav}
        role="navigation"
        open={expanded}
        variants={navVariants}
        transition={navTransition}
      >
        {routes.map(route => (
          <LandingNavLink key={route.id} title={route.title} href={route.path}>
            {route.name}
          </LandingNavLink>
        ))}
      </Switch>
      <Switch
        className={styles.banner}
        role="banner"
        open={expanded}
        variants={bannerVariants}
        transition={bannerTransition}
      />
    </>
  )
}

export default LandingNav
