import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
export class CreateCategoryDto {
    @ApiProperty({
        description: '产品系列名',
        type: String,
        example: '摩托车行车记录仪系列',
    })
    name: string;
}
