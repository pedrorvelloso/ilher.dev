import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useFetcher } from 'remix'

export type Theme = 'dark' | 'light'

interface ThemeContextData {
  theme: Theme
  changeTheme(theme: Theme): void
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined)

interface ThemeProviderProps {
  initialTheme: Theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme,
  children,
}) => {
  const [theme, setTheme] = useState(initialTheme)
  const changeTheme = useCallback((nextTheme: Theme) => setTheme(nextTheme), [])

  const themeFetcher = useFetcher()
  const themeFetcherRef = useRef(themeFetcher)

  useEffect(() => {
    themeFetcherRef.current = themeFetcher
  }, [themeFetcher])

  const firstMount = useRef(false)

  useEffect(() => {
    if (!firstMount.current) {
      firstMount.current = true
      return
    }

    if (!theme) return
    themeFetcherRef.current.submit(
      { theme },
      { action: 'action/theme', method: 'post' },
    )
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within ThemeProvider')

  return context
}
