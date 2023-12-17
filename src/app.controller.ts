import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('config') private baseurl:string ) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getJoy();
  }

  @Get('baseurl')
  getBaseurl() {
    return this.baseurl
  }
}
