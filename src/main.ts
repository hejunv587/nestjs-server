import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType ,ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { Request, Response, NextFunction } from 'express'

// 引入cors
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { ResponseInterceptor } from './common/respose'
import {HttpFilter} from './common/filter'


//白名单
const whiteList = ['/user','/upload','/littlejoy','/auth']

//全局中间件
function globalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl)
  // if (whiteList.includes(req.originalUrl)) {
  if (whiteList.some(path => req.originalUrl.startsWith(path))) {
    next()
  } else {
    res.send('全局中间件将你拦截了！')
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  // 在main.ts中使用cors
  app.use(cors())
  app.use(globalMiddleware)
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({ secret: "Joy", name: "joy.session", rolling: true, cookie: { maxAge: null } }))
  app.useStaticAssets(join(__dirname,'images'),{
    prefix:"/littlejoy"
 })

 app.useGlobalInterceptors(new ResponseInterceptor())
 app.useGlobalFilters(new HttpFilter())
 app.useGlobalPipes(new ValidationPipe())
 
  await app.listen(3000);
}
bootstrap();
