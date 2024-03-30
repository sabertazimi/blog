import { render } from '@utils'
import Pre from './Pre'

describe('pre', () => {
  const languages = [
    'html',
    'xml',
    'yml',
    'yaml',
    'css',
    'json',
    'md',
    'markdown',
    'js',
    'javascript',
    'ts',
    'typescript',
    'coffee',
    'coffeescript',
    'jsx',
    'tsx',
    'objc',
    'objectivec',
    'vue',
    'go',
    'java',
    'rust',
  ]

  it('should render empty children correctly (snapshot)', () => {
    const { container } = render(<Pre />)

    expect(container).toMatchSnapshot()
  })

  it('should render empty className correctly (snapshot)', () => {
    const { container } = render(
      <Pre>
        <code>const foo = bar();</code>
      </Pre>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should hidden line number correctly (snapshot)', () => {
    const { container } = render(
      <Pre noline={true}>
        <code>const foo = bar();</code>
      </Pre>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should hidden copy button correctly (snapshot)', () => {
    const { container } = render(
      <Pre nocopy={true}>
        <code>const foo = bar();</code>
      </Pre>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render highlight lines correctly (snapshot)', () => {
    const { container } = render(
      <Pre lines="1">
        <code>const foo = bar();</code>
      </Pre>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should render code title correctly (snapshot)', () => {
    const { container } = render(
      <Pre title="Code Title">
        <code>const foo = bar();</code>
      </Pre>,
    )

    expect(container).toMatchSnapshot()
  })

  it.each(languages)(
    'should render different language correctly (snapshot)',
    (language) => {
      const { container } = render(
        <Pre>
          <code className={`language-${language}`}>const foo = bar();</code>
        </Pre>,
      )

      expect(container).toMatchSnapshot()
    },
  )
})
