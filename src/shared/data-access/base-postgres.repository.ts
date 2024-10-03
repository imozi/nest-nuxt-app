import { PrismaService } from '@/app/config';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../core/interfaces/base-repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ReturnTypeMeta } from '../core/types';

const MAX_DEFAULT_LIMIT = 50;
const INIT_PAGE = 1;

export abstract class BasePostgresRepository<T extends Prisma.ModelName> implements BaseRepository {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: Lowercase<T>,
    protected readonly searchFields?: (keyof Prisma.TypeMap['model'][T]['fields'])[],
  ) {}

  async findMany(options?: {
    page?: number;
    perPage?: number;
    search?: string;
    params?: Prisma.TypeMap['model'][T]['operations']['findMany']['args'];
  }): Promise<ReturnTypeMeta<Prisma.TypeMap['model'][T]['operations']['findMany']['result']>> {
    const page = options ? options.page : INIT_PAGE;
    const take = options ? options.perPage : MAX_DEFAULT_LIMIT;

    const skip = page > 0 ? take * (page - 1) : 0;

    const noSearchFn = async () => {
      const [total, data] = await this.prisma.$transaction([
        (this.prisma[this.model] as any).count(options && options.params),
        (this.prisma[this.model] as any).findMany(options && { ...options.params, take, skip }),
      ]);

      return {
        total,
        data,
      };
    };

    const serachFn = async () => {
      const whereConditions = this.searchFields.reduce(
        (acc, column) => {
          acc.OR.push({
            [column]: {
              contains: options.search,
              mode: 'insensitive',
            },
          });
          return acc;
        },
        {
          ...options.params?.where,
          OR: [],
        } as Record<string, any>,
      );

      const [total, data] = await this.prisma.$transaction([
        (this.prisma[this.model] as any).count({
          where: whereConditions,
        }),
        (this.prisma[this.model] as any).findMany({
          where: whereConditions,
          ...options.params,
          take,
          skip,
        }),
      ]);

      return {
        total,
        data,
      };
    };

    try {
      const { total, data } = options?.search ? await serachFn() : await noSearchFn();

      const lastPage = Math.ceil(total / take);
      const prev = page > 1 ? page - 1 : null;
      const next = page < lastPage ? page + 1 : null;

      return {
        data: data,
        meta: {
          total,
          currentPage: page,
          lastPage,
          perPage: take,
          prev,
          next,
        },
      };
    } catch (error) {
      throw new HttpException(`Ошибка при выполнении запроса: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findUnique(options: Prisma.TypeMap['model'][T]['operations']['findMany']['args']) {
    return await (this.prisma[this.model] as any).findUnique(options);
  }

  async findById(id: Prisma.TypeMap['model'][T]['payload']['scalars']['id']) {
    return await (this.prisma[this.model] as any).findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.TypeMap['model'][T]['operations']['create']['args']['data']) {
    return (this.prisma[this.model] as any).create({ data });
  }

  async update(data: Prisma.TypeMap['model'][T]['operations']['update']['args']['data']) {
    return (this.prisma[this.model] as any).update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(idList: Prisma.TypeMap['model'][T]['payload']['scalars']['id'][]) {
    const deleted = await (this.prisma[this.model] as any).deleteMany({
      where: {
        id: {
          in: idList.map((id) => ({ id })),
        },
      },
    });

    return deleted;
  }
}
