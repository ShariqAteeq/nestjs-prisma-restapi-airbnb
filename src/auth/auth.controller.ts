import { SignUpDto, LoginDto } from './../common/dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import {
  // ApiCreatedResponse,
  // ApiNotAcceptableResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body } from '@nestjs/common/decorators';
import { User } from '@prisma/client';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('auth/signup')
  @ApiResponse({ status: 403, description: 'unauthorizes' })
  // @ApiResponse({ status: 200, description: 'Created', type: User })
  // @ApiCreatedResponse({ type: User })
  // @ApiNotAcceptableResponse({ description: 'Email already taken' })
  async signup(@Body() signupDto: SignUpDto): Promise<User> {
    return await this.authService.signup(signupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('req', req);
    return req.user;
  }
}
