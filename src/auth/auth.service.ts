import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/password.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private passwordService: PasswordService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByName(username)

        // if (user?.password !== pass) {
        //     throw new UnauthorizedException()
        // }
        // 进行密码验证
        console.log("AuthService signIn", user)
        const isValid = await this.passwordService.comparePassword(pass, user.password);


        // const { password, ...result } = user

        // return result

        if (isValid) {
            const payload = { name: user.name, role: user.role }

            return {
                token: await this.jwtService.signAsync(payload)
            }
        } else {
            throw new UnauthorizedException('用户名不存在或者密码错误!');
        }

    }

}
