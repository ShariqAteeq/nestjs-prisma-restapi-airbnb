import { Status } from './../../common/constants';
import { PrismaService } from './prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/common/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async createUser(payload: SignUpDto): Promise<User> {
    const user = await this.getUserByEmail(payload['email']);
    if (user) {
      throw new HttpException(
        'User already exist with this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.prismaService.user.create({
      data: {
        ...payload,
        password: await bcrypt.hash(payload['password'], 10),
        status: Status.ACTIVE,
      },
    });
    return createdUser;
  }
}
