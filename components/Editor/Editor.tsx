import type { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { monokaiProTheme, Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { languageToFilepath, normalizeFilepath } from './utils';

interface Props {
  template?: SandpackPredefinedTemplate;
  children?: ReactNode;
}

const Editor = ({ template = 'react-ts', children }: Props): JSX.Element => {
  const codeSnippets = React.Children.toArray(children);
  const files = codeSnippets.reduce(
    (
      result: {
        [key in string]: {
          code: any;
        };
      },
      codeSnippet
    ) => {
      const preElement = codeSnippet as ReactElement;
      const codeElement = preElement.props.children;

      const filename = preElement.props.filename;
      const language = codeElement.props.className.replace('language-', '');
      const filePath =
        normalizeFilepath(filename) || languageToFilepath(language);
      const code = codeElement.props.children;

      result[filePath] = {
        code,
      };

      return result;
    },
    {}
  );

  return (
    <Sandpack
      template={template}
      theme={monokaiProTheme}
      customSetup={{
        files,
        dependencies: {},
      }}
      options={{
        showLineNumbers: true,
        showInlineErrors: false,
        showTabs: true,
        externalResources: [],
      }}
    />
  );
};

export default Editor;
