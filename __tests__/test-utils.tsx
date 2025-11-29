import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ProgressProvider } from '@bprogress/next/app'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

const messagesEnUS = JSON.parse(readFileSync(join(process.cwd(), 'messages/en-US.json'), 'utf-8')) as Record<
  string,
  unknown
>
const messagesZhCN = JSON.parse(readFileSync(join(process.cwd(), 'messages/zh-CN.json'), 'utf-8')) as Record<
  string,
  unknown
>
const messages = {
  'en-US': messagesEnUS,
  'zh-CN': messagesZhCN,
}

interface AllTheProvidersProps {
  children: ReactNode
  locale?: 'en-US' | 'zh-CN'
}

function AllTheProviders({ children, locale = 'en-US' }: AllTheProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <ProgressProvider>{children}</ProgressProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: 'en-US' | 'zh-CN'
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { locale = 'en-US', ...renderOptions } = options ?? {}
  const user = userEvent.setup()

  return {
    user,
    ...render(ui, {
      wrapper: ({ children }) => <AllTheProviders locale={locale}>{children}</AllTheProviders>,
      ...renderOptions,
    }),
  }
}

export * from '@testing-library/react'
export { customRender as render }
