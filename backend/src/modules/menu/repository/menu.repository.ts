import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuRepository extends BasePostgresRepository<'Menu'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'menu', [], ['createdAt', 'updatedAt']);
  }
}
