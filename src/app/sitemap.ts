import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getPostsMeta } from '@/lib/get-posts-data'
import { siteConfig } from '@/lib/site'
import { getTagUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const routes = [
    {
      id: 'posts',
      path: '/posts',
    },
    {
      id: 'about',
      path: '/about',
    },
  ]

  for (const locale of routing.locales) {
    const {
      posts,
      tags: { allTags },
    } = await getPostsMeta(locale)

    // Static pages
    sitemapEntries.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })

    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${siteConfig.url}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Post pages
    posts.forEach((post) => {
      const timeValue = post.updateTime ?? post.createTime
      const lastModified = timeValue !== undefined && timeValue !== '' ? new Date(timeValue) : new Date()

      sitemapEntries.push({
        url: `${siteConfig.url}/${locale}/post/${post.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    // Tag pages
    allTags
      .filter(tag => tag !== 'All')
      .forEach((tag) => {
        sitemapEntries.push({
          url: `${siteConfig.url}/${locale}${getTagUrl(tag)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
  }

  // llms.txt
  sitemapEntries.push({
    url: `${siteConfig.url}/llms.txt`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  })

  return sitemapEntries
}
