import {Injectable,NestMiddleware} from '@nestjs/common'
import {Request,Response,NextFunction} from 'express'

@Injectable()
export class Logger implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log('这是中间件啊,joy')
        next()
        // res.send('我被拦截了')
    }

}