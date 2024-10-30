import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async findAll() {
    return this.fileService.findAll();
  }
}
