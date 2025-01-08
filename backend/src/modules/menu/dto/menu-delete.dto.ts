import { IsString, IsUUID } from 'class-validator';

export class MenuDeleteDto {
  @IsString()
  @IsUUID()
  readonly id: string;
}
