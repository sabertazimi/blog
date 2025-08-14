'use client'

import cx from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { Check, Copy } from '@/components/Icons'
import { Toggle } from '@/components/Motion'
import { useCopyToClipboard } from '@/hooks'
import styles from './CopyButton.module.css'

interface Props {
  code: string
  className?: string
}

function CopyButton({ code, className }: Props): JSX.Element {
  const [isCopied, copy] = useCopyToClipboard(code)
  const shouldReduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      aria-label="CopyButton"
      title="Copy"
      className={cx(
        className,
        'outline-focus-visible absolute right-5 top-1.5 md:top-1',
      )}
      // eslint-disable-next-line ts/no-misused-promises -- no need to handle promise.
      onClick={copy}
    >
      <Toggle
        isToggled={isCopied}
        iconClose={<Copy className={styles.icon} />}
        iconOpen={<Check className={styles.icon} />}
        shouldReduceMotion={shouldReduceMotion}
        tabIndex={-1}
      />
    </button>
  )
}

export default CopyButton
