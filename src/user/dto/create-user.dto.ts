import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 10, {
        message: '字符长度必须在2-10个之间'
    })
    name: string;

    age: number;
    password: string;
}
