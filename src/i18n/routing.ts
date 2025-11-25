import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en-US', 'zh-CN'],
  defaultLocale: 'en-US',
  localePrefix: 'always',
})
