import { useCallback, useEffect, useRef, useState } from 'react'

type CopiedResult = boolean
type CopyFunction = () => Promise<boolean>

function useCopyToClipboard(text: string): [CopiedResult, CopyFunction] {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeout = useRef<number | undefined>(undefined)

  const copy: CopyFunction = useCallback(async () => {
    // eslint-disable-next-line ts/strict-boolean-expressions -- navigator.clipboard is optional
    if (!navigator?.clipboard)
      return false

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false)
      }, 1000)
      return true
    } catch {
      setIsCopied(false)
      return false
    }
  }, [text])

  useEffect(() => () => window.clearTimeout(copyTimeout.current), [])

  return [isCopied, copy]
}

export default useCopyToClipboard
