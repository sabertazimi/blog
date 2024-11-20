import type { Language } from 'prism-react-renderer'
import cx from 'classnames'
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
              {...getLineProps({ line, key: index })}
              className={cx(
                'token-line',
                lines.has(index + 1) ? styles.highlight : styles.hover,
              )}
              // eslint-disable-next-line react/no-array-index-key -- No other unique key.
              key={index}
            >
              {enableLine
                ? (
                    <span className={styles.number} key={0}>{index + 1}</span>
                  )
                : (
                    <span className={styles.placeholder} key={0}></span>
                  )}
              {line.map((token, key) => (
                // eslint-disable-next-line react/no-array-index-key -- No other unique key.
                <span {...getTokenProps({ token, key })} key={key + Number(enableLine)} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default BlockCode
