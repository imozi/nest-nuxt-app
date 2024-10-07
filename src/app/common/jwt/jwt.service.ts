import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, RefresTokenPayload } from '@/shared/core/interfaces';

@Injectable()
export class JWTService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async generateAccessToken(payload: AccessTokenPayload) {
    return await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  async generateRefreshToken(payload: RefresTokenPayload) {
    return await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
  }
}
