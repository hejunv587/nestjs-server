import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Config } from './config/config.module'
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
// import { PasswordService } from './common/password.service';
// import { AuthModule } from './auth/auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule, AuthModule, Config.forRoot({ path: 'joy' }), UploadModule, TypeOrmModule.forRootAsync({
    // type: "mysql", //数据库类型
    // username: "root", //账号
    // password: "123456", //密码
    // host: "localhost", //host
    // port: 3306, //
    // database: "db", //库名
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
    // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    // retryDelay: 500, //重试连接数据库间隔
    // retryAttempts: 10,//重试连接数据库的次数
    // autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    useFactory: () => {
      const isProduction = process.env.NODE_ENV === 'production';
      return {
        type: 'mysql',
        username: 'root',
        password: isProduction ? 'fxfine123' : '123456',
        host: 'localhost',
        port: 3306,
        database: 'db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: !isProduction, // 生产环境中通常设置为 false
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
      };
    },
  }), CategoryModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
