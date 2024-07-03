import redis from "ioredis";
import { config } from "dotenv";
config();

// Creating redis client
const redisParams = {
  password: process.env.REDIS_PW,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_UNAME,
};
const client = redis.createClient(redisParams);
export default client;
