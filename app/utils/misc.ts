import slugify from 'slugify'

export const getEnv = (key: string, devValue = `${key}-dev`) => {
  let value = devValue
  const env = process.env[key]

  if (env) value = env
  else if (process.env.NODE_ENV === 'production')
    throw new Error(`${key} env must be set`)

  return value
}

export const toSlug = (value: string) => slugify(value.toLowerCase())

export const getDomainUrl = (request: Request) => {
  const host = request.headers.get('host')

  if (!host) throw new Error('could not get hostname')

  const protocol = host.includes('localhost') ? 'http' : 'https'

  return `${protocol}://${host}`
}

export const getUrl = (url: { origin: string; path: string }) => {
  return `${url.origin}${url.path}`
}

export const doubleEncode = (s: string) => {
  return encodeURIComponent(encodeURIComponent(s))
}

export const ogImageLinkText = {
  home: 'Pedro Reis — Fullstack Developer',
}
