import { $Enums } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';

export class SupportMailUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum($Enums.SupportStatus)
  readonly status: $Enums.SupportStatus;
}
