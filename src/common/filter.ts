import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

export class HttpFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log("HttpException getStatus()====>", exception)
        // throw new Error('Method not implemented.');
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const respose = ctx.getResponse<Response>()
        let status: number
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            // ... 其他逻辑
        } else {
            // 处理其他类型的异常
            status = exception.statusCode
        }
        // const status = exception.getStatus()
        const date = new Date();
        const options = { timeZone: 'Asia/Shanghai' };
        const formatter = new Intl.DateTimeFormat('zh-CN', options);
        const formattedDate = formatter.format(date).replace(/\//g, '-') + ' ' + date.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai' });
        // console.log(formattedDate); // 例如：2023-05-01 21:19:43

        respose.status(status).json({
            // data: exception.message,
            data: exception,
            status,
            success: false,
            time: formattedDate,
            path: request.url
        })
    }
}
