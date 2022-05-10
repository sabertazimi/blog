import { mockNavigatorClipboard } from '@mocks/utils';
import { act, renderHook, waitFor } from '@testing-library/react';
import useCopyToClipboard from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  test('should early return when clipboard missed', async () => {
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    const copyFnResult = await copy();

    expect(copyFnResult).toBe(false);
    expect(result).toBe(false);
  });

  test('should return false when copy failed', async () => {
    const { writeTextMock } = mockNavigatorClipboard();
    writeTextMock.mockImplementation(() => Promise.reject('Error'));
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    const copyFnResult = await copy();

    expect(copyFnResult).toBe(false);
    expect(result).toBe(false);
  });

  test('should return true when copy success', async () => {
    const { writeTextMock } = mockNavigatorClipboard();
    writeTextMock.mockImplementation(() => Promise.resolve('Success'));
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    await act(async () => {
      const copyFnResult = await copy();
      expect(copyFnResult).toBe(true);
    });

    await waitFor(() => expect(result).toBe(false));
  });
});
