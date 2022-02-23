import type { LoaderFunction } from 'remix'
import { cn, sitePath } from '~/server/collectedNotes.server'

import { imageBuilder } from '~/utils/imageBuilder'
import { doubleEncode, ogImageLinkText } from '~/utils/misc'

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request.url)
  const id = requestUrl.searchParams.get('id')
  const type = requestUrl.searchParams.get('type')

  let text = ogImageLinkText.home

  if (type === 'article' && id) {
    const { note } = await cn.body(sitePath, id)

    text = note ? note.title : ogImageLinkText.home
  }

  if (type === 'website' && id) {
    text = ogImageLinkText[id] ?? ogImageLinkText.home
  }

  const { src } = imageBuilder({
    id: 'social-image',
    transformations: {
      format: 'png',
      chaining: [
        {
          resize: {
            type: 'fit',
            width: 1010,
            height: 250,
          },
          gravity: 'north_west',
          overlay: `text:Nunito_86_bold:${doubleEncode(text)},co_rgb:D1D5DB`,
          position: {
            x: 95,
            y: 62,
          },
        },
      ],
    },
  })

  const socialImageCloudinary = await fetch(src)
  const imageBuffer = await socialImageCloudinary.arrayBuffer()
  return new Response(Buffer.from(imageBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=2419200',
    },
  })
}
