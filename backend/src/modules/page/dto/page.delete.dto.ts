import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PageDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;
}
