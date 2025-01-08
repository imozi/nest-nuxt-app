import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDeleteDto, MenuDto, MenuItemDto } from './dto';
import { PaginateQuery } from '@/shared/core/types';
import { JwtAccessGuard, RolesGuard } from '@/guards';
import { Roles } from '@/decorators';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @UseGuards(JwtAccessGuard)
  async findMenuAll(query: PaginateQuery) {
    return await this.menuService.findMenuAll(query);
  }

  @Post()
  @UseGuards(JwtAccessGuard)
  async createMenu(@Body() data: MenuDto) {
    return await this.menuService.createMenu(data);
  }

  @Post('items')
  @UseGuards(JwtAccessGuard)
  async createMenuItem(@Body() data: MenuItemDto) {
    return await this.menuService.createMenuItem(data);
  }

  @Delete()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles('admin')
  async deleteMenu(@Body() data: MenuDeleteDto) {
    return await this.menuService.deleteMenu(data);
  }
}
