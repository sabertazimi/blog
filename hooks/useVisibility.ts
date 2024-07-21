/**
 * `useVisibility` provides a set of callbacks for when a content appears in the viewport,
 * forked from `<Visibility />` React Semantic UI component,
 * https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/behaviors/Visibility/Visibility.js
 */
import type { RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'

export default function useVisibility({
  ref,
  onBottomPassed,
  onBottomPassedReverse,
}: {
  ref: RefObject<HTMLElement>
  onBottomPassed?: () => void
  onBottomPassedReverse?: () => void
}): void {
  const frameId = useRef(0)
  const isUpdating = useRef(false)
  const pageYOffset = useRef(0)
  const bottomPassed = useRef(false)

  const getPageYOffset = useCallback(() => window.pageYOffset, [])

  const update = useCallback(() => {
    isUpdating.current = false

    // Store visibility.
    const oldBottomPassed = bottomPassed.current

    // Early return when ref missing (e.g unmounting when routing or animation).
    if (!ref.current)
      return

    // Calculate visibility.
    const { bottom } = ref.current.getBoundingClientRect()
    const newOffset = getPageYOffset()
    const direction = newOffset > pageYOffset.current ? 'down' : 'up'
    const newBottomPassed = bottom < 0

    // Update visibility.
    bottomPassed.current = newBottomPassed
    pageYOffset.current = newOffset

    // Fire callbacks according to visibility.
    if (bottomPassed.current !== oldBottomPassed) {
      if (direction === 'up' && onBottomPassedReverse)
        onBottomPassedReverse()
      else if (direction === 'down' && onBottomPassed)
        onBottomPassed()
    }
  }, [ref, onBottomPassed, onBottomPassedReverse, getPageYOffset])

  const handleUpdate = useCallback(() => {
    if (!isUpdating.current) {
      isUpdating.current = true
      frameId.current = requestAnimationFrame(update)
    }
  }, [update])

  useEffect(() => {
    window.addEventListener('resize', handleUpdate)
    window.addEventListener('scroll', handleUpdate)

    return () => {
      window.removeEventListener('resize', handleUpdate)
      window.removeEventListener('scroll', handleUpdate)

      if (frameId.current)
        cancelAnimationFrame(frameId.current)
    }
  }, [handleUpdate])
}
