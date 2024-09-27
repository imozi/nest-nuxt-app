import { PrismaService } from '@/app/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findTest() {
    return await this.prisma.account.findMany();
  }
}
