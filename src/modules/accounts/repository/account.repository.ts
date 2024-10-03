import { PrismaService } from '@/app/config';
import { BasePostgresRepository } from '@/shared/data-access/base-postgres.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends BasePostgresRepository<'Account'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'account');
  }
}
