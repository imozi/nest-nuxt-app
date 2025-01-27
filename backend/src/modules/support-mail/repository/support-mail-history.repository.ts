import { PrismaService } from '@/app/common';

import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportMailHistoryRepository extends BasePostgresRepository<'SupportMailHistory'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'supportMailHistory', ['email', 'name', 'organization']);
  }

  async getTotal() {
    return await this.prisma.supportMailHistory.count();
  }

  async getTotalNew(email: string) {
    return this.prisma.supportMailHistory.count({
      where: {
        email,
        status: {
          not: 'closed',
        },
      },
    });
  }
}
