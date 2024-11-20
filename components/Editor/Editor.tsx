import type { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import type { ReactElement, ReactNode } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { monokaiPro } from '@codesandbox/sandpack-themes'
import { Children } from 'react'
import { normalizeFilepath } from './utils'

interface Props {
  template?: SandpackPredefinedTemplate
  children?: ReactNode
}

interface CodeProps {
  children: string
  className?: string
}

interface PreProps {
  children: ReactElement<CodeProps>
  filename?: string
}

function Editor({ template = 'react-ts', children }: Props): JSX.Element {
  // eslint-disable-next-line react/no-children-to-array -- Transform children to array.
  const codeSnippets = Children.toArray(children)
  const files = codeSnippets.reduce(
    (result: Record<string, { code: string }>, codeSnippet) => {
      const preElement = codeSnippet as ReactElement<PreProps>
      const codeElement = preElement.props.children

      const filename = preElement.props.filename
      const language = codeElement.props.className?.replace('language-', '')
      const filePath = normalizeFilepath(filename, language)
      const code = codeElement.props.children

      // eslint-disable-next-line security/detect-object-injection -- `result` is not to execute.
      result[filePath] = {
        code,
      }

      return result
    },
    {},
  )

  return (
    <div className="dark:shadow-xl dark:shadow-primary">
      <Sandpack
        customSetup={{
          dependencies: {},
        }}
        files={files}
        options={{
          showLineNumbers: true,
          showInlineErrors: false,
          showTabs: true,
          externalResources: [],
        }}
        template={template}
        theme={monokaiPro}
      />
    </div>
  )
}

export default Editor
