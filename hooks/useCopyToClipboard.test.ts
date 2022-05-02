import { mockNavigatorClipboard } from '@mocks/utils';
import { act, renderHook, waitFor } from '@testing-library/react';
import useCopyToClipboard from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  test('should work correctly when clipboard missed', async () => {
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    await copy();

    expect(result).toBe(false);
  });

  test('should work correctly when copy failed', async () => {
    const { writeTextMock } = mockNavigatorClipboard();
    writeTextMock.mockImplementation(() => Promise.reject('Error'));
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    await copy();

    expect(result).toBe(false);
  });

  test('should work correctly when copy failed', async () => {
    const { writeTextMock } = mockNavigatorClipboard();
    writeTextMock.mockImplementation(() => Promise.resolve('Success'));
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'));

    await act(async () => {
      await copy();
    });

    waitFor(() => expect(result).toBe(true));
  });
});
