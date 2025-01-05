import { Module } from '@nestjs/common';
import { SupportMailController } from './support-mail.controller';
import { SupportMailService } from './support-mail.service';
import { SupportMailRepository } from './repository';

@Module({
  controllers: [SupportMailController],
  providers: [SupportMailService, SupportMailRepository],
})
export class SupportMailModule {}
