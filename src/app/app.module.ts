import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountsModule } from '@/modules/accounts/accounts.module';
import { AuthModule } from '@/modules/auth';
import { DecryptTokenMiddleware } from '@/middleware/decrypt-token.middleware';

@Module({
  imports: [CommonModule, AccountsModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptTokenMiddleware).forRoutes({ path: 'auth/refresh', method: RequestMethod.POST });
  }
}
