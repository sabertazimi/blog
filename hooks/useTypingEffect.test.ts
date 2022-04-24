import { renderHook } from '@testing-library/react-hooks';
import useTypingEffect from './useTypingEffect';

describe('useTypingEffect', () => {
  const mockRef = { current: null };
  const mockOptions = {
    titles: ['Hello', 'World'],
    speed: 60,
    delay: 600,
    loop: true,
  };

  test('should process null ref correctly', () => {
    const { result } = renderHook(() => useTypingEffect(mockRef, mockOptions));

    expect(result.error).toBeFalsy();
  });
});
