import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'
import { useLocalStorage, useMedia } from 'react-use'

const useDarkMode = (): [
  boolean,
  Dispatch<SetStateAction<boolean | undefined>>,
] => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false)
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)
  const enabled = darkMode ?? prefersDarkMode

  useEffect(() => {
    enabled
      ? window.document.body.classList.add('dark')
      : window.document.body.classList.remove('dark')
  }, [enabled])

  return [enabled, setDarkMode]
}

export default useDarkMode
