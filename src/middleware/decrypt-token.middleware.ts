import { ConfigService } from '@/app/common';
import { decryptData } from '@/shared/helpers';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DecryptTokenMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies?.[this.config.get('JWT_REFRESH_TOKEN_COOKIE_KEY')];

    if (token) {
      const decryptToken = await decryptData(token, this.config.get('JWT_CRYPT_KEY'));
      request.cookies[this.config.get('JWT_REFRESH_TOKEN_COOKIE_KEY')] = decryptToken;
    }

    next();
  }
}
