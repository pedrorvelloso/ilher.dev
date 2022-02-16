import * as React from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
  useLoaderData,
} from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import tailwindStyles from './styles/tailwind.css'
import appStyles from './styles/app.css'
import noScriptStyles from './styles/no-script.css'

import { getThemeSession } from './server/sessions/theme.server'
import { Theme, ThemeProvider, useTheme } from './providers/theme-provider'

import { seoMeta } from './utils/seo'

import { Layout } from './components/layout'
import { ErrorPage } from './components/error'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com/',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com/',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
    },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: appStyles },
  ]
}

export const meta: MetaFunction = () => {
  return {
    ...seoMeta({
      keywords: 'React, Remix, Webdev, Javascript',
    }),
  }
}

type RootLoaderData = {
  theme: Theme
}

export const loader: LoaderFunction = async ({ request }) => {
  console.log(request.headers.get('host'))
  const themeSession = await getThemeSession(request)

  return {
    theme: themeSession.getTheme(),
  }
}

function App() {
  const { theme } = useTheme()

  return (
    <Document theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<RootLoaderData>()

  return (
    <ThemeProvider initialTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}

function Document({
  children,
  title,
  theme = 'dark',
}: {
  children: React.ReactNode
  title?: string
  theme?: Theme
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <noscript>
          <link rel="stylesheet" href={noScriptStyles} />
        </noscript>
      </head>
      <body className={theme}>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = <p>Page not found</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <ThemeProvider initialTheme="dark">
      <Document title={`${caught.status} - ${caught.statusText}`}>
        <Layout>
          <ErrorPage title={message} description="Ooops" />
        </Layout>
      </Document>
    </ThemeProvider>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <ErrorPage title="Something went wrong!" description="Oooops" />
    </Document>
  )
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
// TODO edit
const RouteChangeAnnouncement = React.memo(() => {
  const [hydrated, setHydrated] = React.useState(false)
  const [innerHtml, setInnerHtml] = React.useState('')
  const location = useLocation()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  const firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    const pageTitle = location.pathname === '/' ? 'Home page' : document.title
    setInnerHtml(`Navigated to ${pageTitle}`)
  }, [location.pathname])

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: '0',
        clipPath: 'inset(100%)',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {innerHtml}
    </div>
  )
})
