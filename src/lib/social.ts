import { SiFacebook, SiSinaweibo, SiX } from '@icons-pack/react-simple-icons'

const socialList = {
  github: 'github',
  x: 'x',
  facebook: 'facebook',
  weibo: 'weibo',
}

type SocialSite = keyof typeof socialList

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
    getShareUrl: ({ url }: ShareUrlParams) =>
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Weibo',
    icon: SiSinaweibo,
    getShareUrl: ({ url, title }: ShareUrlParams) =>
      `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title ?? '')}`,
  },
]

export { shareLinks, socialList }
export type { ShareUrlParams, SocialSite }
