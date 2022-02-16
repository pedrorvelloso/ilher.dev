import 'dotenv/config'

import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import type { EntryContext } from 'remix'

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/img/social')) {
    const socialImage = await fetch(
      'https://res.cloudinary.com/ilher-dev/image/upload/v1643757273/iniciando-com-remix-2022_cxop6m.jpg',
    )
    const blob = socialImage.body
    return new Response(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=2419200',
      },
    })
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
