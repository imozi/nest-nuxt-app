import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from '@/guards/jwt-refresh.guard';
import { CookieInterceptor } from '@/interceptors/cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseInterceptors(CookieInterceptor)
  async signIn() {
    return await this.authService.singIn();
  }

  @Post('signout')
  async signOut() {
    return await this.authService.signOut();
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh() {
    return await this.authService.refresh();
  }
}
