import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SupportMailDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id: string;
}
