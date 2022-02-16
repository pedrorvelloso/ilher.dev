import type { LoaderFunction } from 'remix'
// import { imageProps } from '~/utils/imageBuilder'

export const loader: LoaderFunction = async () => {
  // const a = imageProps({
  //   id: 'social',
  //   transformations: {
  //     fetchFormat: 'auto',
  //     quality: 'auto',
  //     overlay: 'img:https://avatars.githubusercontent.com/u/20671359?v=4',
  //   },
  // })
  // console.log(a)

  const socialImage = await fetch(
    'https://res.cloudinary.com/ilher-dev/image/upload/v1645041698/social.png',
  )
  const blob = socialImage.body
  return new Response(blob, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=2419200',
    },
  })
}
