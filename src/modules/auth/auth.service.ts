import { ConfigService } from '@/app/common';
import { JWTService } from '@/app/common/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AuthDto } from './dto';
import { AccountService } from '../account';
import { SessionService } from '../session';
import { SessionTokenRepository } from './repositories';
import { decryptData, encryptData, getExpiryDay } from '@/shared/helpers';
import { DeviceInfo } from '@/shared/core/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly cryptKey: string;
  private readonly cryptSalt: string;
  private readonly refreshDeviceExpiry: string;

  constructor(
    private readonly jwt: JWTService,
    private readonly config: ConfigService,
    private readonly sessionTokenRepository: SessionTokenRepository,
    private readonly accountService: AccountService,
    private readonly sessionService: SessionService,
  ) {
    this.cryptKey = this.config.get('CRYPT_KEY');
    this.cryptSalt = this.config.get('CRYPT_SALT');
    this.refreshDeviceExpiry = this.config.get('JWT_REFRESH_TOKEN_AND_DEVICE_KEY_EXPIRES_IN');
  }

  private async generateAccessToken(accountId: string): Promise<string> {
    return await this.jwt.generateAccessToken({ sub: accountId });
  }

  private async generateRefreshToken(accountId: string, sessionId: string): Promise<string> {
    return await this.jwt.generateRefreshToken({ sub: accountId, sid: sessionId });
  }

  private async saveSessionToken(deviceId: string, refreshToken: string, meta: DeviceInfo): Promise<string> {
    const hash = await bcrypt.hash(refreshToken, this.cryptSalt);
    const expiresAt = getExpiryDay(this.refreshDeviceExpiry);
    const token = await this.sessionTokenRepository.create({ deviceId, hash, meta, expiresAt });
    return token.id;
  }

  private async getTokens(accountId: string, meta: DeviceInfo) {
    const deviceId = randomUUID();
    const encryptedDeviceId = await encryptData(deviceId, this.cryptKey);
    let session = await this.sessionService.findUnique(accountId);

    if (!session) {
      session = await this.sessionService.create(accountId);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(accountId),
      this.generateRefreshToken(accountId, session.id),
    ]);

    const tokenId = await this.saveSessionToken(deviceId, refreshToken, meta);
    await this.sessionService.update(session.id, tokenId);

    return { accessToken, refreshToken, deviceId: encryptedDeviceId };
  }

  private async validateSessionToken(encryptedDeviceId: string, token: string): Promise<void> {
    const decryptDeviceID = await decryptData(encryptedDeviceId, this.cryptKey);
    const sessionToken = await this.sessionTokenRepository.findUnique({ where: { deviceId: decryptDeviceID } });

    if (!sessionToken) {
      throw new UnauthorizedException('Invalid device ID');
    }

    const isCompareToken = await bcrypt.compare(token, sessionToken.hash);
    if (!isCompareToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.sessionTokenRepository.delete([sessionToken.id]);
  }

  async singIn({ username, password }: AuthDto, meta: DeviceInfo) {
    const account = await this.accountService.findByEmailOrShortcut(username);

    if (!account) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isComparePassword = await bcrypt.compare(password, account.hash);

    if (!isComparePassword) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return await this.getTokens(account.id, meta);
  }

  async signOut(encryptedDeviceId: string) {
    const decryptDeviceID = await decryptData(encryptedDeviceId, this.config.get('CRYPT_KEY'));
    const sessionToken = await this.sessionTokenRepository.findUnique({ where: { deviceId: decryptDeviceID } });

    return await this.sessionTokenRepository.delete([sessionToken.id]);
  }

  async signOutAll(sessionId: string) {
    return await this.sessionService.delete(sessionId);
  }

  async refresh(encryptedDeviceId: string, token: string, accountId: string, meta: DeviceInfo) {
    await this.validateSessionToken(encryptedDeviceId, token);
    return await this.getTokens(accountId, meta);
  }
}
