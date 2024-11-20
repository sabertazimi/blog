import mockData from '@/mocks/data'
import { fireEvent, render, screen } from '@/utils'
import PostsSearchBar from './PostsSearchBar'

describe('PostsSearchBar', () => {
  const mockPosts = mockData.posts

  beforeEach(() => {
    // eslint-disable-next-line ts/unbound-method -- jest mock.
    const { getComputedStyle } = window
    window.getComputedStyle = element => getComputedStyle(element)
  })

  it('should render correctly (snapshot)', () => {
    const { container } = render(<PostsSearchBar posts={mockPosts} />)

    expect(container).toMatchSnapshot()
  })

  it.each(mockPosts)(
    'should render [%# Basic Notes] options when searching',
    async ({ index, title }) => {
      render(<PostsSearchBar posts={mockPosts} />)
      const input = screen.getByRole('combobox')

      fireEvent.change(input, { target: { value: `${index + 1}` } })

      expect(await screen.findAllByText(title)).toHaveLength(2)

      fireEvent.change(input, { target: { value: '' } })

      expect(await screen.findAllByText(title)).toHaveLength(2)
    },
  )
})
