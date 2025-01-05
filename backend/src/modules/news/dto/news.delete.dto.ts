import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class NewsDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;
}
