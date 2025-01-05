import { IsNotEmpty, IsString, IsOptional, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class MenuItemDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly menu: string[];
}
