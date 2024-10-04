import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountsModule } from '@/modules/accounts/accounts.module';

@Module({
  imports: [CommonModule, AccountsModule],
})
export class AppModule {}
