import { Controller, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ExtendExpressMulterFile, FileTypes } from './lib';
import { ConfigService } from '../config';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  private storagePath: string = this.config.get('STORAGE_PATH');

  constructor(
    private readonly uploadService: UploadService,
    private readonly config: ConfigService,
  ) {}

  @Post('images')
  @UseInterceptors(FilesInterceptor('images'))
  async images(@UploadedFiles() files: ExtendExpressMulterFile[], @Req() req: Request) {
    const reqId = req.headers['x-request-id'] as string;
    return await this.uploadService.save(files, FileTypes.IMAGE, `${this.storagePath}images`, reqId);
  }

  @Post('docs')
  @UseInterceptors(FilesInterceptor('docs'))
  async docs(@UploadedFiles() files: ExtendExpressMulterFile[], @Req() req: Request) {
    const reqId = req.headers['x-request-id'] as string;
    return await this.uploadService.save(files, FileTypes.DOCS, `${this.storagePath}docs`, reqId);
  }

  @Post('video')
  @UseInterceptors(FilesInterceptor('video'))
  async video(@UploadedFiles() files: ExtendExpressMulterFile[], @Req() req: Request) {
    const reqId = req.headers['x-request-id'] as string;
    return await this.uploadService.save(files, FileTypes.VIDEO, `${this.storagePath}video`, reqId);
  }
}
