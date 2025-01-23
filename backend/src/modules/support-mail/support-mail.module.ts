import { Module } from '@nestjs/common';
import { SupportMailController } from './support-mail.controller';
import { SupportMailService } from './support-mail.service';
import { SupportMailHistoryRepository, SupportMailRepository } from './repository';

@Module({
  controllers: [SupportMailController],
  providers: [SupportMailService, SupportMailRepository, SupportMailHistoryRepository],
})
export class SupportMailModule {}
