import { describe, expect, it } from 'vitest'
import Disqus from '@/components/disqus'
import { render } from '@/tests/test-utils'

describe('Disqus', () => {
  const defaultProps = {
    shortname: 'test-shortname',
    config: {
      identifier: 'test-post',
      url: 'https://example.com/post/test',
    },
  }

  it('should render disqus thread container', () => {
    render(<Disqus {...defaultProps} />)

    const disqusThread = document.getElementById('disqus_thread')
    expect(disqusThread).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Disqus {...defaultProps} className="custom-class" />)

    const disqusThread = document.getElementById('disqus_thread')
    expect(disqusThread).toHaveClass('custom-class')
  })

  it('should render with different config', () => {
    const customConfig = {
      identifier: 'another-post',
      url: 'https://example.com/post/another',
      title: 'Another Post',
    }

    render(<Disqus shortname="another-shortname" config={customConfig} />)

    const disqusThread = document.getElementById('disqus_thread')
    expect(disqusThread).toBeInTheDocument()
  })
})
