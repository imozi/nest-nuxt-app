import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './repository';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository],
})
export class TagModule {}
