import { FileTypes } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(FileTypes)
  readonly type: FileTypes;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly originalName: string;

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly extention: string;

  @IsNotEmpty()
  @IsString()
  readonly size: string;
}
