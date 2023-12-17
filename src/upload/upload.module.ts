import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join, extname } from 'path';
import { Upload } from './entities/upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../uploads"),
      filename: (_, file, callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        return callback(null, fileName)
      }
    })
  }),
  TypeOrmModule.forFeature([Upload])
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
