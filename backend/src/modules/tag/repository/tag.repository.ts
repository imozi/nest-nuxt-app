import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends BasePostgresRepository<'Tag'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'tag');
  }
}
