import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateRingReqDto } from './dto/create-ring-req.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { RingEntity } from './entity/ring.entity';
import { HttpExceptionFilter } from './common/http-exception-filter.service';
import { UpdateRingReqDto } from './dto/update-ring-req.dto';
import { ResultDto } from './dto/result.dto';
import { MessageDto } from './dto/message.dto';
import { AppService } from './app.service';

@UseFilters(HttpExceptionFilter)
@Controller('rings')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  async create(@Body() args: CreateRingReqDto): Promise<ResultDto<RingEntity>> {
    const data = await this.service.create(args);
    return { data };
  }

  @Get()
  async get(): Promise<ResultDto<RingEntity[]>> {
    const data = await this.service.getAll();
    return { data };
  }
  //
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.service.get(id);
    return { data };
  }
  //
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() args: UpdateRingReqDto,
  ): Promise<ResultDto<RingEntity>> {
    const data = await this.service.update(id, args);
    return { data };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MessageDto> {
    await this.service.delete(id);
    return { message: 'Success' };
  }
}
