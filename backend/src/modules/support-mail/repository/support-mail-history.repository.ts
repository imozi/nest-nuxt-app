import { PrismaService } from '@/app/common';

import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportMailHistoryRepository extends BasePostgresRepository<'SupportMailHistory'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'supportMailHistory', ['email', 'name', 'organization']);
  }

  async getTotal() {
    return await this.prisma.supportMail.count();
  }
}
