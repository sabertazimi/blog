import type { MetadataRoute } from 'next'
import { getPostsMeta } from '@/lib/get-posts-data'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/site'
import { getTagUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    posts,
    tags: { allTags },
  } = await getPostsMeta()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes.map(route => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const timeValue = post.updateTime ?? post.createTime
    const lastModified = timeValue !== undefined && timeValue !== '' ? new Date(timeValue) : new Date()

    return {
      url: `${siteConfig.url}/post/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  const tagPages: MetadataRoute.Sitemap = allTags
    .filter(tag => tag !== 'All')
    .map(tag => ({
      url: `${siteConfig.url}${getTagUrl(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...postPages, ...tagPages]
}
