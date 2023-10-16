import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Headers, HttpCode, Req, Res, Session, Inject, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserService2 } from './user.service2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserPipe } from './pipes/user.pipe'

import * as svgCaptcha from 'svg-captcha'
import { log } from 'console';
import * as uuid from 'uuid'

const uuid1 = uuid.v4()
console.log(uuid1);


@Controller('user')
export class UserController {
  constructor(@Inject('joy') private readonly userService: UserService,
    @Inject('joyvalue') private shopList: string[],
    // @Inject('testFactory') private testFactory: number,
    @Inject('asyncFactory') private asyncFactory: string
  ) { }

  @Post()
  // createUser(@Body(UserPipe) createUserDto: CreateUserDto) {
  createUser(@Body() createUserDto: CreateUserDto) {

    return this.userService.create(createUserDto);
  }

  @Post('create')
  // create(@Request() req){
  create(@Body() body, @Session() session) {
    // console.log(req)
    console.log(body, session.code);
    if (session.code.toLocaleLowerCase() == body.code.toLocaleLowerCase()) {
      return {
        code: 200,
        message: '创建成功'
      }
    } else {
      return {
        code: 500,
        message: '创建失败'
      }
    }

    // return {
    //   code: 200,
    //   message: body
    // }
  }

  @Get('value')
  getShopList(): string[] {
    return this.shopList
  }

  // @Get('factory')
  // getService2(): number {
  //   return this.testFactory
  // }

  @Get('asyncfactory')
  getAsyncFactory(): string {
    return this.asyncFactory
  }

  @Get('code')
  createCode(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    req.session.code = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
    console.log(captcha.text)
    console.log('session.code', req.session)

    // return {
    //   code:200
    // }
  }
  // @Version('1')
  // findAll(@Request() req) {
  // findAll(@Query() query) {
  //   // console.log("req", req.query)
  //   // return this.userService.findAll();
  //   return {
  //     code: 200,
  //     message: query
  //   }
  // }

  @Get()
  findall() {
    return 'all users'
  }

  @Get(':id')
  // @HttpCode(500)
  // findOne(@Param('id') id: string) {
  findOne(@Request() req, @Headers() header, @Param('id', ParseUUIDPipe) id: string) {
    console.log("user findOne id:", typeof id);

    // console.log(header)
    // return this.userService.findOne(+id);
    return {
      code: 200,
      // id: req.params
      id
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
