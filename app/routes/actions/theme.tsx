import type { ActionFunction, LoaderFunction } from 'remix'
import { json, redirect } from 'remix'

import { Theme } from '~/providers/theme-provider'
import { getThemeSession } from '~/sessions/theme.server'

const isTheme = (value: unknown): value is Theme => {
  return typeof value === 'string' && (value === 'dark' || value === 'light')
}

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)

  const requestText = await request.text()
  const selectedTheme = new URLSearchParams(requestText).get(
    'theme',
  ) as Theme | null

  if (!isTheme(selectedTheme)) {
    return json({
      success: false,
      message: `${selectedTheme} is not a valid theme.`,
    })
  }

  themeSession.setTheme(selectedTheme)

  return json(
    { success: true, message: `${selectedTheme} theme is now set!` },
    { headers: { 'Set-Cookie': await themeSession.commit() } },
  )
}

export const loader: LoaderFunction = () => redirect('/', { status: 404 })
