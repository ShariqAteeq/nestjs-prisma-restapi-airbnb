import { UsersService } from 'src/api/services/user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators';
import { AddRoomDto } from 'src/common/dto';
import { RoomService } from '../services/room.service';
import { Room } from '@prisma/client';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  async addRoom(@Body() addRoomDto: AddRoomDto): Promise<Room> {
    return await this.roomService.addRoom(addRoomDto);
  }
}
