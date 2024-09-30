import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ExtendExpressMulterFile, FileTypes } from './lib';
import { EnvironmentService } from '../environment';

@Controller('upload')
export class UploadController {
  private storagePath: string = this.environments.get('STORAGE_PATH');

  constructor(
    private readonly uploadService: UploadService,
    private readonly environments: EnvironmentService,
  ) {}

  @Post('images')
  @UseInterceptors(FilesInterceptor('images'))
  async images(@UploadedFiles() files: ExtendExpressMulterFile[]) {
    return await this.uploadService.save(files, FileTypes.IMAGE, `${this.storagePath}images`);
  }

  @Post('docs')
  @UseInterceptors(FilesInterceptor('docs'))
  async docs(@UploadedFiles() files: ExtendExpressMulterFile[]) {
    return await this.uploadService.save(files, FileTypes.DOCS, `${this.storagePath}docs`);
  }

  @Post('video')
  @UseInterceptors(FilesInterceptor('video'))
  async video(@UploadedFiles() files: ExtendExpressMulterFile[]) {
    return await this.uploadService.save(files, FileTypes.VIDEO, `${this.storagePath}video`);
  }
}
