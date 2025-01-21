import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaterialRepository extends BasePostgresRepository<'Material'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'material', ['slug', 'name'], ['menuItemId', 'pageId', 'createdAt', 'updatedAt']);
  }

  async getTotal() {
    return await this.prisma.material.count();
  }
}
