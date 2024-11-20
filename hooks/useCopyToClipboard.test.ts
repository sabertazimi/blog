import { mockNavigatorClipboard } from '@/mocks/utils'
import { act, renderHook, waitFor } from '@/utils'
import useCopyToClipboard from './useCopyToClipboard'

describe('useCopyToClipboard', () => {
  it('should early return when clipboard missed', async () => {
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'))

    const copyFnResult = await copy()

    expect(copyFnResult).toBe(false)
    expect(result).toBe(false)
  })

  it('should return false when copy failed', async () => {
    const { writeTextMock } = mockNavigatorClipboard()
    writeTextMock.mockImplementation(async () => Promise.reject(new Error('Error')))
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'))

    const copyFnResult = await copy()

    expect(copyFnResult).toBe(false)
    expect(result).toBe(false)
  })

  it('should return true when copy success', async () => {
    const { writeTextMock } = mockNavigatorClipboard()
    writeTextMock.mockImplementation(async () => Promise.resolve('Success'))
    const {
      result: {
        current: [result, copy],
      },
    } = renderHook(() => useCopyToClipboard('Hello'))

    await act(async () => {
      const copyFnResult = await copy()
      expect(copyFnResult).toBe(true)
    })

    await waitFor(() => expect(result).toBe(false))
  })
})
