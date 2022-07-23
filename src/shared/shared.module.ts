import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      database: 'typeorm-test',
      username: 'postgres',
      password: 'postgres',
      logger: 'debug',
      useUTC: true,
    }),
  ],
})
export class SharedModule {}
