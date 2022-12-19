import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IPModule } from './ip/ip.module';
import { connectionOptions } from './data.source';

/**
 * Main app module
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...connectionOptions,
      autoLoadEntities: true,
    }),
    IPModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
