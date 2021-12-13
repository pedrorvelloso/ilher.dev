import Redis from 'ioredis'

let redisClient: Redis.Redis

const redisConfig: Redis.RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.PASSWORD || 'password',
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

function set<Value>(key: string, value: Value): Promise<'OK'> {
  return new Promise((resolve) => {
    redisClient.set(key, JSON.stringify(value)).then((result) => {
      if (result) resolve(result)
    })
  })
}

async function del(key: string) {
  await redisClient.del(key)
}

export const redisCache = {
  get,
  set,
  del,
  keys: redisClient.keys.bind(redisClient),
}
