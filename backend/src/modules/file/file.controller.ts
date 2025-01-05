import { Body, Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { PaginateQuery } from '@/shared/core/types';
import { JwtAccessGuard } from '@/guards';
import { FilesDeleteDto } from './dto';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() query: PaginateQuery) {
    return this.fileService.findAll(query);
  }

  @Get(':type')
  @UseGuards(JwtAccessGuard)
  async findAllType(@Param() { type }, @Query() query: PaginateQuery) {
    return this.fileService.findAllType(query, type);
  }

  @Delete()
  @UseGuards(JwtAccessGuard)
  async delete(@Body() data: FilesDeleteDto) {
    return await this.fileService.delete(data);
  }
}
