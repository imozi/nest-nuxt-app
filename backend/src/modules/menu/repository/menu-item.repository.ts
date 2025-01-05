import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuItemRepository extends BasePostgresRepository<'MenuItem'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'menuItem');
  }
}
