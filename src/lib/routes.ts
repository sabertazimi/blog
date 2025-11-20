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
    id: 'about',
    name: 'About',
    title: 'About Me',
    path: '/about',
  },
]

export { routes }
export type { Route }
