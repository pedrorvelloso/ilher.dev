import { createCookieSessionStorage } from 'remix'

import { Theme } from '~/providers/theme-provider'
import { getEnv } from '~/utils/misc'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: '@ilher/theme',
    secure: true,
    secrets: [getEnv('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    expires: new Date('2088-10-18'),
    httpOnly: true,
  },
})

export const getThemeSession = async (request: Request) => {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))

  return {
    getTheme(): Theme {
      const themeValue = session.get('theme') as Theme
      return themeValue === 'dark' || themeValue === 'light'
        ? themeValue
        : 'dark'
    },
    setTheme(theme: Theme) {
      session.set('theme', theme)
    },
    commit() {
      return themeStorage.commitSession(session)
    },
  }
}
