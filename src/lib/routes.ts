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
    description: 'Learn more about me and my work.',
    path: '/about',
  },
]

const ROUTES_INDEX = Object.fromEntries(routes.map((route, index) => [route.id, index]))

export { routes, ROUTES_INDEX }
export type { Route }
