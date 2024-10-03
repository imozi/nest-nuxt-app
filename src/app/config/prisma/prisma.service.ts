import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info('👌 Подключение к базе данных прошло успешно', PrismaService.name);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
