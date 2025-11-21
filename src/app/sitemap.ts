import type { MetadataRoute } from 'next'
import { getPostsMeta } from '@/lib/get-posts-data'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsMeta()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes.map(route => ({
      url: `${siteConfig.siteUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const timeValue = post.updateTime ?? post.createTime
    const lastModified = (timeValue !== undefined && timeValue !== '') ? new Date(timeValue) : new Date()

    return {
      url: `${siteConfig.siteUrl}/post/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticPages, ...postPages]
}
