import { render } from '@/utils'
import MDXCode from './MDXCode'
import MDXDivider from './MDXDivider'
import MDXInput from './MDXInput'
import MDXPre from './MDXPre'

describe('MDXDivider', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<MDXDivider />)

    expect(container).toMatchSnapshot()
  })
})

describe('MDXInput', () => {
  it('should render input correctly (snapshot)', () => {
    const { container } = render(<MDXInput />)

    expect(container).toMatchSnapshot()
  })

  it('should render checkbox correctly (snapshot)', () => {
    const { container } = render(<MDXInput type="checkbox" />)

    expect(container).toMatchSnapshot()
  })
})

describe('MDXPre', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<MDXPre />)

    expect(container).toMatchSnapshot()
  })
})

describe('MDXCode', () => {
  it('should render correctly (snapshot)', () => {
    const { container } = render(<MDXCode />)

    expect(container).toMatchSnapshot()
  })
})
