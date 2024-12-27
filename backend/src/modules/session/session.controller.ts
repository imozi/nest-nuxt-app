import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAccessGuard, RolesGuard } from '@/guards';
import { RequestWithAccessTokenPayload } from '@/shared/core/interfaces';
import { Roles } from '@/decorators';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return this.sessionService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAccessGuard)
  async findByIdWithUser(@Req() { user }: RequestWithAccessTokenPayload) {
    return await this.sessionService.findUnique(user.sub);
  }
}
