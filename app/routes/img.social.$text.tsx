import type { LoaderFunction } from 'remix'

import { imageBuilder } from '~/utils/imageBuilder'
import { doubleEncode } from '~/utils/misc'

export const loader: LoaderFunction = async ({ params }) => {
  const { text } = params

  const { src } = imageBuilder({
    id: 'social-image',
    transformations: {
      chaining: [
        {
          resize: {
            type: 'fit',
            width: 1786,
            height: 656,
          },
          gravity: 'north_west',
          overlay: `text:Arial_144_bold:${doubleEncode(
            text?.replace('.png', '') ?? '-',
          )},co_rgb:D1D5DB`,
          position: {
            x: 307,
            y: 200,
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
