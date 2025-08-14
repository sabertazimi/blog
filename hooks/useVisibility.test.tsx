import { useRef } from 'react'
import { fireEvent, render, waitFor } from '@/utils'
import useVisibility from './useVisibility'

describe('useVisibility', () => {
  const onBottomPassed = jest.fn()
  const onBottomPassedReverse = jest.fn()

  const Header = (): JSX.Element => {
    const headerRef = useRef<HTMLDivElement>(null)

    useVisibility({
      ref: headerRef,
      onBottomPassed,
      onBottomPassedReverse,
    })

    return <div>Header</div>
  }

  const HeaderWithRef = (): JSX.Element => {
    const headerRef = useRef<HTMLDivElement>(null)

    useVisibility({
      ref: headerRef,
      onBottomPassed,
      onBottomPassedReverse,
    })

    return (
      <div>
        <div ref={headerRef}>Header</div>
        <div>Main</div>
        <div>Footer</div>
      </div>
    )
  }

  it('should early return when missing ref', async () => {
    render(<Header />)

    fireEvent.scroll(window, { target: { scrollY: 100 } })

    await waitFor(() => expect(onBottomPassed).not.toHaveBeenCalled())
    await waitFor(() => expect(onBottomPassedReverse).not.toHaveBeenCalled())
  })

  it('should invoke callbacks when scrolling', () => {
    render(<HeaderWithRef />)

    fireEvent.scroll(window, { target: { scrollY: 100 } })

    // eslint-disable-next-line testing-library/await-async-utils -- no need to await.
    void waitFor(() => expect(onBottomPassed).toHaveBeenCalled())
    // eslint-disable-next-line testing-library/await-async-utils -- no need to await.
    void waitFor(() => expect(onBottomPassedReverse).toHaveBeenCalled())
  })
})
