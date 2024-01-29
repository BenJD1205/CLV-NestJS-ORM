  // import { DataSource, DataSourceOptions } from 'typeorm';
  // import {User} from '../entity'

  // export const POSTGRESDATASOURCE = new DataSource({
  //   type: process.env.POSTGRES_DATABASE_TYPE,
  //   host: process.env.POSTGRES_DATABASE_HOST,
  //   database: process.env.POSTGRES_DATABASE_NAME,
  //   port: process.env.POSTGRES_DATABASE_PORT
  //     ? parseInt(process.env.POSTGRES_DATABASE_PORT)
  //     : 5432,
  //   username: process.env.POSTGRES_DATABASE_USERNAME,
  //   password: process.env.POSTGRES_DATABASE_PASSWORD,
  //   synchronize: false,
  //   dropSchema: false,
  //   entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  //   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  // } as DataSourceOptions);

 import { DataSource} from 'typeorm';
  
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'USER',
  password: 'USER',
  database: 'CHORUS',
  logging: true,
  entities: [__dirname + '../**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
});
