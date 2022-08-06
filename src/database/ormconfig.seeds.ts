import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

export const seedConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  database: 'typeorm-test',
  username: 'postgres',
  password: 'postgres',
  logger: 'advanced-console',
  logging: true,
  entities: [path.join(__dirname, '..', 'modules/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'seeds/*{.ts,.js}')],
  migrationsTableName: 'seeds',
};

export const seedingDataSource: DataSource = new DataSource(seedConfig);
