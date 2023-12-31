import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
  Req,
  Query,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { url } from 'inspector';
import { join } from 'path';
import { zip } from 'compressing';
import * as uuid from 'uuid';
import * as mime from 'mime-types';
import * as path from 'path';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

interface QueryParam {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
}

@Controller('upload')
@ApiTags('上传文件相关接口')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post('album')
  // @UseInterceptors(FileInterceptor('file'))
  // upload(@UploadedFile('file') file) {
  //   console.log(file, 'file')
  //   return '图片上传了joy'
  // }

  @Post('album1')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      // 验证文件类型
      const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/jpg',
      ];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
        );
      }

      // 设置存储路径和文件名
      // const fileName = `${uuid.v4()}.${mime.extension(file.mimetype)}`;
      // const filePath = `uploads/albums/${fileName}`; // 根据你的存储需求修改路径
      console.log('uploadFile', file);
      const filePath = path.join('uploads', file.filename);
      // console.log('uploadFile', file, filePath)

      // 将文件保存到磁盘或云存储
      // 这里需要根据你的存储方案进行适当的修改

      // 将文件信息存储到数据库
      const res = await this.uploadService.createFile(file.filename, filePath);

      // 返回成功的响应
      return { message: '文件上传成功', file: res };
    } catch (error) {
      // 处理错误
      throw new BadRequestException('文件上传失败', error.message);
    }
  }

  @Get('exports')
  exports(@Res() res: Response) {
    const url = join(__dirname, '../images/1687184723228.jpg');
    res.download(url);
  }

  @Get('steam')
  getSteam(@Res() res) {
    //设置一个文件的链接地址
    const url = join(__dirname, '../images/1687184723228.jpg');
    //利用zip steam addEntry(url)
    const tarSteam = new zip.Stream();
    tarSteam.addEntry(url);
    //设置header
    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader('Content-Disposition', `attachment; filename=xiaoman`);

    //pipe输出
    tarSteam.pipe(res);
  }

  @Get('steam/:id')
  async getSteamById(@Param('id') id: string, @Res() res) {
    const file = await this.uploadService.findOne(id);

    //设置一个文件的链接地址
    const url = path.join(__dirname, '../', file.path);
    //把图片发送出去
    res.sendFile(url);

    // //利用zip steam addEntry(url)
    // const tarSteam = new zip.Stream()
    // tarSteam.addEntry(url)
    // //设置header
    // res.setHeader('Content-Type', 'application/octet-stream');

    // res.setHeader(
    //   'Content-Disposition',
    //   `attachment; filename=xiaoman`,
    // )

    // //pipe输出
    // tarSteam.pipe(res)
  }

  @Get('geturl/:id')
  async getUrl(@Param('id') id: string, @Req() req) {
    const file = await this.uploadService.findOne(id);

    // 获取请求的主机名和协议
    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // 设置一个文件的链接地址
    // const url = path.join(baseUrl, file.path);
    // const url = path.posix.join(baseUrl, file.path);
    const path = file.path.replace(/\\/g, '/');
    const url = `${baseUrl}/${path}`;

    console.log('url', url);

    // 把图片发送出去
    // res.sendFile(url);
    return url;
  }

  @Get('pagequery')
  @ApiOperation({ summary: '翻页查询附件' })
  @ApiQuery({ name: 'currentPage', description: '当前页码', type: Number })
  @ApiQuery({ name: 'size', description: '查询条数', type: Number })
  // @ApiQuery({
  //   name: 'name',
  //   description: '查询参数：产品名',
  //   required: false,
  //   type: String,
  // })
  // @ApiQuery({
  //   name: 'model',
  //   description: '查询参数：产品编码',
  //   required: false,
  //   type: String,
  // })
  queryPage(@Query() queryParam: QueryParam) {
    console.log('queryPage');
    return this.uploadService.queryPage(queryParam);
  }
}
