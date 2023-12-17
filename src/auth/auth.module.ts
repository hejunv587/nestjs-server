import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constans'
import { PasswordService } from 'src/common/password.service';
// import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '8h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, PasswordService]
})
export class AuthModule { }
