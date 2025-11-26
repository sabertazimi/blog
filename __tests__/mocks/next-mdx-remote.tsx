import { vi } from 'vitest'

export const MDXRemote = vi.fn(({ compiledSource }: { compiledSource: string }) => (
  <div data-testid="mdx-remote-mock">{compiledSource}</div>
))

vi.mock('next-mdx-remote', () => ({
  MDXRemote,
}))
