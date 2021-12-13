import { TransformerOption } from '@cld-apis/types'
import { buildUrl, setConfig } from 'cloudinary-build-url'

setConfig({
  cloudName: 'ilher-dev',
})

interface ImagePropsOptions {
  id: string
  transformations?: TransformerOption
}

export function imageProps({ id, transformations }: ImagePropsOptions) {
  const cloudinaryImage = buildUrl(id, {
    transformations: { format: 'webp', ...transformations },
  })

  return { src: cloudinaryImage }
}
