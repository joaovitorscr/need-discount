import { Redis } from "@upstash/redis"
import { env } from "~/env"

const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
})

export { redis }
