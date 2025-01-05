import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class PageDto {
  @IsOptional()
  @IsUUID()
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

  @IsString()
  @IsOptional()
  readonly text: string;

  @IsNotEmpty()
  @IsUUID()
  readonly menuItem: string;
}
