import Redis from 'ioredis'
import { getEnv } from '~/utils/misc'

let redisClient: Redis.Redis

const redisConfig: Redis.RedisOptions = {
  host: getEnv('REDIS_HOST', 'localhost'),
  port: Number(getEnv('REDIS_PORT', '6379')),
  password: getEnv('REDIS_PASSWORD', 'password'),
  commandTimeout: 1000,
}

declare global {
  var __redisClient: Redis.Redis | undefined
}

if (process.env.NODE_ENV === 'production') {
  redisClient = new Redis(redisConfig)
} else {
  if (!global.__redisClient) {
    global.__redisClient = new Redis(redisConfig)
  }
  redisClient = global.__redisClient
}

redisClient.on('error', (error) => console.error('REDIS ERROR', error))

async function get<Value = unknown>(key: string) {
  try {
    const result = await redisClient.get(key)

    return result ? (JSON.parse(result) as Value) : null
  } catch (err) {
    console.error('Redis error:', err)
    throw err
  }
}

async function set<Value>(key: string, value: Value): Promise<'OK'> {
  const result = await redisClient.set(key, JSON.stringify(value))

  if (!result) throw new Error('not able to set value')

  return result
}

async function del(key: string) {
  await redisClient.del(key)
}

async function scan(pattern: string) {
  const keyScan = redisClient.scanStream({ match: pattern })

  const result = new Promise((resolve, reject) => {
    keyScan.on('data', (keys) => resolve(keys))
    keyScan.on('error', () => reject(new Error('failed to scan key')))
  })

  return result as Promise<string[]>
}

export const redisCache = {
  get,
  set,
  del,
  keys: redisClient.keys.bind(redisClient),
  scan,
}
