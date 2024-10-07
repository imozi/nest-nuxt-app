import { ConfigService } from '@/app/common';
import { JWTService } from '@/app/common/jwt';
import { encryptData } from '@/shared/helpers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JWTService,
    private readonly config: ConfigService,
  ) {}

  async singIn() {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwt.generateAccessToken({ sub: 'Access' }),
      await this.jwt.generateRefreshToken({ sub: 'Refresh' }),
    ]);

    const cryptRefresh = await encryptData(refreshToken, this.config.get('JWT_CRYPT_KEY'));

    return { accessToken, refreshToken: cryptRefresh };
  }

  async signOut() {}

  async refresh() {}
}
