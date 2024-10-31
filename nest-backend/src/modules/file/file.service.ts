import { Injectable } from '@nestjs/common';
import { FileRepository } from './repositories';
import { PaginateQuery } from '@/shared/core/types';
import { $Enums } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('file.uploaded')
  async create(files) {
    new Promise((res, rej) => {
      setTimeout(() => {
        res('');
      }, 2000);
    });

    this.eventEmitter.emit('file.finish', files);
  }

  async findAll(query: PaginateQuery) {
    return await this.fileRepository.findMany(query);
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
