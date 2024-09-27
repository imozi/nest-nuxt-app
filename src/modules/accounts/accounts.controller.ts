import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from '@/app/config/logger';

export interface ExtendExpressMulterFile extends Omit<Express.Multer.File, 'size'> {
  size: number | { size: number; name: string };
}

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger: LoggerService,
  ) {}

  @OnEvent('file.uploaded')
  async fileLog(files) {
    this.logger.info(JSON.stringify(files));
    return files;
  }

  @Get()
  async findAll() {
    const promise = new Promise((res) => {
      setTimeout(() => {
        const arr = new Array(100)
          .fill(0)
          .map((_, i) => i * 2)
          .join(',');

        res(arr);
      }, 10000);
    });

    return await promise;
  }

  @Get('prisma')
  async findTest() {
    return this.accountsService.findTest();
  }

  @Post()
  @HttpCode(200)
  async createAll(@Body() data) {
    return data;
  }
}
