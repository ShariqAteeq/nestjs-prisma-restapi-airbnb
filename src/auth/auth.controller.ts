import { SignUpDto } from './../common/dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body } from '@nestjs/common/decorators';
import { User } from 'src/models/user';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('req', req?.user);
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  @ApiResponse({ status: 403, description: 'unauthorizes' })
  @ApiResponse({ status: 200, description: 'Created', type: User })
  // @ApiCreatedResponse({ type: User })
  // @ApiNotAcceptableResponse({ description: 'Email already taken' })
  async signup(@Body() signupDto?: SignUpDto) {
    return 'signup';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('req', req);
    return req.user;
  }
}
