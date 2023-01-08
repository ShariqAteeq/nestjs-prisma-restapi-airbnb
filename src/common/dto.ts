import { Role } from './constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsEnum } from 'class-validator';

export class SignUpDto {
  @IsDefined()
  @ApiProperty()
  fullname: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsDefined()
  role: Role;
}

export class LoginDto {
  @IsDefined()
  email: string;
  @IsDefined()
  password: string;
}
