import { colors } from './colors';
import type { SocialType } from './social';

interface Book {
  title: string;
  author: string;
  url: string;
  description: string;
}

interface SiteConfig {
  title: string;
  author: string;
  email: string;
  description: string;
  themeColor: string;
  siteUrl: string;
  disqusUrl: string;
  landingTitles: string[];
  socials: {
    [key in SocialType]: string;
  };
  books: Book[];
}

const siteConfig: SiteConfig = {
  title: 'Sabertaz Blog',
  author: 'Sabertaz',
  email: 'sabertazimi@gmail.com',
  description: 'Sabertaz Blog',
  themeColor: colors.blue,
  siteUrl: 'https://blog.tazimi.dev',
  disqusUrl: 'https://sabertaz-blog.disqus.com',
  landingTitles: [`I'm a coder.`, `I'm a learner.`],
  socials: {
    github: 'sabertazimi',
    twitter: 'sabertazimi',
    facebook: 'sabertazimi',
    linkedin: 'sabertazimi',
    weibo: 'sabertazimi',
  },
  books: [
    {
      title: 'awesome-notes',
      author: 'sabertazimi',
      url: 'https://sabertazimi.github.io/awesome-notes',
      description: 'Daily I Learned Notes',
    },
  ],
};

export type { Book, SiteConfig };
export { siteConfig };
