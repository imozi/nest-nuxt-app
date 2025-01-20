import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PageRepository extends BasePostgresRepository<'Page'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'page', ['name', 'slug'], ['createdAt', 'updatedAt', 'menuItemId']);
  }
}
