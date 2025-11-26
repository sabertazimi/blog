import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

// Import messages dynamically to avoid Vitest JSON import issues
const messagesEnUS = {
  site: {
    title: 'Sabertaz Blog',
    description: 'A modern blog about web development, programming, and technology.',
    landingTitles: ['Programmer', 'Developer', 'Learner'],
  },
  routes: {
    posts: { name: 'Posts', title: 'Sabertaz Blog', description: 'Share technical articles and thoughts.' },
    about: { name: 'About', title: 'About Me', description: 'Learn more about me and my work.' },
  },
  about: {
    bio: 'Web Developer',
    location: 'Undefined',
    followers: 'Followers',
    following: 'Following',
    totalRepositories: 'Total Repositories',
    publicRepositories: 'Public Repositories',
    totalStars: 'Total Stars',
    acrossAllProjects: 'Across all projects',
    featuredRepositories: 'Featured Repositories',
  },
  common: {
    all: 'All',
    selectLanguage: 'Select Language',
  },
  post: {
    readingTime: 'minute',
    selectCategory: 'Select category',
    notFound: 'Post not found',
    backToHome: 'Back to home',
    onThisPage: 'On this page',
  },
}

const messagesZhCN = {
  site: {
    title: 'Sabertaz 博客',
    description: '一个关于 Web 开发、编程和技术的现代博客。',
    landingTitles: ['编程者', '开发者', '学习者'],
  },
  routes: {
    posts: { name: '文章', title: 'Sabertaz 博客', description: '分享技术文章和思考。' },
    about: { name: '关于', title: '关于我', description: '了解更多关于我和我的工作。' },
  },
  about: {
    bio: 'Web 开发者',
    location: 'Undefined',
    followers: '关注者',
    following: '正在关注',
    totalRepositories: '仓库总数',
    publicRepositories: '公开仓库',
    totalStars: '星标总数',
    acrossAllProjects: '所有项目',
    featuredRepositories: '精选仓库',
  },
  common: {
    all: '全部',
    selectLanguage: '选择语言',
  },
  post: {
    readingTime: '分钟',
    selectCategory: '选择分类',
    notFound: '文章未找到',
    backToHome: '返回首页',
    onThisPage: '本页目录',
  },
}

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
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: 'en-US' | 'zh-CN'
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { locale = 'en-US', ...renderOptions } = options ?? {}

  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders locale={locale}>{children}</AllTheProviders>,
    ...renderOptions,
  })
}

export * from '@testing-library/react'
export { customRender as render }
