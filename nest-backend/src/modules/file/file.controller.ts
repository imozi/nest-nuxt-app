import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { PaginateQuery } from '@/shared/core/types';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async findAll(@Query() query: PaginateQuery) {
    return this.fileService.findAll(query);
  }

  @Get(':type')
  async findAllType(@Param() { type }, @Query() query: PaginateQuery) {
    return this.fileService.findAllType(query, type);
  }
}
