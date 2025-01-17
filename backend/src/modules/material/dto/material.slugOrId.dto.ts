import { IsNotEmpty, IsString } from 'class-validator';

export class MaterialSlugOrIdDto {
  @IsNotEmpty()
  @IsString()
  readonly slugOrId: string;
}
