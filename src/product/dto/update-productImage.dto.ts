import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductImageDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        description: 'upload附件id',
        type: Number,
        example: "0a75c57a-eb06-4b1f-92ae-26518899bcbe",
        nullable: true,
    })
    uploadId: string
}
