import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { $Enums } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@/app/common';
import { FilesDeleteDto } from './dto';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.onAny((event: string, files) => {
      if (event.startsWith('file.uploaded.')) {
        const reqId = event.split('.').pop();
        this.create(files, reqId);
      }
    });
  }

  private async create(files, reqId) {
    try {
      const savedFile = await this.fileRepository.createMany(files);

      this.eventEmitter.emit(`file.finish.${reqId}`, savedFile);
      this.eventEmitter.emit(`file.error.${reqId}`, null);
    } catch (error) {
      this.eventEmitter.emit(`file.error.${reqId}`, error);
    }
  }

  async findAll(query: PaginateQuery) {
    return await this.fileRepository.findMany({ ...query, params: { orderBy: { createdAt: 'desc' } } });
  }

  async findAllType(query: PaginateQuery, type: string) {
    return await this.fileRepository.findMany({
      ...query,
      params: { where: { type: type as $Enums.FileTypes }, orderBy: { createdAt: 'desc' } },
    });
  }

  async delete({ files }: FilesDeleteDto) {
    try {
      const data = await this.fileRepository.delete(files.map((file) => file.id));

      files.forEach(async (file) => {
        await unlink(join(process.cwd(), `${file.url}`));
      });

      return data;
    } catch (error) {
      throw new HttpException(`Произошла ошибка: ${error.message}`, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
