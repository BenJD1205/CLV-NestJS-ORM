import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import { PostgresDatabaseConfig } from './config.type';
import * as process from 'process';
import {validateConfig} from '../utils';

class EnvVariablesValidator {
  @ValidateIf((envValues) => envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  POSTGRES_DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.POSTGRES_DATABASE_URL)
  @IsString()
  POSTGRES_DATABASE_USERNAME: string;

  @IsInt()
  @IsOptional()
  POSTGRES_DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  POSTGRES_DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  POSTGRES_DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  POSTGRES_DATABASE_CA: string;

  @IsString()
  @IsOptional()
  POSTGRES_DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  POSTGRES_DATABASE_CERT: string;
}

export const postgresConfig = registerAs<PostgresDatabaseConfig>('postgres', () => {
  validateConfig(process.env, EnvVariablesValidator);

  return {
    url: process.env.POSTGRES_DATABASE_URL,
    type: process.env.POSTGRES_DATABASE_TYPE,
    host: process.env.POSTGRES_DATABASE_HOST,
    port: process.env.POSTGRES_DATABASE_PORT
      ? parseInt(process.env.POSTGRES_DATABASE_PORT, 10)
      : 5432,
    password: process.env.POSTGRES_DATABASE_PASSWORD,
    name: process.env.POSTGRES_DATABASE_NAME,
    username: process.env.POSTGRES_DATABASE_USERNAME,
    maxConnections: process.env.POSTGRES_DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.POSTGRES_DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.POSTGRES_DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized:
      process.env.POSTGRES_DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.POSTGRES_DATABASE_CA,
    key: process.env.POSTGRES_DATABASE_KEY,
    cert: process.env.POSTGRES_DATABASE_CERT,
  };
});
