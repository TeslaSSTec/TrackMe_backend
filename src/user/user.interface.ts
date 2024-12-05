import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export interface IJWTPayload {
  type: 'Auth' | 'Subscribe' | 'Unauth';
  id: string;
  login: string;
}

export type UserDataDTO = Omit<IJWTPayload, 'type'>;

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(1, 30)
  login: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(8, 30)
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  oldPassword: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  newPassword: string;
}

export class DeleteAccountDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}