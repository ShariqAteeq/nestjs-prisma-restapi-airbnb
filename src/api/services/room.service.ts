import { AddRoomDto } from './../../common/dto';
import { RoomStatus } from './../../common/constants';
import { PrismaService } from './prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room, User } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}

  async addRoom(addRoomDto: AddRoomDto, user: User): Promise<Room> {
    const { id, ...rest } = addRoomDto;
    return await this.prismaService.room.upsert({
      where: {
        id: id ?? 0,
      },
      update: {
        ...rest,
      },
      create: {
        ...rest,
        status: RoomStatus.IN_PROGRESS,
        userId: user.id,
      },
    });
  }

  async listMyRooms(user: User): Promise<Room[]> {
    return await this.prismaService.room.findMany({
      where: { userId: user?.id },
    });
  }

  async listAllRooms(): Promise<Room[]> {
    return await this.prismaService.room.findMany({
      include: {
        user: true,
      },
    });
  }
}
