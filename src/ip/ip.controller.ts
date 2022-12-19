import {
  Controller,
  Get,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Param } from '@nestjs/common/decorators';
import { IPService } from './ip.service';
import { IPResponse } from './dto/api-response.dto';

/**
 * Main API controller
 */
@ApiTags('api')
@Controller('api')
export class IpController {
  constructor(private readonly ipService: IPService) {}

  @Get('/ip-info/:ip')
  @ApiResponse({
    status: 200,
    type: IPResponse,
  })
  async get(@Param('ip') ip: string): Promise<IPResponse | null> {
    const existingRecord = await this.ipService.getOneByIp(ip);

    if (existingRecord) {
      return new IPResponse(existingRecord);
    }

    const newRecord = await this.ipService.create(ip);

    if (newRecord) {
      return new IPResponse(newRecord);
    }

    throw new HttpException(undefined, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Delete('/clear-ip-info-cache/:ip')
  @ApiResponse({
    status: 200,
  })
  async delete(@Param('ip') ip: string) {
    const result = await this.ipService.remove(ip);

    if (!result || result.affected < 1) {
      throw new HttpException(undefined, HttpStatus.NOT_FOUND);
    }
  }
}
