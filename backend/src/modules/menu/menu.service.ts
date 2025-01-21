import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MenuRepository, MenuItemRepository } from './repository';
import { MenuDeleteDto, MenuDto, MenuItemDto, MenuItemsDeleteDto } from './dto';
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
            menu: {
              select: {
                id: true,
                name: true,
              },
            },
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

  async findMenuItemsAll(query: PaginateQuery) {
    return await this.menuItemRepository.findMany({
      ...query,
      params: {
        orderBy: {
          order: 'asc',
        },
      },
    });
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
    const isUnique = await this.menuRepository.findUnique({
      where: {
        name: data.name,
      },
    });

    if (isUnique) {
      throw new HttpException('Меню с таким именем существует, измените имя', HttpStatus.CONFLICT);
    }

    return await this.menuRepository.create(data);
  }

  async createMenuItem(data: MenuItemDto) {
    const isUnique = await this.menuItemRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique) {
      throw new HttpException('Пункт меню с таким алиасом существует, измените алиас', HttpStatus.CONFLICT);
    }

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

  async updateMenuItem(data: MenuItemDto) {
    const isUnique = await this.menuItemRepository.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isUnique && isUnique.id !== data.id) {
      throw new HttpException('Тег с таким именем существует, измените имя тега', HttpStatus.CONFLICT);
    }

    return await this.menuItemRepository.update({
      ...data,
      menu: {
        set: data.menu.map((item) => ({ id: item })),
      },
    });
  }

  async deleteMenu({ id }: MenuDeleteDto) {
    return await this.menuRepository.delete([id]);
  }

  async deleteMenuItems({ id }: MenuItemsDeleteDto) {
    return await this.menuItemRepository.delete([id]);
  }
}
