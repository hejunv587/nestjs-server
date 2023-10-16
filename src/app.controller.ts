import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('asyncFactory') private asyncFactory:string,
    @Inject('config') private baseurl:string ) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getJoy();
  }

  @Get('asyncFactory')
  getFactory() {
    return this.asyncFactory
  }

  @Get('baseurl')
  getBaseurl() {
    return this.baseurl
  }
}
