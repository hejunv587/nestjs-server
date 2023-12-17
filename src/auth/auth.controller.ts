import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards, Res, Req, Session, Header, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard';
import * as svgCaptcha from 'svg-captcha';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
@ApiTags('权限相关接口')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    // @Header('Access-Control-Allow-Credentials', 'true')
    // @Header('Access-Control-Allow-Origin', 'http://localhost:3333')
    @ApiOperation({ summary: '登录接口' })
    @ApiBody({ type: SignInDto }) // Add this line to specify the request body
    signIn(@Session() session, @Body() signInDto: SignInDto) {
        console.log('req.session', session, session.code)
        if (!session.code) {
            throw new HttpException('未检测到验证码', 400);
        }
        if (session.code.toLowerCase() !== signInDto.captcha.toLowerCase()) {
            throw new HttpException('验证码错误', 400);
        }

        // // 验证用户名和密码
        // const signInResult = this.authService.signIn(signInDto.username, signInDto.password);

        // if (signInResult) {
        //     // 如果登录成功，清除验证码
        //     delete session.code;
        // }
        // return signInResult
        try {
            // 调用 AuthService 的 signIn 方法
            const signInResult = this.authService.signIn(signInDto.username, signInDto.password);

            // 如果验证通过，返回结果
            return signInResult;
        } catch (error) {
            // 捕获 UnauthorizedException 异常，并返回适当的错误响应
            return { success: false, message: error.message };
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('captcha')
    @ApiOperation({ summary: '获取验证码' })
    generateCaptcha(@Session() session): { img: string; text: string } {
        const captcha = svgCaptcha.create({
            size: 4,//生成几个验证码
            fontSize: 50, //文字大小
            width: 100,  //宽度
            height: 34,  //高度
            background: '#cc9966',  //背景颜色
        });
        session.code = captcha.text //存储验证码记录到session
        const base64Data = Buffer.from(captcha.data).toString('base64');
        return { img: `data:image/svg+xml;base64,${base64Data}`, text: captcha.text };
    }

}
