import { useCallback, useEffect, useRef, useState } from 'react'

type CopiedResult = boolean
type CopyFunction = () => Promise<boolean>

const useCopyToClipboard = (text: string): [CopiedResult, CopyFunction] => {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeout = useRef<number | undefined>(undefined)

  const copy: CopyFunction = useCallback(async () => {
    if (!navigator?.clipboard) {
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false)
      }, 1000)
      return true
    } catch (error) {
      setIsCopied(false)
      return false
    }
  }, [text])

  useEffect(() => () => window.clearTimeout(copyTimeout.current), [])

  return [isCopied, copy]
}

export default useCopyToClipboard
