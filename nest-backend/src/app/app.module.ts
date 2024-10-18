import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountModule } from '@/modules/account';
import { AuthModule } from '@/modules/auth';
import { SessionModule } from '@/modules/session';

@Module({
  imports: [CommonModule, AccountModule, AuthModule, SessionModule],
})
export class AppModule {}
