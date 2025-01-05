import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepository, MenuItemRepository } from './repository';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, MenuItemRepository],
  exports: [MenuService],
})
export class MenuModule {}
