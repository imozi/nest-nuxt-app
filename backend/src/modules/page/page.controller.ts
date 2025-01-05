import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PageService } from './page.service';
import { PaginateQuery } from '@/shared/core/types';
import { PageDeleteDto, PageDto } from './dto';
import { JwtAccessGuard } from '@/guards';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return await this.pageService.findAll({ ...query });
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  async create(@Body() data: PageDto) {
    return await this.pageService.create(data);
  }

  @Patch()
  @UseGuards(JwtAccessGuard)
  async update(@Body() data: PageDto) {
    return await this.pageService.update(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  async delete(@Body() data: PageDeleteDto) {
    return await this.pageService.delete(data);
  }
}
