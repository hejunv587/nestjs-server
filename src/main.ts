import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { Request, Response, NextFunction } from 'express'

// 引入cors
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { ResponseInterceptor } from './common/respose'
import { HttpFilter } from './common/filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


//白名单
const whiteList = ['/user', '/upload', '/littlejoy', '/auth']


//全局中间件
// function globalMiddleware(req: Request, res: Response, next: NextFunction) {
//   console.log(req.originalUrl)
//   // if (whiteList.includes(req.originalUrl)) {
//   if (whiteList.some(path => req.originalUrl.startsWith(path))) {
//     next()
//   } else {
//     res.send('全局中间件将你拦截了！')
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  // 在main.ts中使用cors
  // app.use(cors())
  // 启用 CORS
  // app.enableCors({
  //   credentials: true, // 允许携带凭证（cookie）
  //   origin: true,       // 允许请求的域
  // });
  app.enableCors();

  app.use(session({
    secret: "Joy", name: "joy.session", rolling: true, cookie: { maxAge: 999999, httpOnly: false, secure: false },
    resave: false,
    saveUninitialized: false, // 设置为false表示不保存未初始化的会话
  }))
  // app.use(globalMiddleware)
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.useStaticAssets(join(__dirname, 'uploads'), {
    // prefix: "/littlejoy"
    prefix: "/uploads"
  })

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpFilter())
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder().setTitle('fxfine后台接口').setDescription('网站后台').setVersion('1').addCookieAuth('joy.session').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)


  await app.listen(3000);
}
bootstrap();
