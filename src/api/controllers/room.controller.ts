import { UsersService } from 'src/api/services/user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post, Req, UseGuards } from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators';
import { AddRoomDto } from 'src/common/dto';
import { RoomService } from '../services/room.service';
import { Room } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-room')
  async addRoom(@Body() addRoomDto: AddRoomDto, @Req() req): Promise<Room> {
    return await this.roomService.addRoom(addRoomDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-rooms')
  async listMyRooms(@Req() req): Promise<Room[]> {
    return await this.roomService.listMyRooms(req.user);
  }

  @Get('/all-rooms')
  async listAllRooms(): Promise<Room[]> {
    return await this.roomService.listAllRooms();
  }
  // @UseGuards(JwtAuthGuard)
  // @Post("/test")
  // async test(@Body() addRoomDto: @Req() req){
  //   console.log("Res", req.user)
  //   return "dd";
  //   // return await this.roomService.addRoom(addRoomDto);
  // }
}
