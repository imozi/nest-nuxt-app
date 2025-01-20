import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewsRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { NewsDeleteDto, NewsDto } from './dto';
import { MenuService } from '../menu';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly menuService: MenuService,
  ) {}

  async findAll(query: PaginateQuery) {
    return await this.newsRepository.findMany({
      ...query,
      params: { include: { tags: true }, orderBy: { createdAt: 'desc' } },
    });
  }

  async findBySlug(slug: string) {
    return await this.newsRepository.findUnique({ where: { slug }, include: { tags: true } });
  }

  async create(data: NewsDto) {
    const isUnique = await this.newsRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique) {
      throw new HttpException('Новость с таким алиасом существует, измените алиас', HttpStatus.CONFLICT);
    }

    const idNewsMenuItem = await this.menuService.findMenuItemBySlug('news');

    return await this.newsRepository.create({
      ...data,
      menuItem: {
        connect: { id: idNewsMenuItem?.id },
      },
      tags: data.tags.length
        ? {
            connect: data.tags.map((id) => ({ id })),
          }
        : undefined,
    });
  }

  async update(data: NewsDto) {
    const isUnique = await this.newsRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique && isUnique.id !== data.id) {
      throw new HttpException('Новость с таким алиасом существует, измените алиас', HttpStatus.CONFLICT);
    }

    return await this.newsRepository.update({
      ...data,
      tags: data.tags.length
        ? {
            set: data.tags.map((id) => ({ id })),
          }
        : undefined,
    });
  }

  async delete({ id }: NewsDeleteDto) {
    return await this.newsRepository.delete([id]);
  }
}
