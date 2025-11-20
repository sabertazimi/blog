const socialQuery = {
  github: '',
  x: 'https://x.com/intent/tweet?url=',
  facebook: 'https://www.facebook.com/sharer.php?u=',
  weibo: 'https://service.weibo.com/share/share.php?url=',
}

const socialList = {
  github: 'github',
  x: 'x',
  facebook: 'facebook',
  weibo: 'weibo',
}

type SocialSite = keyof typeof socialList

export { socialList, socialQuery }
export type { SocialSite }
