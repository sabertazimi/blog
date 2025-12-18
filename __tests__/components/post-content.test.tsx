import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { describe, expect, it } from 'vitest'
import { PostContent } from '@/components/post-content'
import { render, screen } from '@/tests/test-utils'

describe('PostContent', () => {
  const createMockSource = (content: string): MDXRemoteSerializeResult => ({
    compiledSource: content,
    scope: {},
    frontmatter: {},
  })

  it('should render MDXRemote with provided source', () => {
    const source = createMockSource('Test content')
    render(<PostContent source={source} />)

    expect(screen.getByTestId('mdx-remote-mock')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should render prose container with correct classes', () => {
    const source = createMockSource('Content')
    render(<PostContent source={source} />)

    const proseContainer = screen.getByTestId('post-content-container')
    expect(proseContainer).toBeInTheDocument()
    expect(proseContainer).toHaveClass('prose', 'dark:prose-invert', 'max-w-none')
  })
})
