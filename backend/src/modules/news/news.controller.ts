import { PaginateQuery } from '@/shared/core/types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDeleteDto, NewsDto } from './dto';
import { JwtAccessGuard } from '@/guards';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return this.newsService.findAll(query);
  }

  @Get(':slug')
  @UseGuards(JwtAccessGuard)
  async findBySlug(@Param('slug') slug: string) {
    return await this.newsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  async create(@Body() data: NewsDto) {
    return this.newsService.create(data);
  }

  @Patch()
  @UseGuards(JwtAccessGuard)
  async update(@Body() data: NewsDto) {
    return this.newsService.update(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  async delete(@Body() data: NewsDeleteDto) {
    return this.newsService.delete(data);
  }
}
