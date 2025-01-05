import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TagUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
