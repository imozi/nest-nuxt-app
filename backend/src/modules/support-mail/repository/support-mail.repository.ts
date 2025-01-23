import { PrismaService } from '@/app/common';

import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportMailRepository extends BasePostgresRepository<'SupportMail'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'supportMail', ['email', 'name', 'organization']);
  }

  async getTotal() {
    return await this.prisma.supportMail.count();
  }
}
