import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SupportMailCountDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
