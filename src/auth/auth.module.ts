import { PrismaService } from './../api/services/prisma.service';
import { LocalStrategy } from './startegies/local.strategy';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { ApiModule } from 'src/api/api.module';
import { UsersService } from 'src/api/services/user.service';
import { jwtConstants } from 'src/common/constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './startegies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => ApiModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
