import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.string().default(3000),
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  ORIGINS: joi.string().default('*'),
  EMAIL_ADDRESS: joi.string().required(),
  EMAIL_PASSWORD: joi.string().required(),
  CLIENT_URL: joi.string().required(),
});
