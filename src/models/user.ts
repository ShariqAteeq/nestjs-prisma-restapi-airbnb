import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty({ nullable: true })
  name: string;
  @ApiProperty()
  email: string;
}
