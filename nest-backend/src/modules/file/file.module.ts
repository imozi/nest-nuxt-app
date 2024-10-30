import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './repositories';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
