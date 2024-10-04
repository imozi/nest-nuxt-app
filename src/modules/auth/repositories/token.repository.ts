import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository extends BasePostgresRepository<'Token'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'token');
  }
}
