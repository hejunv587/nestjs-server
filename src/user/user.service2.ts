import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService2 {
  getHello(){
    return 'UserService2'
  }
}
