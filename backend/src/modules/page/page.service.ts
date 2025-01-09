import { Injectable } from '@nestjs/common';
import { PageRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { PageDeleteDto, PageDto } from './dto';

@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async findAll(query: PaginateQuery) {
    return await this.pageRepository.findMany({
      ...query,
      params: { include: { menuItem: { select: { name: true } } }, orderBy: { createdAt: 'desc' } },
    });
  }

  async findBySlug(slug: string) {
    return await this.pageRepository.findUnique({ where: { slug } });
  }

  async create(data: PageDto) {
    return await this.pageRepository.create({
      ...data,
      menuItem: {
        connect: { id: data.menuItem },
      },
    });
  }

  async update(data: PageDto) {
    return await this.pageRepository.create({
      ...data,
      menuItem: {
        connect: { id: data.menuItem },
      },
    });
  }

  async delete({ id }: PageDeleteDto) {
    return await this.pageRepository.delete([id]);
  }
}
