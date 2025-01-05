import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './repository';
import { MenuModule } from '../menu';

@Module({
  imports: [MenuModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
