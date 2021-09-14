import * as Joi from 'joi';

const validation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  STEAM_API_KEY: Joi.string().required(),
  CHUNK_SIZE: Joi.number().integer().positive().optional(),
  TF2_SCHEMA_SERVICE_URL: Joi.string().required(),
});

export { validation };
