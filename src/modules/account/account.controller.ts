import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAccessGuard } from '@/guards';
import { RequestWithTokenPayload } from '@/shared/core/interfaces';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findMany() {
    return await this.accountService.findMany();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async findUnique(@Req() { user }: RequestWithTokenPayload) {
    return await this.accountService.findById(user.sub);
  }
}
