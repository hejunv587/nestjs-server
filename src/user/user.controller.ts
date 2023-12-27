import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UserPipe } from './pipes/user.pipe'

import * as svgCaptcha from 'svg-captcha';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { log } from 'console';
// import * as uuid from 'uuid'

// const uuid1 = uuid.v4()
// console.log(uuid1);

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建一个新的用户' })
  @ApiBody({ type: CreateUserDto }) // Add this line to specify the request body
  // createUser(@Body(UserPipe) createUserDto: CreateUserDto) {
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findall() {
  //   return 'all users'
  // }

  // @Get('byname/:name')
  // findByName(@Param('name') name: string) {
  //   // 处理按名称查询的逻辑
  //   return this.userService.findOneByName(name);
  // }

  // @Get('byid/:id')
  // findById(@Param('id') id: string) {
  //   // 处理按 ID 查询的逻辑
  //   return this.userService.findOneById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
