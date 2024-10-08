import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findMany() {
    return await this.accountService.findMany();
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
    return await this.accountService.findById(uuid);
  }
}
