import type { useTranslations } from 'next-intl'
import { InfoIcon, StickerIcon } from 'lucide-react'

export interface Route {
  id: string
  name: string
  title: string
  description: string
  path: string
}

export function getRouteIcons(): Record<string, React.ComponentType<{ className?: string }>> {
  return {
    posts: StickerIcon,
    about: InfoIcon,
  }
}

export function getRoutes(t: ReturnType<typeof useTranslations>): Route[] {
  return [
    {
      id: 'posts',
      name: t('posts.name'),
      title: t('posts.title'),
      description: t('posts.description'),
      path: '/posts',
    },
    {
      id: 'about',
      name: t('about.name'),
      title: t('about.title'),
      description: t('about.description'),
      path: '/about',
    },
  ]
}
