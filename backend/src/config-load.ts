import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.string().default(3000),
  DATABASE_URL: joi.string().required(),
});
