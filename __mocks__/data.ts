const time = new Date(2022, 0, 1, 8, 0, 0).toLocaleString('zh-CN', {
  hour12: false,
});

const baseProfile = {
  username: 'sabertazimi',
  avatar: 'https://avatars.githubusercontent.com/u/12670482?v=4',
  url: 'https://github.com/sabertazimi',
  followers: 42,
  followersUrl: 'https://github.com/sabertazimi/followers',
  following: 185,
  followingUrl: 'https://github.com/sabertazimi/following',
  createDate: 'Sat May 30 2015',
};

const profile = {
  ...baseProfile,
  bio: 'CS',
  location: 'Wuhan',
};

const repos = [
  {
    name: 'awesome-notes',
    stars: 23,
    language: 'TypeScript',
    repoUrl: 'https://github.com/sabertazimi/awesome-notes',
  },
  {
    name: 'hust-lab',
    stars: 22,
    language: 'C',
    repoUrl: 'https://github.com/sabertazimi/hust-lab',
  },
  {
    name: 'dragon-zsh-theme',
    stars: 11,
    language: 'Zsh',
    repoUrl: 'https://github.com/sabertazimi/dragon-zsh-theme',
  },
];

const basePosts = Array.from(Array(5).keys()).map(index => ({
  index,
  slug: `${index + 1}BasicNotes`,
  title: `${index + 1} Basic Notes`,
  readingTime: index + 1,
  prevPost: null,
  nextPost: null,
  source: {
    compiledSource: `
      /*@jsxRuntime automatic @jsxImportSource react*/
      const {jsx: _jsx} = arguments[0];
      const {useMDXComponents: _provideComponents} = arguments[0];
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, {})
        })) : _createMdxContent();
        function _createMdxContent() {
          const _components = Object.assign({
            h2: "h2"
          }, _provideComponents(), props.components);
          return _jsx(_components.h2, {
            children: "${index + 1} Basic Notes"
          });
        }
      }
      return {
        default: MDXContent
      };`,
  },
}));

const posts = basePosts.map((post, index) => ({
  ...post,
  subtitle: 'Be a Stupid Learner',
  author: 'Sabertaz',
  createTime: '2018-08-08T00:00:00.000Z',
  updateTime: '2018-08-08T00:00:00.000Z',
  tags: ['JavaScript', 'Frontend Development', 'Web Development'],
  prevPost: {
    slug: `${index + 2}BasicNotes`,
    title: `${index + 2} Basic Notes`,
  },
  nextPost: {
    slug: `${index}BasicNotes`,
    title: `${index} Basic Notes`,
  },
  excerpt: `${index + 1} Basic Notes Basic Concepts`,
  toc: `${index + 1} Table of Contents`,
}));

const mockData = {
  time,
  baseProfile,
  profile,
  repos,
  basePosts,
  posts,
};

export default mockData;
