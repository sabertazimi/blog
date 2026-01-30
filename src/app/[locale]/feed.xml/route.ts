import type { Locale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { resolveLocale } from '@/i18n/utils'
import { getPostsMeta } from '@/lib/get-posts-data'
import { siteConfig } from '@/lib/site'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function generateRssFeed(locale: Locale): Promise<string> {
  const { posts } = await getPostsMeta(locale)
  const siteUrl = siteConfig.url
  const feedUrl = `${siteUrl}/${locale}/feed.xml`

  const items = posts.slice(0, 20).map((post) => {
    const postUrl = `${siteUrl}/${locale}/post/${post.slug}`
    const pubDate = new Date(post.createTime ?? post.updateTime ?? Date.now()).toUTCString()
    const description = post.description ?? post.title

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`
  })

  const localeTitle = locale === 'zh-CN' ? 'Sabertaz 博客' : 'Sabertaz Blog'
  const localeDescription = locale === 'zh-CN'
    ? '一个关于 Web 开发、编程和技术的现代博客'
    : 'A modern blog about web development, programming, and technology'

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(localeTitle)}</title>
    <link>${siteUrl}/${locale}</link>
    <description>${escapeXml(localeDescription)}</description>
    <language>${locale.toLowerCase()}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>`
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

interface RouteParams {
  params: Promise<{ locale: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const content = await generateRssFeed(resolvedLocale)

  return new Response(content, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
