import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { AccountsModule } from '@/modules/accounts/accounts.module';

@Module({
  imports: [ConfigModule, AccountsModule],
})
export class AppModule {}
