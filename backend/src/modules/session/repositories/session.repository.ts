import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionRepository extends BasePostgresRepository<'Session'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'session');
  }
}
