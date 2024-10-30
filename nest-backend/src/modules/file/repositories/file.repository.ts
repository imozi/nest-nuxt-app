import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository extends BasePostgresRepository<'File'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'file');
  }
}
