import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TagDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;
}
