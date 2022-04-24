enum SocialList {
  github = 'github',
  twitter = 'twitter',
  facebook = 'facebook',
  linkedin = 'linkedin',
  weibo = 'weibo',
}

type SocialType = keyof typeof SocialList;

enum SocialQuery {
  github = '',
  twitter = 'https://twitter.com/intent/tweet?url=',
  facebook = 'https://www.facebook.com/sharer.php?u=',
  linkedin = 'https://www.linkedin.com/shareArticle?mini=true&url=',
  weibo = 'https://service.weibo.com/share/share.php?url=',
}

export type { SocialType };
export { SocialList, SocialQuery };
