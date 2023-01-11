import { AuthModule } from 'src/auth/auth.module';
import { ApiModule } from 'src/api/api.module';
import { Module } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Module({
  imports: [ApiModule, AuthModule],
  exports: [],
  providers: [
    {
      provide: 'Cloudinary',
      useFactory: () => {
        return v2.config({
          cloud_name: process.env.CLOUDINARY_CLUDNAME,
          api_key: process.env.CLOUDINARY_APIKEY,
          api_secret: process.env.CLOUDINARY_APISECRET,
        });
      },
    },
  ],
})
export class BootstrapModule {}
