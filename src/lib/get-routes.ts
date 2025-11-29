import type { useTranslations } from 'next-intl'
import { InfoIcon, StickerIcon } from 'lucide-react'

export interface Route {
  id: string
  name: string
  title: string
  description: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

export function getRoutes(t: ReturnType<typeof useTranslations>): Route[] {
  return [
    {
      id: 'posts',
      name: t('posts.name'),
      title: t('posts.title'),
      description: t('posts.description'),
      path: '/posts',
      icon: StickerIcon,
    },
    {
      id: 'about',
      name: t('about.name'),
      title: t('about.title'),
      description: t('about.description'),
      path: '/about',
      icon: InfoIcon,
    },
  ]
}
