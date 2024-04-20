import { useThemeMode } from 'antd-style'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'
import { useLocalStorage, useMedia } from 'react-use'

function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean | undefined>>,
] {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false)
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)
  const { setThemeMode } = useThemeMode()
  const enabled = darkMode ?? prefersDarkMode

  useEffect(() => {
    if (enabled) {
      window.document.body.classList.add('dark')
      setThemeMode('dark')
    } else {
      window.document.body.classList.remove('dark')
      setThemeMode('light')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `setThemeMode` should not in deps.
  }, [enabled])

  return [enabled, setDarkMode]
}

export default useDarkMode
