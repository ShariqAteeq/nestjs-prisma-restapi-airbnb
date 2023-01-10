import { RoomController } from './controllers/room.controller';
import { PrismaService } from './services/prisma.service';
import { UsersService } from './services/user.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { RoomService } from './services/room.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController, RoomController],
  providers: [UsersService, PrismaService, RoomService],
})
export class ApiModule {}
