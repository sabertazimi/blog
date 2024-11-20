'use client'

import type { MotionProps } from 'framer-motion'
import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import IconFactory from './IconFactory'

const firstVariants: MotionProps['variants'] = {
  checked: { y: '30%', rotate: 45 },
  unchecked: { y: 0, rotate: 0 },
}

const secondVariants: MotionProps['variants'] = {
  checked: { scaleX: 0 },
  unchecked: { scaleX: 1 },
}

const thirdVariants: MotionProps['variants'] = {
  checked: { y: '-30%', rotate: -45 },
  unchecked: { y: 0, rotate: 0 },
}

function Svg(): JSX.Element {
  const [isChecked, setIsChecked] = useState(false)
  const handleClick = useCallback(
    () => setIsChecked(isChecked => !isChecked),
    [],
  )
  const handleKeyDown = useCallback((event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Enter')
      setIsChecked(isChecked => !isChecked)
  }, [])

  return (
    <motion.svg
      viewBox="0 0 1024 1024"
      p-id="7522"
      width="2em"
      height="2em"
      fill="currentColor"
      tabIndex={0}
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid="hamburger-icon"
    >
      <motion.path
        d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
        variants={firstVariants}
      />
      <motion.path
        d="M904 472H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
        variants={secondVariants}
      />
      <motion.path
        d="M904 784H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
        variants={thirdVariants}
      />
    </motion.svg>
  )
}

const Hamburger = IconFactory(Svg, 'hamburger')
export default Hamburger
