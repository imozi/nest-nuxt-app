import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class MenuDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
