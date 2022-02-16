interface GetSeoOptions {
  title?: string
  description?: string
  keywords?: string
  url: string
}

export const seoMeta = ({
  title = 'Pedro Reis — Fullstack Developer',
  description = 'Pedro Reis personal website',
  keywords = '',
  url,
}: GetSeoOptions) => ({
  title,
  description,
  keywords,
  'og:url': url,
  'og:title': title,
  'og:description': description,
})
