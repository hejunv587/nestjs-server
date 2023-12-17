// signIn.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '用户姓名，长度在2-10之间',
    type: String,
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '密码',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: '验证码',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  captcha: string;
}
