import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#76d9e6',
    backgroundColor: '#2a2a2a',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: '#6f705e',
      },
    },
    {
      types: ['null', 'boolean', 'number', 'operator'],
      style: {
        color: '#a77afe',
      },
    },
    {
      types: ['char', 'tag'],
      style: {
        color: '#ff79c6',
      },
    },
    {
      types: ['attr-name', 'string', 'url', 'changed'],
      style: {
        color: '#e6d06c',
      },
    },
    {
      types: ['entity'],
      style: {
        color: '#e6d06c',
        cursor: 'help',
      },
    },
    {
      types: ['function', 'selector', 'builtin', 'inserted'],
      style: {
        color: '#a6e22d',
      },
    },
    {
      types: [
        'atrule',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'constant',
        'debug',
        'deleted',
      ],
      style: {
        color: '#f92672',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#f92672',
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'statement'],
      style: {
        color: '#76d9e6',
      },
    },
    {
      types: ['statement'],
      style: {
        color: '#76d9e6',
        fontWeight: 'bold',
      },
    },
    {
      types: ['placeholder', 'variable', 'punctuation', 'symbol'],
      style: {
        color: '#f8f8f2',
      },
    },
  ],
};

export default theme;
