import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

export class MaterialResources {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly text: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export class MaterialDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly slug: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MaterialResources)
  readonly resources: MaterialResources[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly tags: string[];

  @IsNotEmpty()
  @IsBoolean()
  readonly isPublished: boolean;

  @IsOptional()
  @IsUUID()
  readonly menuItem: string;

  @IsOptional()
  @IsUUID()
  readonly page: string;
}
