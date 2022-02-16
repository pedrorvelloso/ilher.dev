import type { LoaderFunction } from 'remix'
import { imageProps } from '~/utils/imageBuilder'

function doubleEncode(s: string) {
  return encodeURIComponent(encodeURIComponent(s))
}

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request.url)
  const text = requestUrl.searchParams.get('text')

  const { src } = imageProps({
    id: 'social',
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
            text ?? '-',
          )},co_rgb:D1D5DB`,
          position: {
            x: 307,
            y: 200,
          },
        },
      ],
    },
  })

  console.log(src)

  const socialImage = await fetch(src)
  const blob = await socialImage.arrayBuffer()
  return new Response(Buffer.from(blob), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=2419200',
    },
  })
}
