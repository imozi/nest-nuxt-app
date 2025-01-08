import { Injectable } from '@nestjs/common';
import { MenuRepository, MenuItemRepository } from './repository';
import { MenuDeleteDto, MenuDto, MenuItemDto } from './dto';
import { PaginateQuery } from '@/shared/core/types';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly menuItemRepository: MenuItemRepository,
  ) {}

  private _includeChildren(maximumLevel = 1) {
    if (maximumLevel === 1) {
      return {
        children: {
          include: {
            pages: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      };
    }

    return {
      include: {
        children: this._includeChildren(maximumLevel - 1),
      },
    };
  }

  async findMenuAll(query: PaginateQuery) {
    return await this.menuRepository.findMany({
      ...query,
      params: {
        select: { ...this.menuRepository.selectedField(), ...this._includeChildren() },
        orderBy: { createdAt: 'asc' },
      },
    });
  }

  async findMenuItemBySlug(slug: string) {
    return await this.menuItemRepository.findFirst({ where: { slug } });
  }

  async createMenu(data: MenuDto) {
    return await this.menuRepository.create(data);
  }

  async createMenuItem(data: MenuItemDto) {
    const maxOrder = await this.menuItemRepository.aggregate({
      _max: { order: true },
    });

    return await this.menuItemRepository.create({
      ...data,
      menu: {
        connect: data.menu.map((item) => ({ id: item })),
      },
      order: maxOrder._max.order + 1,
    });
  }

  async deleteMenu({ id }: MenuDeleteDto) {
    return await this.menuRepository.delete([id]);
  }
}
