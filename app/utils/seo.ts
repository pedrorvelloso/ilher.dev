import { RootLoaderData } from '~/root'
import { BlogPostLoaderData } from '~/routes/blog/$slug'
import { getUrl } from './misc'

interface GetSeoOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: 'article' | 'website'
  url: string
  origin: string
}

export const seoMeta = ({
  title = 'Pedro Reis — Fullstack Developer',
  description = 'Pedro Reis personal website',
  keywords = '',
  url,
  origin,
  image = getSeoImage({ origin, text: title }),
  type = 'website',
}: GetSeoOptions) => ({
  title,
  description,
  keywords,
  image,
  'og:url': url,
  'og:title': title,
  'og:description': description,
  'og:type': type,
  'og:image': image,
  'og:image:alt': title,
  'twitter:card': image ? 'summary_large_image' : 'summary',
  'twitter:creator': '@ilher',
  'twitter:site': '@ilher',
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
  'twitter:alt': title,
})

interface GetSeoImageOptions {
  origin: string
  text: string
}

export const getSeoImage = ({ origin, text }: GetSeoImageOptions) => {
  const params = new URLSearchParams({ text })

  return `${origin}/img/social?${params.toString()}`
}

interface SeoNoteMetaOptions {
  data: BlogPostLoaderData | null
  parentsData: {
    root: RootLoaderData
  }
  request: Request
}

export const seoNoteMeta = ({ data, parentsData }: SeoNoteMetaOptions) => {
  if (!data)
    return { title: 'Page not found', description: 'This page does not exist!' }

  const { url } = parentsData.root

  return {
    ...seoMeta({
      origin: url.origin,
      title: data.title,
      url: getUrl({ origin: url.origin, path: `/blog/${data.path}` }),
      description: data.headline,
      image: getSeoImage({ origin: url.origin, text: data.title }),
      type: 'article',
    }),
  }
}
