import { Inject, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PasswordService } from 'src/common/password.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(Logger).forRoutes('user')
    // consumer.apply(Logger).forRoutes({ path: 'user/*', method: RequestMethod.GET })
    consumer.apply(Logger).forRoutes(UserController)
  }
}
