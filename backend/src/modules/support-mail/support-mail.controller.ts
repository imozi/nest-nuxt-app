import { PaginateQuery } from '@/shared/core/types';
import { Body, Controller, Get, Patch, Post, Delete, Query, UseGuards } from '@nestjs/common';
import { SupportMailService } from './support-mail.service';
import { JwtAccessGuard, RolesGuard } from '@/guards';
import { SupportMailCountDto, SupportMailDeleteDto, SupportMailDto, SupportMailUpdateDto } from './dto';
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

  @Get('total-year')
  @UseGuards(JwtAccessGuard)
  async getTotalYear() {
    return await this.supportMailService.getTotalYear();
  }

  @Get('history')
  @UseGuards(JwtAccessGuard)
  async history(@Query() query: PaginateQuery) {
    return await this.supportMailService.history(query);
  }

  @Get('new')
  @UseGuards(JwtAccessGuard)
  async getTotalNew(@Query() data: SupportMailCountDto) {
    return this.supportMailService.getTotalNew(data);
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

  @Patch('history')
  @UseGuards(JwtAccessGuard)
  async updateHistory(@Body() data: SupportMailUpdateDto) {
    return await this.supportMailService.updateHistory(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('admin')
  async delete(@Body() data: SupportMailDeleteDto) {
    return await this.supportMailService.delete(data);
  }

  @Delete('history')
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('admin')
  async deleteHistory(@Body() data: SupportMailDeleteDto) {
    return await this.supportMailService.deleteHistory(data);
  }
}
