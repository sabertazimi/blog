import { renderHook } from '@/utils'
import useTypingEffect from './useTypingEffect'

describe('useTypingEffect', () => {
  const mockRef = { current: null }
  const mockOptions = {
    titles: ['Hello', 'World'],
    speed: 60,
    delay: 600,
    loop: true,
  }

  it('should process null ref correctly', () => {
    // @ts-expect-error - mockRef is set to null for testing purpose
    const { result } = renderHook(() => useTypingEffect(mockRef, mockOptions))

    expect(result.current).toBeFalsy()
  })
})
