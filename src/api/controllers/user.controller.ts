import { UsersService } from 'src/api/services/user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(+id);
  }
}
