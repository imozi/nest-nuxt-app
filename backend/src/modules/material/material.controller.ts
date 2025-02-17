import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MaterialService } from './material.service';
import { PaginateQuery } from '@/shared/core/types';
import { MaterialDto, MaterialDeleteDto, MaterialSlugOrIdDto } from './dto';
import { JwtAccessGuard } from '@/guards';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get('total')
  @UseGuards(JwtAccessGuard)
  async getTotal() {
    return await this.materialService.getTotal();
  }

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return await this.materialService.findAll(query);
  }

  @Get(':slugOrId')
  @UseGuards(JwtAccessGuard)
  async findBySlugOrId(@Param() { slugOrId }: MaterialSlugOrIdDto) {
    return await this.materialService.findBySlugOrId(slugOrId);
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  async create(@Body() data: MaterialDto) {
    return await this.materialService.create(data);
  }

  @Patch()
  @UseGuards(JwtAccessGuard)
  async update(@Body() data: MaterialDto) {
    return this.materialService.update(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  async delete(@Body() data: MaterialDeleteDto) {
    return this.materialService.delete(data);
  }
}
