import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsRepository extends BasePostgresRepository<'News'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'news', ['slug', 'title']);
  }
}
