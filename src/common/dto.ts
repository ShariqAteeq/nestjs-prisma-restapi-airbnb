import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @ApiProperty()
  password: string;
}
