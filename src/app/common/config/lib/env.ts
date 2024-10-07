import * as Joi from 'joi';
import { greenBright, yellowBright, redBright, blueBright } from 'chalk';

export interface EnvironmentVariables {
  PORT: string;
  MODE: string;
  PREFIX: string;
  CORS: string;
  STORAGE_PATH: string;
  JWT_CRYPT_KEY: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_COOKIE_KEY: string;
}

const schemaEnvironmentVariables = Joi.object<EnvironmentVariables>({
  PORT: Joi.number().required().messages({
    'any.required': 'Переменная PORT не объявлена в .env',
    'number.base': 'PORT должен быть числом',
  }),
  MODE: Joi.string().required().valid('development', 'production').messages({
    'any.required': 'Переменная MODE не объявлена в .env',
    'any.only': 'Значение переменной MODE должно быть либо "development", либо "production"',
  }),
  PREFIX: Joi.string().required().messages({
    'any.required': 'Переменная PREFIX не объявлена в .env',
  }),
  CORS: Joi.string().required().messages({
    'any.required': 'Переменная CORS не объявлена в .env',
  }),
  STORAGE_PATH: Joi.string().required().messages({
    'any.required': 'Переменная STORAGE_PATH не объявлена в .env',
  }),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required().messages({
    'any.required': 'Переменная JWT_ACCESS_TOKEN_SECRET не объявлена в .env',
  }),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required().messages({
    'any.required': 'Переменная JWT_ACCESS_TOKEN_EXPIRES_IN не объявлена в .env',
  }),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required().messages({
    'any.required': 'Переменная JWT_REFRESH_TOKEN_SECRET не объявлена в .env',
  }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required().messages({
    'any.required': 'Переменная JWT_REFRESH_TOKEN_EXPIRES_IN не объявлена в .env',
  }),
  JWT_REFRESH_TOKEN_COOKIE_KEY: Joi.string().required().messages({
    'any.required': 'Переменная JWT_REFRESH_TOKEN_COOKIE_KEY не объявлена в .env',
  }),
  JWT_CRYPT_KEY: Joi.string().required().messages({
    'any.required': 'Переменная JWT_CRYPT_KEY не объявлена в .env',
  }),
});

const errorMesages = (error: Joi.ValidationError) => {
  const convertError = error.details
    .map((err) => {
      return `${yellowBright(err.context.key)}: ${blueBright(err.message)}`;
    })
    .join('\n');

  return `${redBright('Ошибка: переменные среды (.env)')}
${convertError}

${greenBright('Проверьте наличие файла .env и обязательных переменных!')}
  `;
};

export const validateEnvironment = (config: EnvironmentVariables | Record<string, unknown>) => {
  const { error, value } = schemaEnvironmentVariables.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(errorMesages(error));
  }

  return value;
};
