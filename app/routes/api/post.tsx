import type { ActionFunction } from 'remix'
import { json } from 'remix'

import { redisCache } from '~/server/db/redis.server'
import { POST_KEY, HOME_POSTS } from '~/utils/cacheKeys'

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json()

  if (request.headers.get('auth') !== process.env.AUTH_SECRET) {
    return json(
      { status: 400, message: 'something went wrong' },
      { status: 400 },
    )
  }

  const currKey = `${POST_KEY}:${body.slug}`
  const checkRedis = await redisCache.get(currKey)

  if (checkRedis) await redisCache.del(currKey)

  const post = { content: body.content, slug: body.slug }

  console.log('creating post')
  await redisCache.set(currKey, post)
  await redisCache.del(HOME_POSTS)

  return { status: 200, message: `${body.slug} created` }
}
