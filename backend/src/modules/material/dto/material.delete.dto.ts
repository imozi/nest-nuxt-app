import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MaterialDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;
}
