import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from '@/guards/jwt-refresh.guard';
import { CookieInterceptor } from '@/interceptors/cookie.interceptor';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@/app/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

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
    const encryptedDeviceId = req.cookies[this.config.get('COOKIE_DEVICE_KEY')];
    const token = req.cookies[this.config.get('JWT_REFRESH_TOKEN_COOKIE_KEY')];

    return await this.authService.refresh(encryptedDeviceId, token);
  }
}
