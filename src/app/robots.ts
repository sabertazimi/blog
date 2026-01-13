import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const llmAgents = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Googlebot']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt'],
        disallow: '/private/',
      },
      ...llmAgents.map(agent => ({
        userAgent: agent,
        allow: ['/', '/llms.txt'],
      })),
    ],
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
