import { routing } from '@/i18n/routing'
import { getPostsMeta } from '@/lib/get-posts-data'
import { siteConfig } from '@/lib/site'

async function generateLlmsTxt(): Promise<string> {
  const lines: string[] = []

  lines.push(`# ${siteConfig.author}'s Blog`)
  lines.push(`> A modern blog about web development, programming, and technology.`)
  lines.push('')
  lines.push(`## Main Navigation`)
  lines.push(`- [Home](${siteConfig.url}): Landing page with featured content`)
  lines.push(`- [All Posts](${siteConfig.url}/en-US/posts): Browse all blog posts`)
  lines.push(`- [About](${siteConfig.url}/en-US/about): Learn more about the author`)
  lines.push('')

  for (const locale of routing.locales) {
    const { posts, tags } = await getPostsMeta(locale)
    const localeName = locale === 'en-US' ? 'English' : '中文'

    lines.push(`## Posts (${localeName})`)
    posts.slice(0, 20).forEach((post) => {
      const postUrl = `${siteConfig.url}/${locale}/post/${post.slug}`
      const description = post.description?.trim() !== undefined && post.description.trim() !== '' ? `: ${post.description}` : ''
      lines.push(`- [${post.title}](${postUrl})${description}`)
    })
    lines.push('')

    lines.push(`## Tags (${localeName})`)
    tags.allTags
      .filter(tag => tag !== 'All')
      .slice(0, 15)
      .forEach((tag) => {
        const tagUrl = `${siteConfig.url}/${locale}/tag/${encodeURIComponent(tag)}`
        const count = tags.tagCounts[tag]
        lines.push(`- [${tag}](${tagUrl}): ${count} posts`)
      })
    lines.push('')
  }

  lines.push(`## Contact`)
  lines.push(`- Email: ${siteConfig.email}`)
  lines.push(`- GitHub: https://github.com/${siteConfig.socials.github}`)
  lines.push(`- X: https://x.com/${siteConfig.socials.x}`)
  lines.push('')
  lines.push(`# End of llms.txt`)

  return lines.join('\n')
}

export async function GET() {
  const content = await generateLlmsTxt()

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
