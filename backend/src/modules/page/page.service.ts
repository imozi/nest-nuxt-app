import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const isUnique = await this.pageRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique) {
      throw new HttpException('Страница с таким алиасом существует, измените алиас', HttpStatus.CONFLICT);
    }

    return await this.pageRepository.create({
      ...data,
      menuItem: {
        connect: { id: data.menuItem },
      },
    });
  }

  async update(data: PageDto) {
    const isUnique = await this.pageRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique && isUnique.id !== data.id) {
      throw new HttpException('Страница с таким алиасом существует, измените алиас', HttpStatus.CONFLICT);
    }

    return await this.pageRepository.update({
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
