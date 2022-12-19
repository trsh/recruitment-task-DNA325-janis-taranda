import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IPInfoCache } from './entities/ip.entity';
import { IpController } from './ip.controller';
import { IPService } from './ip.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([IPInfoCache])],
  providers: [IPService],
  controllers: [IpController],
  exports: [IPService],
})
export class IPModule {}
