import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService2 } from './user/user.service2';
import { UserModule } from './user/user.module';
import { Config } from './config/config.module'
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
// import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [UserModule,AuthModule, Config.forRoot({ path: 'joy' }), UploadModule, TypeOrmModule.forRoot({
    type: "mysql", //数据库类型
    username: "root", //账号
    password: "123456", //密码
    host: "localhost", //host
    port: 3306, //
    database: "db", //库名
    entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
    synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10,//重试连接数据库的次数
    autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  })],
  controllers: [AppController],
  providers: [AppService, UserService2,
    {
      provide: 'asyncFactory',
      inject: [UserService2],
      async useFactory(userService2: UserService2) {
        console.log('useFactory')
        return await new Promise((r) => {
          setTimeout(() => {
            console.log('setTimeout useFactory')
            r(userService2.getHello())
          }, 3000)
        })
      }

    }],
})
export class AppModule { }
