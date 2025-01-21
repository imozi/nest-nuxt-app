import { Injectable } from '@nestjs/common';
import { SupportMailRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { SupportMailDto, SupportMailUpdateDto } from './dto';

@Injectable()
export class SupportMailService {
  constructor(private readonly supportMailRepository: SupportMailRepository) {}

  async findAll(query: PaginateQuery) {
    return await this.supportMailRepository.findMany({ ...query, params: { orderBy: { createdAt: 'desc' } } });
  }

  async create(data: SupportMailDto) {
    return await this.supportMailRepository.create(data);
  }

  async update(data: SupportMailUpdateDto) {
    return await this.supportMailRepository.update(data);
  }

  async getTotal() {
    return await this.supportMailRepository.getTotal();
  }
}
