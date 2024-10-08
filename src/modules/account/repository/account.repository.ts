import { PrismaService } from '@/app/common';
import { BasePostgresRepository } from '@/shared/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends BasePostgresRepository<'Account'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'account');
  }

  async findByEmailOrShortcut(emailOrShortcut: string) {
    return await this.prisma.account.findFirst({
      where: {
        OR: [
          {
            shortcut: emailOrShortcut,
          },
          {
            email: emailOrShortcut,
          },
        ],
      },
    });
  }
}
