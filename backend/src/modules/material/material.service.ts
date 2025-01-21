import { Injectable } from '@nestjs/common';
import { MaterialRepository } from './repository';
import { PaginateQuery } from '@/shared/core/types';
import { MaterialDto } from './dto/material.dto';
import { Prisma } from '@prisma/client';
import { MaterialDeleteDto } from './dto';
import { validateUuid } from '@/shared/helpers';

@Injectable()
export class MaterialService {
  constructor(private readonly materialRepository: MaterialRepository) {}

  async findAll(query: PaginateQuery) {
    return await this.materialRepository.findMany({
      ...query,
      params: {
        select: { ...this.materialRepository.selectedField(), menuItem: true, page: true, tags: true },
        orderBy: {
          createdAt: 'desc',
        },
      },
    });
  }

  async findBySlugOrId(slugOrId: string) {
    const valid = validateUuid(slugOrId);

    if (valid) {
      return await this.materialRepository.findFirst({ where: { id: slugOrId }, include: { tags: true } });
    } else {
      return await this.materialRepository.findFirst({ where: { slug: slugOrId }, include: { tags: true } });
    }
  }

  async create(data: MaterialDto) {
    return this.materialRepository.create({
      ...data,
      resources: data.resources as unknown as Prisma.JsonValue,
      menuItem: data.menuItem
        ? {
            connect: { id: data.menuItem },
          }
        : undefined,
      page: data.page
        ? {
            connect: { id: data.page },
          }
        : undefined,
      tags: data.tags.length
        ? {
            connect: data.tags.map((id) => ({ id })),
          }
        : undefined,
    });
  }

  async update(data: MaterialDto) {
    return this.materialRepository.update({
      ...data,
      resources: data.resources as unknown as Prisma.JsonValue,
      menuItem: data.menuItem
        ? {
            connect: { id: data.menuItem },
          }
        : undefined,
      page: data.page
        ? {
            connect: { id: data.page },
          }
        : undefined,
      tags: data.tags.length
        ? {
            set: data.tags.map((id) => ({ id })),
          }
        : undefined,
    });
  }

  async delete({ id }: MaterialDeleteDto) {
    return await this.materialRepository.delete([id]);
  }

  async getTotal() {
    return await this.materialRepository.getTotal();
  }
}
