import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from '@/guards/jwt-refresh.guard';
import { CookieInterceptor } from '@/interceptors/cookie.interceptor';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseInterceptors(CookieInterceptor)
  async signIn(@Req() req: Request, @Body() data: AuthDto) {
    return await this.authService.singIn(req, data);
  }

  @Post('signout')
  async signOut() {
    return await this.authService.signOut();
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request) {
    return await this.authService.refresh(req);
  }
}
