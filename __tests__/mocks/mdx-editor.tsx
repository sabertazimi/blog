import { vi } from 'vitest'

const MDXEditor = vi.fn(({ code, language }: { code?: string, language?: string }) => (
  <div data-testid="mdx-editor-mock">
    {language !== undefined && (
      <span>
        Language:
        {language}
      </span>
    )}
    {code !== undefined && (
      <span>
        Code:
        {code}
      </span>
    )}
  </div>
))

vi.mock('@/components/mdx-editor', () => ({
  default: MDXEditor,
}))

export default MDXEditor
