import { load } from 'ts-dotenv';

export const env = load({
  NODE_ENV: String,
  JWT_SECRET: String,
  MONGO_URI: String,

  PORT: { type: Number, default: 3000 },

  APP_URL: String,
});
