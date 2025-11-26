import { vi } from 'vitest'

export const mockNextPush = vi.fn()
export const mockNextReplace = vi.fn()
export const mockNextBack = vi.fn()
export const mockNextForward = vi.fn()
export const mockNextRefresh = vi.fn()
export const mockNextPrefetch = vi.fn()

export const useNextRouter = vi.fn(() => ({
  push: mockNextPush,
  replace: mockNextReplace,
  back: mockNextBack,
  forward: mockNextForward,
  refresh: mockNextRefresh,
  prefetch: mockNextPrefetch,
}))

export const useNextPathname = vi.fn(() => '/en-US')
export const useNextParams = vi.fn(() => ({ locale: 'en-US' }))
export const useNextSearchParams = vi.fn(() => new URLSearchParams())

vi.mock('next/navigation', () => ({
  useRouter: useNextRouter,
  usePathname: useNextPathname,
  useParams: useNextParams,
  useSearchParams: useNextSearchParams,
  notFound: vi.fn(),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
}))
