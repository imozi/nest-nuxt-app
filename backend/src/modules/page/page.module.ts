import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageRepository } from './repository';

@Module({
  controllers: [PageController],
  providers: [PageService, PageRepository],
})
export class PageModule {}
