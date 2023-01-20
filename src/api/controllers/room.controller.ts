import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators';
import { AddRoomDto } from 'src/common/dto';
import { RoomService } from '../services/room.service';
import { Room } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-room')
  @UseInterceptors(FilesInterceptor('files'))
  async addRoom(
    @Body() addRoomDto: AddRoomDto,
    @Req() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Room> {
    // ): Promise<String> {
    return await this.roomService.addRoom(addRoomDto, req.user, files);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-rooms')
  async listMyRooms(@Req() req): Promise<Room[]> {
    return await this.roomService.listMyRooms(req.user);
  }

  @Get(':id')
  async room(@Param('id') id: string): Promise<Room> {
    return await this.roomService.getroom(id);
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
