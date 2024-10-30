import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountModule } from '@/modules/account';
import { AuthModule } from '@/modules/auth';
import { SessionModule } from '@/modules/session';
import { FileModule } from '@/modules/file';

@Module({
  imports: [CommonModule, AccountModule, AuthModule, SessionModule, FileModule],
})
export class AppModule {}
