const socialQuery = {
  github: '',
  twitter: 'https://twitter.com/intent/tweet?url=',
  facebook: 'https://www.facebook.com/sharer.php?u=',
  linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  weibo: 'https://service.weibo.com/share/share.php?url=',
}

const socialList = {
  github: 'github',
  twitter: 'twitter',
  facebook: 'facebook',
  linkedin: 'linkedin',
  weibo: 'weibo',
}

type SocialType = keyof typeof socialList

export { socialList, socialQuery }
export type { SocialType }
