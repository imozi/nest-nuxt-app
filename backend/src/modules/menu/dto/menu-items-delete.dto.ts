import { IsString, IsUUID } from 'class-validator';

export class MenuItemsDeleteDto {
  @IsString()
  @IsUUID()
  readonly id: string;
}
