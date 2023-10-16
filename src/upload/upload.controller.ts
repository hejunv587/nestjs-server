import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express';
import { url } from 'inspector';
import { join } from 'path';
import {zip} from 'compressing'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, 'file')
    return '图片上传了joy'
  }

  @Get('exports')
  exports(@Res() res: Response) {
    const url = join(__dirname, "../images/1687184723228.jpg")
    res.download(url)
  }

  @Get('steam')
  getSteam(@Res() res) {
    //设置一个文件的链接地址
    const url = join(__dirname, "../images/1687184723228.jpg")
    //利用zip steam addEntry(url)
    const tarSteam = new zip.Stream()
    tarSteam.addEntry(url)
    //设置header
    res.setHeader('Content-Type', 'application/octet-stream');
   
    res.setHeader(
      'Content-Disposition',  
      `attachment; filename=xiaoman`,
    )

    //pipe输出
    tarSteam.pipe(res)
  }
}
