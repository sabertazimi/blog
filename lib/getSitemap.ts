import { siteConfig } from '@/config'
import type { PostMeta } from '@/types'

export default function getSitemap(posts: PostMeta[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
    ${posts
      .map(
        post => `
      <url>
        <loc>${`${siteConfig.siteUrl}/post/${post.slug}`}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
        <lastmod>${new Date(
          post.createTime ?? Date.now(),
        ).toISOString()}</lastmod>
      </url>`,
      )
      .join('')}
    </urlset>
    `
}
