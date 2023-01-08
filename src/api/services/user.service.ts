import { Status } from './../../common/constants';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/common/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(payload: SignUpDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...payload,
        password: await bcrypt.hash(payload['password'], 10),
        status: Status.ACTIVE,
      },
    });
  }
}
