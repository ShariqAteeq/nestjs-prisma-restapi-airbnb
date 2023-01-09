import { PrismaService } from './services/prisma.service';
import { UsersService } from './services/user.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UsersService, PrismaService],
})
export class ApiModule {}
