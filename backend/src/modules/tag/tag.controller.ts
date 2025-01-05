import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { PaginateQuery } from '@/shared/core/types';
import { TagDeleteDto, TagDto, TagUpdateDto } from './dto';
import { JwtAccessGuard } from '@/guards';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return this.tagService.findAll(query);
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  async create(@Body() data: TagDto) {
    return this.tagService.create(data);
  }

  @Patch()
  @UseGuards(JwtAccessGuard)
  async update(@Body() data: TagUpdateDto) {
    return this.tagService.update(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  async delete(@Body() data: TagDeleteDto) {
    return this.tagService.delete(data);
  }
}
