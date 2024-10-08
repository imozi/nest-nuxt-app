import { ConfigService } from '@/app/common';
import { JWTService } from '@/app/common/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { AccountService } from '../account';
import { SessionService } from '../session';
import { SessionTokenRepository } from './repositories/session-token.repository';
import { decryptData, encryptData } from '@/shared/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JWTService,
    private readonly config: ConfigService,
    private readonly sessionTokenRepository: SessionTokenRepository,
    private readonly accountService: AccountService,
    private readonly sessionService: SessionService,
  ) {}

  private async getTokens(accountId: string) {
    const deviceId = randomUUID();
    const encryptedDeviceId = await encryptData(deviceId, this.config.get('CRYPT_KEY'));

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwt.generateAccessToken({ sub: accountId }),
      await this.jwt.generateRefreshToken({ sub: accountId }),
    ]);

    const hashedToken = await bcrypt.hash(refreshToken, this.config.get('CRYPT_SALT'));

    const session = await this.sessionService.findUnique(accountId);

    if (!session) {
      await this.sessionService.create(accountId);
    }

    const token = await this.sessionTokenRepository.create({ deviceId, hash: hashedToken });
    await this.sessionService.update(session.id, token.id);

    return { accessToken, refreshToken, deviceId: encryptedDeviceId };
  }

  async singIn(req: Request, { username, password }: AuthDto) {
    const account = await this.accountService.findByEmailOrShortcut(username);

    if (!account) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isComparePassword = await bcrypt.compare(password, account.hash);

    if (!isComparePassword) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return await this.getTokens(account.id);
  }

  async signOut() {}

  async refresh(encryptedDeviceId: string, token: string) {
    const decryptDeviceID = await decryptData(encryptedDeviceId, this.config.get('CRYPT_KEY'));
    const sessionToken = await this.sessionTokenRepository.findUnique({ where: { deviceId: decryptDeviceID } });

    console.log(await bcrypt.compare(token, sessionToken.hash));

    return sessionToken;
  }
}
