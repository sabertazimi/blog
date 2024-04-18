'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ThemeProvider } from 'antd-style'
import type { ThemeProviderProps } from 'antd-style'

interface Props<T, S = Record<string, string>> extends ThemeProviderProps<T, S> {}

export default function AntdProvider<T, S = Record<string, string>>({ children, ...props }: Props<T, S>) {
  return (
    <AntdRegistry>
      <ThemeProvider defaultThemeMode="light" {...props}>
        {children}
      </ThemeProvider>
    </AntdRegistry>
  )
};
