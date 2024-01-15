import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import { Upload } from 'src/upload/entities/upload.entity';

export class CreateReviewDto {
  @ApiProperty({
    description: '评价用户姓名',
    type: String,
    example: '张三',
  })
  username: string;

  @ApiProperty({
    description: '产品评分',
    type: Number,
    example: 5,
  })
  score: number;

  @ApiProperty({
    description: '产品评论',
    type: String,
    example: '产品很好',
    nullable: true,
  })
  content: string;

  @ApiProperty({
    description: '产品记录id',
    type: String,
    example: '产品很好',
    nullable: true,
  })
  productId?: string;

  @ApiProperty({
    description: '产品记录',
    type: Product,
    example: { id: 1 },
  })
  product?: Product;

  @ApiProperty({
    description: 'review图片',
    type: Upload,
    example: [{ id: 'a' }, { id: 'b' }],
    nullable: true,
  })
  images?: Upload[];
}
