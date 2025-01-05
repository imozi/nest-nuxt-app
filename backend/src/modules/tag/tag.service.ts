import { Injectable } from '@nestjs/common';
import { TagRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { TagDeleteDto, TagDto, TagUpdateDto } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findAll(query: PaginateQuery) {
    return await this.tagRepository.findMany({ ...query, params: { orderBy: { name: 'asc' } } });
  }

  async create(data: TagDto) {
    return await this.tagRepository.create(data);
  }

  async update(data: TagUpdateDto) {
    return await this.tagRepository.update(data);
  }

  async delete(data: TagDeleteDto) {
    return await this.tagRepository.delete([data.id]);
  }
}
