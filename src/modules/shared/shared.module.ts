import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../database/ormconfig';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class SharedModule {}
