import { bundleMDX } from 'mdx-bundler'
import { buildUrl } from 'cloudinary-build-url'
import readingTime from 'reading-time'

import { rehypeMetaAttrs } from './rehypePlugins.server'
import { redisCache } from './redis.server'
import { HOME_POSTS } from './cacheKeys'

import { HomePost, Post } from '~/types'

export const compileMdx = async (content: string) => {
  const { code, frontmatter } = await bundleMDX({
    source: content,
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttrs,
      ]

      return options
    },
  })

  const readTime = readingTime(content).text

  return { code, frontmatter, readTime }
}

export const getPost = async (slug: string) => {
  const result = await redisCache.get<{ content: string }>(`blog:${slug}`)

  if (!result) return null

  const { code, frontmatter, readTime } = await compileMdx(result.content)
  frontmatter.blurImage = await getBlurDataUrl(frontmatter.bannerId)

  return { code, frontmatter: { ...frontmatter, readTime } }
}

export const getLatestPosts = async () => {
  const postsKeys = await redisCache.scan('blog:*')

  const loadedPosts = await Promise.all(
    postsKeys.map(async (p) => {
      const { content } = (await redisCache.get(p)) as { content: string }

      const { frontmatter, readTime } = await compileMdx(content)
      frontmatter.blurImage = await getBlurDataUrl(frontmatter.bannerId)

      const post = frontmatter as Post

      return {
        ...post,
        url: `/${p.split(':')[1]}`,
        readTime,
      }
    }),
  )

  loadedPosts.sort((postA, postB) => {
    return +new Date(postB.date) - +new Date(postA.date)
  })

  return loadedPosts
}

export const getHomePosts = async () => {
  const cache = await redisCache.get<Array<HomePost>>(HOME_POSTS)

  if (cache) return cache

  const posts = (await getLatestPosts()).slice(0, 3)
  await redisCache.set(HOME_POSTS, posts)

  return posts
}

const getDataUrlForImage = async (imageUrl: string) => {
  const res = await fetch(imageUrl)
  const arrayBuffer = await res.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  const mime = res.headers.get('Content-Type') ?? 'image/webp'
  const dataUrl = `data:${mime};base64,${base64}`
  return dataUrl
}

const getBlurDataUrl = async (cloudinaryId: string) => {
  const imageURL = buildUrl(cloudinaryId, {
    cloud: {
      cloudName: 'ilher-dev',
    },
    transformations: {
      resize: { width: 100 },
      quality: 'auto',
      format: 'webp',
      effect: {
        name: 'blur',
        value: '1000',
      },
    },
  })

  let dataUrl: string

  try {
    dataUrl = await getDataUrlForImage(imageURL)
    return dataUrl
  } catch (e) {
    console.error('error getting blur image', e)
  }
}
