import { Injectable } from '@nestjs/common';
import { FileRepository } from './repositories';
import { PaginateQuery } from '@/shared/core/types';
import { $Enums } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
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
    const savedFile = await this.fileRepository.createMany(files);
    this.eventEmitter.emit(`file.finish.${reqId}`, savedFile);
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

  async delete(fileId: string) {
    return await this.fileRepository.delete([fileId]);
  }
}
