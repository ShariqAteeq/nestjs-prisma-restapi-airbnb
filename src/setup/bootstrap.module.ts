import { AuthModule } from 'src/auth/auth.module';
import { ApiModule } from 'src/api/api.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiModule, AuthModule],
  exports: [],
  providers: [],
})
export class BootstrapModule {}
