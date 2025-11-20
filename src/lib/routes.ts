interface Route {
  id: string
  name: string
  title: string
  description: string
  path: string
}

const routes: Route[] = [
  {
    id: 'posts',
    name: 'Posts',
    title: 'Sabertaz Blog',
    description: 'Sharing technical articles and thoughts.',
    path: '/posts',
  },
  {
    id: 'about',
    name: 'About',
    title: 'About Me',
    description: 'Sharing technical articles and thoughts.',
    path: '/about',
  },
]

const ROUTES_INDEX = {
  posts: 0,
  about: 1,
}

export { routes, ROUTES_INDEX }
export type { Route }
