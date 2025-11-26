import { vi } from 'vitest'

export const mockPush = vi.fn()
export const mockReplace = vi.fn()
export const mockBack = vi.fn()
export const mockForward = vi.fn()
export const mockRefresh = vi.fn()
export const mockPrefetch = vi.fn()

export const useNavigationRouter = vi.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
  prefetch: mockPrefetch,
}))

export const usePathname = vi.fn(() => '/en-US')
export const useParams = vi.fn(() => ({ locale: 'en-US' }))
export const getPathname = vi.fn((_params: unknown) => '/en-US')
export const redirect = vi.fn()

export function Link({
  ref,
  children,
  href,
  locale,
  onClick,
  ...props
}: {
  ref?: React.RefObject<HTMLAnchorElement | null>
  children: React.ReactNode
  href: string
  locale?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}) {
  const hrefString = typeof href === 'string' ? href : ((href as { pathname: string })?.pathname ?? '/')
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault() // Prevent navigation in tests
    onClick?.(e)
  }

  return (
    <a ref={ref} href={hrefString} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
Link.displayName = 'Link'

vi.mock('@/i18n/navigation', () => ({
  useNavigationRouter,
  usePathname,
  useParams,
  getPathname,
  redirect,
  Link,
}))
