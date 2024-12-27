import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

export class FileDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly url: string;
}

export class FilesDeleteDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDeleteDto)
  files: FileDeleteDto[];
}
