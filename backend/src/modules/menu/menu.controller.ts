import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDeleteDto, MenuDto, MenuItemDto, MenuItemsDeleteDto } from './dto';
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

  @Get('items')
  @UseGuards(JwtAccessGuard)
  async findMenuItemsAll(query: PaginateQuery) {
    return await this.menuService.findMenuItemsAll(query);
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

  @Delete('items')
  @UseGuards(JwtAccessGuard)
  async deleteMenuItem(@Body() data: MenuItemsDeleteDto) {
    return await this.menuService.deleteMenuItems(data);
  }

  @Patch('items')
  @UseGuards(JwtAccessGuard)
  async updateMenuItem(@Body() data: MenuItemDto) {
    return await this.menuService.updateMenuItem(data);
  }
}
