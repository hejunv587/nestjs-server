import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 10, {
        message: '字符长度必须在2-10个之间'
    })
    @ApiProperty({
        description: '用户姓名，长度在2-10之间',
        type: String,
        example: 'admin',
    })
    name: string;

    @ApiProperty({
        description: '用户角色',
        type: String,
        required: false,
        example: 'admin',
    })
    role?: string;

    @ApiProperty({
        description: '用户密码',
        type: String,
        example: 'password123',
    })
    password: string;
}
