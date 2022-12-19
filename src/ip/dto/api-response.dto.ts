import { ApiProperty } from '@nestjs/swagger';
import { IPInfoCache } from '../entities/ip.entity';

export class IPResponse {
  @ApiProperty()
  ip: string;
  @ApiProperty()
  info: object;

  constructor(ipInfoCache: IPInfoCache) {
    this.info = ipInfoCache.info;
    this.ip = ipInfoCache.ip;
  }
}
