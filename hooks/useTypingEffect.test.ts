import useTypingEffect from './useTypingEffect'
import { renderHook } from '@/utils'

describe('useTypingEffect', () => {
  const mockRef = { current: null }
  const mockOptions = {
    titles: ['Hello', 'World'],
    speed: 60,
    delay: 600,
    loop: true,
  }

  it('should process null ref correctly', () => {
    const { result } = renderHook(() => useTypingEffect(mockRef, mockOptions))

    expect(result.current).toBeFalsy()
  })
})
