import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findMany() {
    return await this.accountsService.findMany();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param(
      'uuid',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    uuid: string,
  ) {
    return await this.accountsService.findById(uuid);
  }
}
