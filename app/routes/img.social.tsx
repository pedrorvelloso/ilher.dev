import type { LoaderFunction } from 'remix'

import { imageBuilder } from '~/utils/imageBuilder'
import { doubleEncode } from '~/utils/misc'

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request.url)
  const text = requestUrl.searchParams.get('text')

  const { src } = imageBuilder({
    id: 'Social_3_qsewrs',
    transformations: {
      chaining: [
        {
          resize: {
            type: 'fit',
            width: 1010,
            height: 216,
          },
          gravity: 'north_west',
          overlay: `text:Arial_86_bold:${doubleEncode(
            text ?? '-',
          )},co_rgb:D1D5DB`,
          position: {
            x: 95,
            y: 62,
          },
        },
      ],
    },
  })

  console.log(src)

  const socialImageCloudinary = await fetch(src)
  const imageBuffer = await socialImageCloudinary.arrayBuffer()
  return new Response(Buffer.from(imageBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=2419200',
    },
  })
}
