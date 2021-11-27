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

function get<Value = unknown>(key: string): Promise<Value | null> {
  return new Promise((resolve) => {
    redisClient.get(key, (err, res) => {
      if (err) {
        console.error('Redis error:', err)
      }
      resolve(res ? (JSON.parse(res) as Value) : null)
    })
  })
}

export const redisCache = { get }
