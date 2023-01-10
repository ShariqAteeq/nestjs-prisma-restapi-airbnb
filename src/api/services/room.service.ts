import { AddRoomDto } from './../../common/dto';
import { Status } from './../../common/constants';
import { PrismaService } from './prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}

  async addRoom(addRoomDto: AddRoomDto): Promise<Room> {
    delete addRoomDto['id'];
    return await this.prismaService.room.upsert({
      where: {
        id: addRoomDto['id'],
      },
      update: {
        ...addRoomDto,
      },
      create: {
        ...addRoomDto,
        status: Status.ACTIVE,
      },
    });
  }
}
