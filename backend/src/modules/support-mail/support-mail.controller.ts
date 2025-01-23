import { PaginateQuery } from '@/shared/core/types';
import { Body, Controller, Get, Patch, Post, Delete, Query, UseGuards } from '@nestjs/common';
import { SupportMailService } from './support-mail.service';
import { JwtAccessGuard, RolesGuard } from '@/guards';
import { SupportMailDeleteDto, SupportMailDto, SupportMailUpdateDto } from './dto';
import { Roles } from '@/decorators';

@Controller('support-mail')
export class SupportMailController {
  constructor(private readonly supportMailService: SupportMailService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return this.supportMailService.findAll(query);
  }

  @Get('total')
  @UseGuards(JwtAccessGuard)
  async getTotal() {
    return await this.supportMailService.getTotal();
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

  @Delete()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('admin')
  async delete(@Body() data: SupportMailDeleteDto) {
    return await this.supportMailService.delete(data);
  }
}
