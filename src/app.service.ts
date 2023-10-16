import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getJoy():string {
    return 'Joy is a beautiful girl!'
  }
}
