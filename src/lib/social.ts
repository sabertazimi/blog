import {
  SiFacebook,
  SiFacebookHex,
  SiGithub,
  SiGithubHex,
  SiRss,
  SiRssHex,
  SiSinaweibo,
  SiSinaweiboHex,
  SiX,
  SiXHex,
} from '@icons-pack/react-simple-icons'
import { siteConfig } from '@/lib/site'

type SocialSite = 'github' | 'x' | 'facebook' | 'weibo' | 'rss'
interface SocialLink {
  name: string
  username: string
  url: string
  color: string
  icon: React.ComponentType<{ className?: string }>
}

const socialLinks: Record<SocialSite, SocialLink> = {
  github: {
    name: 'GitHub',
    username: siteConfig.socials.github,
    url: `https://github.com/${siteConfig.socials.github}`,
    color: SiGithubHex,
    icon: SiGithub,
  },
  x: {
    name: 'X',
    username: siteConfig.socials.x,
    url: `https://x.com/${siteConfig.socials.x}`,
    color: SiXHex,
    icon: SiX,
  },
  facebook: {
    name: 'Facebook',
    username: siteConfig.socials.facebook,
    url: `https://facebook.com/${siteConfig.socials.facebook}`,
    color: SiFacebookHex,
    icon: SiFacebook,
  },
  weibo: {
    name: 'Weibo',
    username: siteConfig.socials.weibo,
    url: `https://weibo.com/${siteConfig.socials.weibo}`,
    color: SiSinaweiboHex,
    icon: SiSinaweibo,
  },
  rss: {
    name: 'RSS Feed',
    username: siteConfig.socials.rss,
    url: '/{locale}/feed.xml',
    color: SiRssHex,
    icon: SiRss,
  },
}

interface ShareUrlParams {
  url: string
  title?: string
}

const shareLinks = [
  {
    name: 'X',
    icon: SiX,
    getShareUrl: ({ url, title }: ShareUrlParams) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title ?? '')}`,
  },
  {
    name: 'Facebook',
    icon: SiFacebook,
    getShareUrl: ({ url }: ShareUrlParams) => `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Weibo',
    icon: SiSinaweibo,
    getShareUrl: ({ url, title }: ShareUrlParams) =>
      `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title ?? '')}`,
  },
]

export { shareLinks, socialLinks }
export type { ShareUrlParams, SocialLink, SocialSite }
