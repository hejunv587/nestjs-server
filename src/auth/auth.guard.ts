import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from "./constans";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const paylaod = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            })
            request['user'] = paylaod
        } catch {
            throw new UnauthorizedException()
        }


        return true
    }

    private extractTokenFromHeader = (request: Request): string => {
        console.log('request', request.headers)
        const authHeader = (request.headers as { authorization?: string })?.authorization;

        const [type, token] = authHeader?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}