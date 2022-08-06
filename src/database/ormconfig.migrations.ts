import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  database: 'typeorm-test',
  username: 'postgres',
  password: 'postgres',
  logger: 'advanced-console',
  logging: true,
  useUTC: true,
  entities: [path.join(__dirname, '..', '**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

export const dataSource: DataSource = new DataSource(config);
