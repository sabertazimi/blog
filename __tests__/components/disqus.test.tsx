import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Disqus from '@/components/disqus'
import { render, waitFor } from '@/tests/test-utils'

describe('Disqus', () => {
  const defaultProps = {
    shortname: 'test-shortname',
    config: {
      identifier: 'test-post',
      url: 'https://example.com/post/test',
    },
  }

  beforeEach(() => {
    // Clear any existing Disqus state
    delete window.DISQUS
    delete window.disqus_config
    delete window.disqus_shortname

    // Clean up any existing Disqus scripts and elements
    document.querySelectorAll('#dsq-embed-scr').forEach(el => el.remove())
    document.querySelectorAll('[id*="disqus"]').forEach(el => el.remove())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

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

  it('should insert embed script with correct src', async () => {
    render(<Disqus {...defaultProps} />)

    let embedScript: HTMLScriptElement | null = null

    await waitFor(() => {
      embedScript = document.getElementById('dsq-embed-scr') as HTMLScriptElement | null
      expect(embedScript).toBeInTheDocument()
    })

    expect(embedScript).toHaveAttribute('src', 'https://test-shortname.disqus.com/embed.js')
  })

  it('should set window.disqus_config and window.disqus_shortname', async () => {
    render(<Disqus {...defaultProps} />)

    await waitFor(() => {
      expect(window.disqus_config).toBeDefined()
      expect(window.disqus_shortname).toBe('test-shortname')
    })
  })

  it('should configure disqus with all config options', async () => {
    const fullConfig = {
      identifier: 'test-post',
      url: 'https://example.com/post/test',
      title: 'Test Post',
      language: 'zh-CN',
      categoryID: 'test-category',
      remoteAuthS3: 'test-auth',
      apiKey: 'test-api-key',
      sso: {
        name: 'Test SSO',
        button: 'https://example.com/button.png',
        icon: 'https://example.com/icon.png',
        url: 'https://example.com/sso',
        logout: 'https://example.com/logout',
        profile_url: 'https://example.com/profile',
        width: '800',
        height: '600',
      },
      preData: vi.fn(),
      preInit: vi.fn(),
      onInit: vi.fn(),
      onReady: vi.fn(),
      afterRender: vi.fn(),
      preReset: vi.fn(),
      onIdentify: vi.fn(),
      beforeComment: vi.fn(),
      onNewComment: vi.fn(),
      onPaginate: vi.fn(),
    }

    render(<Disqus shortname="test-shortname" config={fullConfig} />)

    await waitFor(() => {
      expect(window.disqus_config).toBeDefined()
    })

    // Verify config by calling it
    if (window.disqus_config) {
      const mockContext = {
        page: {
          identifier: undefined as string | undefined,
          url: undefined as string | undefined,
          title: undefined as string | undefined,
          category_id: undefined as string | undefined,
          remote_auth_s3: undefined as string | undefined,
          api_key: undefined as string | undefined,
        },
        sso: undefined as Record<string, string> | undefined,
        language: undefined as string | undefined,
        callbacks: {
          preData: [] as Array<(() => void) | undefined>,
          preInit: [] as Array<(() => void) | undefined>,
          onInit: [] as Array<(() => void) | undefined>,
          onReady: [] as Array<(() => void) | undefined>,
          afterRender: [] as Array<(() => void) | undefined>,
          preReset: [] as Array<(() => void) | undefined>,
          onIdentify: [] as Array<(() => void) | undefined>,
          beforeComment: [] as Array<(() => void) | undefined>,
          onNewComment: [] as Array<(() => void) | undefined>,
          onPaginate: [] as Array<(() => void) | undefined>,
        },
      }
      window.disqus_config.call(mockContext)

      expect(mockContext.page.identifier).toBe('test-post')
      expect(mockContext.page.url).toBe('https://example.com/post/test')
      expect(mockContext.page.title).toBe('Test Post')
      expect(mockContext.page.category_id).toBe('test-category')
      expect(mockContext.page.remote_auth_s3).toBe('test-auth')
      expect(mockContext.page.api_key).toBe('test-api-key')
      expect(mockContext.sso).toEqual(fullConfig.sso)
      expect(mockContext.language).toBe('zh-CN')
      expect(mockContext.callbacks.preData).toEqual([fullConfig.preData])
      expect(mockContext.callbacks.onInit).toEqual([fullConfig.onInit])
    }
  })

  it('should reset DISQUS instance when it already exists', async () => {
    // First render to create initial instance
    const { rerender } = render(<Disqus {...defaultProps} />)

    // Mock DISQUS instance
    const mockReset = vi.fn()
    window.DISQUS = { reset: mockReset }

    // Mock embed script
    const mockScript = document.createElement('script')
    mockScript.id = 'dsq-embed-scr'
    document.body.appendChild(mockScript)

    // Rerender with new config to trigger reset
    const newConfig = {
      identifier: 'new-post',
      url: 'https://example.com/post/new',
    }

    rerender(<Disqus shortname="test-shortname" config={newConfig} />)

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        reload: true,
        config: expect.any(Function) as () => void,
      })
    })
  })

  it('should clean instance when shortname changes', async () => {
    const { rerender } = render(<Disqus {...defaultProps} />)

    // Set up initial Disqus state
    window.disqus_shortname = 'test-shortname'
    const mockReset = vi.fn()
    window.DISQUS = { reset: mockReset }

    // Create mock script
    const mockScript = document.createElement('script')
    mockScript.id = 'dsq-embed-scr'
    document.body.appendChild(mockScript)

    // Create mock disqus thread with children
    const disqusThread = document.getElementById('disqus_thread')
    if (disqusThread) {
      const child1 = document.createElement('div')
      const child2 = document.createElement('div')
      disqusThread.appendChild(child1)
      disqusThread.appendChild(child2)
    }

    // Change shortname to trigger cleanup
    rerender(<Disqus shortname="new-shortname" config={defaultProps.config} />)

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({})
      expect(window.DISQUS).toBeUndefined()
    })
  })

  it('should clean up on unmount', () => {
    const { unmount } = render(<Disqus {...defaultProps} />)

    // Set up Disqus state
    const mockReset = vi.fn()
    window.DISQUS = { reset: mockReset }
    window.disqus_shortname = 'test-shortname'

    // Create mock script
    const mockScript = document.createElement('script')
    mockScript.id = 'dsq-embed-scr'
    document.body.appendChild(mockScript)

    unmount()

    expect(mockReset).toHaveBeenCalledWith({})
    expect(window.DISQUS).toBeUndefined()
  })

  it('should handle config changes and reload instance', async () => {
    const { rerender } = render(<Disqus {...defaultProps} />)

    // Mock DISQUS instance
    const mockReset = vi.fn()
    window.DISQUS = { reset: mockReset }

    // Mock embed script
    const mockScript = document.createElement('script')
    mockScript.id = 'dsq-embed-scr'
    document.body.appendChild(mockScript)

    // Trigger config change
    const newConfig = {
      identifier: 'updated-post',
      url: 'https://example.com/post/updated',
      title: 'Updated Title',
    }

    rerender(<Disqus shortname="test-shortname" config={newConfig} />)

    await waitFor(() => {
      // Should be called at least once for the config change
      expect(mockReset).toHaveBeenCalled()
    })
  })

  it('should not reload when config remains the same', async () => {
    const { rerender } = render(<Disqus {...defaultProps} />)

    // Mock DISQUS instance
    const mockReset = vi.fn()
    window.DISQUS = { reset: mockReset }

    // Mock embed script
    const mockScript = document.createElement('script')
    mockScript.id = 'dsq-embed-scr'
    document.body.appendChild(mockScript)

    mockReset.mockClear()

    // Rerender with same config
    rerender(<Disqus {...defaultProps} />)

    await waitFor(() => {
      // Should not be called for unchanged config
      expect(mockReset).not.toHaveBeenCalled()
    })
  })

  it('should handle empty language string', async () => {
    const configWithEmptyLanguage = {
      ...defaultProps.config,
      language: '',
    }

    render(<Disqus shortname="test-shortname" config={configWithEmptyLanguage} />)

    await waitFor(() => {
      expect(window.disqus_config).toBeDefined()
      if (window.disqus_config) {
        const mockContext = {
          page: {},
          language: undefined,
          callbacks: {
            preData: [],
            preInit: [],
            onInit: [],
            onReady: [],
            afterRender: [],
            preReset: [],
            onIdentify: [],
            beforeComment: [],
            onNewComment: [],
            onPaginate: [],
          },
        }
        window.disqus_config.call(mockContext)
        // Language should remain undefined for empty string
        expect(mockContext.language).toBeUndefined()
      }
    })
  })

  it('should handle delete DISQUS failure gracefully', () => {
    // Save the original property descriptor for cleanup
    const originalDescriptor = Object.getOwnPropertyDescriptor(window, 'DISQUS')

    try {
      const { unmount } = render(<Disqus {...defaultProps} />)

      // Create a non-configurable DISQUS property that cannot be deleted
      Object.defineProperty(window, 'DISQUS', {
        value: { reset: vi.fn() },
        configurable: false,
        writable: true,
      })

      // Mock script
      const mockScript = document.createElement('script')
      mockScript.id = 'dsq-embed-scr'
      document.body.appendChild(mockScript)

      // Unmount should attempt to delete DISQUS, fail, and set it to undefined
      unmount()

      // Since delete fails, it should fallback to setting undefined
      expect(window.DISQUS).toBeUndefined()
    } finally {
      // Restore or clean up the DISQUS property
      if (originalDescriptor) {
        try {
          Object.defineProperty(window, 'DISQUS', originalDescriptor)
        } catch {
          // If the original was not configurable, just set to undefined
          (window as { DISQUS?: unknown }).DISQUS = undefined
        }
      } else {
        try {
          delete (window as { DISQUS?: unknown }).DISQUS
        } catch {
          (window as { DISQUS?: unknown }).DISQUS = undefined
        }
      }
    }
  })
})
