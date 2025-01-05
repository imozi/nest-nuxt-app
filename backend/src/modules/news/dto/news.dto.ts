import { IsNotEmpty, IsString, IsBoolean, IsArray, IsOptional, IsUUID } from 'class-validator';

export class NewsDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isPublished: boolean;
}
