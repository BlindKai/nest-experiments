import { Logger as NestJSLogger } from '@nestjs/common';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestJSLogger('TypeORM');

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.debug(query);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.error(error, { query, parameters });
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.warn(query, { time, parameters });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(message, 'Migrations');
  }

  log(level: 'warn' | 'info' | 'log', message: any, queryRunner?: QueryRunner) {
    if (level === 'warn') {
      this.logger.warn(message);
    } else {
      this.logger.debug(message);
    }
  }
}
