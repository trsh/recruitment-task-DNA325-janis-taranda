import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IPInfoCache } from './entities/ip.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IPService {
  constructor(
    @InjectRepository(IPInfoCache)
    private readonly ipCacheRepository: Repository<IPInfoCache>,
    private configService: ConfigService,
  ) {}

  async create(ip: string): Promise<IPInfoCache | null> {
    const ipInfoCache = new IPInfoCache();
    ipInfoCache.ip = ip;

    const { data, status } = await axios.get<{
      success: boolean;
      message: string;
    }>(`${this.configService.getOrThrow<string>('IP_API_URL')}/${ip}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (status !== 200) {
      throw Error(`Third party service responded with status: ${status}`);
    } else if (data.success === false) {
      throw new HttpException(data.message, HttpStatus.BAD_REQUEST);
    } else {
      ipInfoCache.info = data;
    }

    return this.ipCacheRepository.save(ipInfoCache);
  }

  async remove(ip: string): Promise<DeleteResult> {
    return this.ipCacheRepository.delete({ ip });
  }

  async getOneByIp(ip: string): Promise<IPInfoCache> {
    return this.ipCacheRepository.findOneBy({ ip });
  }
}
