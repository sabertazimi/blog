import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CommandMenu } from '@/components/command-menu'
import { mockMetadata } from '@/tests/fixtures/test-data'
import { mockPush } from '@/tests/mocks/navigation'
import { render, screen, waitFor } from '@/tests/test-utils'

describe('CommandMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search buttons', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const buttons = screen.getAllByRole('button', { name: /search/i })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should show keyboard shortcuts hint', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const kbd = screen.getByText('⌘')
    expect(kbd).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('should have search label', () => {
    render(<CommandMenu metadata={mockMetadata} />)

    const buttons = screen.getAllByRole('button', { name: /search/i })
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label', 'Search posts and tags')
    })
  })

  it('should open dialog when mobile search button is clicked', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Get mobile search button (icon only, hidden on md+ screens)
    const buttons = screen.getAllByRole('button', { name: /search/i })
    const mobileButton = buttons.find(btn => btn.querySelector('svg'))

    expect(mobileButton).toBeDefined()

    if (mobileButton) {
      await user.click(mobileButton)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    }
  })

  it('should open dialog when desktop search button is clicked', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Get desktop search button (with text)
    const buttons = screen.getAllByRole('button', { name: /search/i })
    const desktopButton = buttons.find(btn => btn.textContent?.includes('Search'))

    expect(desktopButton).toBeDefined()

    if (desktopButton) {
      await user.click(desktopButton)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    }
  })

  it('should toggle dialog with Cmd+K keyboard shortcut', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Trigger Cmd+K (need to use native event for document-level listeners)
    await user.keyboard('{Meta>}k{/Meta}')

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Close by clicking outside or pressing Escape is more reliable
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should toggle dialog with Ctrl+K keyboard shortcut', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Trigger Ctrl+K
    await user.keyboard('{Control>}k{/Control}')

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('should not trigger shortcut when typing in input element', async () => {
    render(<CommandMenu metadata={mockMetadata} />)

    // Create and focus input
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    // Dispatch keydown event from the input
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    })
    input.dispatchEvent(event)

    // Dialog should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Cleanup
    document.body.removeChild(input)
  })

  it('should not trigger shortcut when typing in textarea element', async () => {
    render(<CommandMenu metadata={mockMetadata} />)

    // Create and focus textarea
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()

    // Dispatch keydown event from the textarea
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    })
    textarea.dispatchEvent(event)

    // Dialog should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Cleanup
    document.body.removeChild(textarea)
  })

  it('should not trigger shortcut when typing in contenteditable element', async () => {
    render(<CommandMenu metadata={mockMetadata} />)

    // Create and focus contenteditable div
    const div = document.createElement('div')
    div.contentEditable = 'true'
    document.body.appendChild(div)
    div.focus()

    // Dispatch keydown event from the contenteditable
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    })
    div.dispatchEvent(event)

    // Dialog should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Cleanup
    document.body.removeChild(div)
  })

  it('should not trigger shortcut when typing in select element', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Create a mock select and focus it
    const select = document.createElement('select')
    document.body.appendChild(select)
    select.focus()

    // Trigger Cmd+K on the focused select
    await user.keyboard('{Meta>}k{/Meta}')

    // Dialog should not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Cleanup
    document.body.removeChild(select)
  })

  it('should filter and display posts when searching', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Type in search input
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'Test Post 1')

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    })
  })

  it('should filter and display tags when searching', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Type in search input
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'React')

    await waitFor(() => {
      // Should show both the tag and posts with React tag
      const items = screen.getAllByText('React')
      expect(items.length).toBeGreaterThan(0)
    })
  })

  it('should navigate to post when post item is selected', async () => {
    vi.mocked(mockPush).mockClear()
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Wait for posts to be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    })

    // Click on a post item
    const postItem = screen.getByText('Test Post 1')
    await user.click(postItem)

    // Should call router.push with post URL (router may pass empty options object)
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush.mock.calls[0][0]).toBe('/post/test-post-1')
    })

    // Dialog should close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should navigate to tag when tag item is selected', async () => {
    vi.mocked(mockPush).mockClear()
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Type to filter tags
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'TypeScript')

    await waitFor(() => {
      const tagItems = screen.getAllByText('TypeScript')
      expect(tagItems.length).toBeGreaterThan(0)
    })

    // Click on the tag item (find the one in CommandGroup for tags)
    const tagItems = screen.getAllByText('TypeScript')
    // The tag item should be the one with a count badge
    const tagItem = tagItems.find((item) => {
      const parent = item.closest('[role="option"]')
      return parent?.textContent?.includes('3') // tag count
    })

    expect(tagItem).toBeDefined()

    if (tagItem) {
      await user.click(tagItem)

      // Should call router.push with tag URL (router may pass empty options object)
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(1)
        expect(mockPush.mock.calls[0][0]).toBe('/tag/TypeScript')
      })

      // Dialog should close
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    }
  })

  it('should clear search text when dialog is closed', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Type in search input
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')

    expect(searchInput).toHaveValue('test')

    // Select a post to close dialog
    const postItem = screen.getByText('Test Post 1')
    await user.click(postItem)

    // Dialog should close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    // Reopen dialog
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Search should be cleared
    const newSearchInput = screen.getByPlaceholderText(/search/i)
    expect(newSearchInput).toHaveValue('')
  })

  it('should display no results message when no matches found', async () => {
    const { user } = render(<CommandMenu metadata={mockMetadata} />)

    // Open dialog
    const buttons = screen.getAllByRole('button', { name: /search/i })
    await user.click(buttons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    // Type non-matching search
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'nonexistent-query-xyz')

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument()
    })
  })
})
