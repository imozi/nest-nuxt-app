import { PaginateQuery } from '@/shared/core/types';
import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SupportMailService } from './support-mail.service';
import { JwtAccessGuard } from '@/guards';
import { SupportMailDto, SupportMailUpdateDto } from './dto';

@Controller('support-mail')
export class SupportMailController {
  constructor(private readonly supportMailService: SupportMailService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return this.supportMailService.findAll(query);
  }

  @Post()
  async create(@Body() data: SupportMailDto) {
    return await this.supportMailService.create(data);
  }

  @Patch()
  @UseGuards(JwtAccessGuard)
  async update(@Body() data: SupportMailUpdateDto) {
    return await this.supportMailService.update(data);
  }
}
