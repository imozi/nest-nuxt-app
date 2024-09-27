import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma';
import { EnvironmentModule, EnvironmentService } from './environment';
import { LoggerModule } from './logger';
import { UploadModule } from './upload';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRootAsync({
      inject: [EnvironmentService],
      useFactory: async (environments: EnvironmentService) => {
        const storagePath = environments.get('STORAGE_PATH');

        return [
          {
            rootPath: join(process.cwd(), storagePath),
            exclude: ['/api/(.*)'],
            serveRoot: storagePath,
          },
        ];
      },
    }),
    LoggerModule,
    PrismaModule,
    EnvironmentModule,
    UploadModule,
  ],
})
export class ConfigModule {}
