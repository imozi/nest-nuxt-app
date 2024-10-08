import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../account';
import { SessionModule } from '../session';
import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [AccountModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, TokenRepository],
})
export class AuthModule {}
