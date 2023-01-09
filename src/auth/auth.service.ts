import { LoginOutput } from './../common/model';
import { SignUpDto } from 'src/common/dto';
import { E_USER_NOT_FOUND } from './../common/exceptions';
import { LoginDto } from './../common/dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/api/services/user.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(payload['email']);
    if (!user) {
      throw new HttpException(E_USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (!bcrypt.compareSync(payload['password'], user['password'])) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async login(payload: LoginDto): Promise<LoginOutput> {
    const user = await this.validateUser(payload);
    const { password, ...rest } = user;
    return {
      access_token: this.jwtService.sign({ ...rest }),
    };
  }

  async signup(payload: SignUpDto): Promise<User> {
    return await this.usersService.createUser(payload);
  }
}
