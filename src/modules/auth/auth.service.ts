import { ConfigService } from '@/app/common';
import { JWTService } from '@/app/common/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { AccountService } from '../account';
import { SessionService } from '../session';
import { TokenRepository } from './repositories/token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JWTService,
    private readonly config: ConfigService,
    private readonly tokenRepository: TokenRepository,
    private readonly accountService: AccountService,
    private readonly sessionService: SessionService,
  ) {}

  private async getTokens(accountId: string) {
    const uuid = randomUUID();
    const hashedUuid = await bcrypt.hash(uuid, this.config.get('CRYPT_SALT'));

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwt.generateAccessToken({ sub: accountId }),
      await this.jwt.generateRefreshToken({ sub: accountId, jti: uuid }),
    ]);

    const session = await this.sessionService.findUnique(accountId);

    if (!session) {
      await this.sessionService.create(accountId);
    }

    const token = await this.tokenRepository.create({ hash: hashedUuid });
    await this.sessionService.update(session.id, token.id);

    return { accessToken, refreshToken };
  }

  async singIn(req: Request, { username, password }: AuthDto) {
    const account = await this.accountService.findByEmailOrShortcut(username);

    if (!account) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const uncrypt = await bcrypt.compare(password, account.hash);

    if (!uncrypt) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return await this.getTokens(account.id);
  }

  async signOut() {}

  async refresh(req: Request) {
    const { sub, jwi } = req.user as any;
    const hashedSub = await bcrypt.hash(jwi, this.config.get('CRYPT_SALT'));

    const session = await this.sessionService.findById(token.sub);
    const token = await this.tokenRepository.findFirst({ where: { hash: hashedSub } });

    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.tokenRepository.delete([token.id]);

    return await this.getTokens(session.accountId);
  }
}
