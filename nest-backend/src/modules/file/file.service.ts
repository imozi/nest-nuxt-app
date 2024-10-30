import { Injectable } from '@nestjs/common';
import { FileRepository } from './repositories';

@Injectable()
export class FileService {
  constructor(private readonly sessionRepository: FileRepository) {}

  async findAll() {
    return await this.sessionRepository.findMany();
  }

  async delete(fileId: string) {
    return await this.sessionRepository.delete([fileId]);
  }
}
