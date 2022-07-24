import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { DatabaseLogger } from './logger';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  database: 'typeorm-test',
  username: 'postgres',
  password: 'postgres',
  logger: new DatabaseLogger(),
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  useUTC: true,
  migrationsTableName: 'migrations',
  migrationsRun: true,
  migrations: [path.join(__dirname, '/../migrations/**/*{.ts,.js}')],
};

const postgresDataSource: DataSource = new DataSource(config);

export default postgresDataSource;
