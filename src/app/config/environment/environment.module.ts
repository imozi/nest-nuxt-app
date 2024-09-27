import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service.js';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironment } from './configuration.js';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => validateEnvironment(config),
    }),
  ],
  controllers: [],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
