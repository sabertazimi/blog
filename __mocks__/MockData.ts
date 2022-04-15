const time = new Date(2022, 0, 1, 8, 0, 0).toLocaleString('zh-CN', {
  hour12: false,
});

const siteMetadata = {
  title: 'Title',
  author: 'Sabertaz',
  siteUrl: 'https://example.com',
  email: 'example@github.com',
  disqusUrl: 'https://example.com',
  landingTitles: ['A', 'B', 'C'],
  socialList: {
    github: 'sabertazimi',
    twitter: 'sabertazimi',
    facebook: 'sabertazimi',
    linkedin: 'sabertazimi',
    weibo: 'sabertazimi',
  },
  bookList: Array.from(Array(3).keys()).map(() => ({
    title: 'Title',
    author: 'Sabertaz',
    url: 'https://example.com',
    description: 'Description',
  })),
};

const basePosts = Array.from(Array(5).keys()).map(index => ({
  index,
  fields: { slug: `/${index + 1}BasicNotes/` },
  frontmatter: { title: `${index + 1} Basic Notes` },
  timeToRead: index + 1,
}));

const posts = basePosts.map((post, index) => ({
  ...post,
  fields: { slug: `/${index + 1}BasicNotes/`, gitTime: `${index + 1} time` },
  frontmatter: {
    title: `${index + 1} Basic Notes`,
    subtitle: 'Be a Stupid Learner',
    author: 'Sabertaz',
    date: '2018-08-08T00:00:00.000Z',
    tags: ['JavaScript', 'Frontend Development', 'Web Development'],
  },
  timeToRead: index + 1,
}));

const MockData = {
  time,
  siteMetadata,
  basePosts,
  posts,
};

export default MockData;
