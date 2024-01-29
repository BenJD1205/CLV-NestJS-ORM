export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  port: number;
  apiPrefix: string;
};

export type PostgresDatabaseConfig = {
  url?: string;
  type?: string;
  host: string;
  port: number;
  password: string;
  name?: string;
  username: string;
  maxConnections?: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type OracleDatabaseConfig = {
  userName: string;
  password: string;
  host: string;
  port: number;
  serviceName: string;
};

export type AllConfigType = {
  postgres: PostgresDatabaseConfig;
  oracle: OracleDatabaseConfig;
  app: AppConfig;
};
