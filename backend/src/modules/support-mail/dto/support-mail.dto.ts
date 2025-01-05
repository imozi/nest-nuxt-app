import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SupportMailDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsNotEmpty()
  @IsString()
  readonly organization: string;

  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @IsNotEmpty()
  @IsString()
  readonly remoteId: string;
}
