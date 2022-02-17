import * as React from 'react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  json,
} from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import tailwindStyles from './styles/tailwind.css'
import appStyles from './styles/app.css'
import noScriptStyles from './styles/no-script.css'

import { getThemeSession } from './server/sessions/theme.server'
import { Theme, ThemeProvider, useTheme } from './providers/theme-provider'

import { seoMeta } from './utils/seo'
import { getDomainUrl, getUrl } from './utils/misc'

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

export type RootLoaderData = {
  theme: Theme
  url: {
    origin: string
    path: string
  }
}

export const meta: MetaFunction = ({ data }) => {
  const { url } = data as RootLoaderData

  return {
    ...seoMeta({
      keywords: 'React, Remix, Webdev, Javascript',
      url: getUrl(url),
      origin: url.origin,
    }),
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await getThemeSession(request)

  return json<RootLoaderData>({
    theme: getTheme(),
    url: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  })
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
