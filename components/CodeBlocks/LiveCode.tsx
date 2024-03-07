import type { Language } from 'prism-react-renderer'
import React from 'react'
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live-runner'
import styles from './LiveCode.module.css'
import theme from './monokai'

interface Props {
  language?: Language
  children?: string
}

const scope = {
  ...React,
}

const LiveCode = ({ language, children }: Props): JSX.Element => (
  <div className={styles.container}>
    <LiveProvider
      scope={scope}
      code={children}
      language={language}
      theme={theme}
    >
      <LiveEditor padding="1.25rem" className={styles.editor} />
      <LivePreview className={styles.preview} />
      <LiveError className={styles.error} />
    </LiveProvider>
  </div>
)

export default LiveCode
