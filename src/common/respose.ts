import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common'
import { Observable, map } from 'rxjs';

interface data<T>{
    data:T
}

@Injectable()
export class ResponseInterceptor<T=any> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
        // throw new Error('Method not implemented.');
        return next.handle().pipe(map(data=>{
            return {
                data,
                code:0,
                success:true,
                message:'success'
            }
        }))
    }

}