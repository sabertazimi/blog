import cx from 'classnames'
import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import styles from './BlockCode.module.css'
import theme from './monokai'

interface Props {
  enableLine: boolean
  lines: Set<number>
  language: Language
  children: string
}

function BlockCode({
  enableLine,
  lines,
  language,
  children,
}: Props): JSX.Element {
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={cx(className, styles.code)} style={style}>
          {tokens.map((line, index) => (
            <div
              key={index}
              {...getLineProps({ line, key: index })}
              className={cx(
                'token-line',
                lines.has(index + 1) ? styles.highlight : styles.hover,
              )}
            >
              {enableLine
                ? (
                  <span className={styles.number}>{index + 1}</span>
                  )
                : (
                  <span className={styles.placeholder}></span>
                  )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default BlockCode
