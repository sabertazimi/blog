import mockData from '@mocks/data'
import { render } from '@utils'
import Article from './Article'

describe('Article', () => {
  const mockPost = mockData.posts[0]
  const mockBasePost = mockData.basePosts[0]

  it('should render ArticleHeader component', () => {
    const { getByTestId } = render(<Article post={mockPost} />)
    const articleHeader = getByTestId('article-header')

    expect(articleHeader).toBeInTheDocument()
  })

  it('should render ArticleToc component', () => {
    const { getByTestId, getByTitle } = render(<Article post={mockPost} />)
    const articleToc = getByTestId('article-toc')
    const articleTocLink = getByTitle(mockPost.title)

    expect(articleToc).toBeInTheDocument()
    expect(articleTocLink).toBeInTheDocument()
    expect(articleTocLink.tagName).toBe('A')
  })

  it('should render ArticleContent component', () => {
    const { getByTestId } = render(<Article post={mockPost} />)
    const articleContent = getByTestId('article-content')

    expect(articleContent).toBeInTheDocument()
  })

  it('should render ArticleNav component', () => {
    const { getByLabelText } = render(<Article post={mockPost} />)
    const articleNav = getByLabelText('footer-navigation')

    expect(articleNav).toBeInTheDocument()
  })

  it('should render ArticleComments component', () => {
    const { getByTestId } = render(<Article post={mockPost} />)
    const articleComments = getByTestId('article-comments')

    expect(articleComments).toBeInTheDocument()
  })

  it('should render SocialGroup component', () => {
    const { getByTestId } = render(<Article post={mockPost} />)
    const socialGroup = getByTestId('social-group')

    expect(socialGroup).toBeInTheDocument()
  })

  it('should render divider with default subtile "Blog"', () => {
    const { getByText } = render(<Article post={mockBasePost} />)
    const divider = getByText('Blog')

    expect(divider).toBeInTheDocument()
  })
})
