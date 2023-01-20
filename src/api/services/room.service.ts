import { AddRoomDto } from './../../common/dto';
import { RoomStatus } from './../../common/constants';
import { PrismaService } from './prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room, User } from '@prisma/client';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class RoomService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addRoom(addRoomDto: AddRoomDto, user: User, files): Promise<Room> {
    const { id, ...rest } = addRoomDto;
    const imagesArr = [];
    console.log('files', files);
    if (files.length > 0) {
      files.forEach((x) => {
        imagesArr.push(this.cloudinaryService.uploadImage(x));
      });
    }
    const res = await Promise.all(imagesArr);
    console.log('Res', res);
    return await this.prismaService.room.upsert({
      where: {
        id: +id ?? 0,
      },
      update: {
        ...rest,
        images: res.map((x) => x.secure_url),
      },
      create: {
        ...rest,
        images: res.map((x) => x.secure_url),
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

  async getroom(id: string): Promise<Room> {
    return await this.prismaService.room.findUniqueOrThrow({
      where: { id: +id },
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
