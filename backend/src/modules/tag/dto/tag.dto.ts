import { IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
