import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByName(username)

        if (user?.password !== pass) {
            throw new UnauthorizedException()
        }

        const { password, ...result } = user

        return result

    }
}
