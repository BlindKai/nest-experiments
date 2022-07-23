import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

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
      entities: [User, Post],
      useUTC: true,
    }),
  ],
})
export class SharedModule {}
