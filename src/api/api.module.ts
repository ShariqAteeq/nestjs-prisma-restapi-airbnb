import { PrismaService } from './services/prisma.service';
import { UsersService } from './services/user.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService, PrismaService],
})
export class ApiModule {}
