interface Route {
  id: string
  name: string
  title: string
  path: string
}

const routes: Route[] = [
  {
    id: 'posts',
    name: 'Posts',
    title: 'View Posts',
    path: '/posts',
  },
  {
    id: 'tags',
    name: 'Tags',
    title: 'View Tags',
    path: '/tags',
  },
  {
    id: 'books',
    name: 'Books',
    title: 'View Books',
    path: '/books',
  },
  {
    id: 'about',
    name: 'About',
    title: 'About Me',
    path: '/about',
  },
]

export type { Route }
export { routes }
