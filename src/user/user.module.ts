import { Inject, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserService2 } from './user.service2';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [UserService]
  providers: [
    {
      provide: 'joy',
      useClass: UserService
    },
    {
      provide: 'joyvalue',
      useValue: ['TB', 'PDD', 'JD']
    },
    UserService2,
    // {
    //   provide:'testFactory',
    //   inject:[UserService2],
    //   useFactory(userService2:UserService2) {
    //     console.log(userService2.getHello())
    //     return 123
    //   },
    // },
    {
      provide: 'asyncFactory',
      inject: [UserService2],
      async useFactory(userService2: UserService2) {
        console.log('useFactory')
        return await new Promise((r) => {
          setTimeout(() => {
            console.log('setTimeout useFactory.getHello')
            r(userService2.getHello())
          }, 3000)
        })
      }

    }
  ],
  exports: [UserService2]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(Logger).forRoutes('user')
    // consumer.apply(Logger).forRoutes({ path: 'user/*', method: RequestMethod.GET })
    consumer.apply(Logger).forRoutes(UserController)
  }
}
