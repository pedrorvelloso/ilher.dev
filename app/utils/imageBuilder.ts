import { TransformerOption } from '@cld-apis/types'
import { buildUrl, setConfig } from 'cloudinary-build-url'

setConfig({
  cloudName: 'ilher-dev',
})

interface ImageBuilderOptions {
  id: string
  transformations?: TransformerOption
}

export function imageBuilder({ id, transformations }: ImageBuilderOptions) {
  const cloudinaryImage = buildUrl(id, {
    transformations: { format: 'webp', ...transformations },
  })

  return { src: cloudinaryImage }
}

export function getImageProps({
  id,
  widths,
  sizes,
  transformations,
}: {
  id: string
  widths: Array<number>
  sizes: Array<string>
  transformations?: TransformerOption
}) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    src: imageBuilder({
      id,
      transformations: {
        ...transformations,
        resize: { width: averageSize, ...transformations?.resize },
      },
    }).src,
    srcSet: widths
      .map((width) =>
        [
          imageBuilder({
            id,
            transformations: {
              ...transformations,
              resize: { width, ...transformations?.resize },
            },
          }).src,
          `${width}w`,
        ].join(' '),
      )
      .join(', '),
    sizes: sizes.join(', '),
  }
}
