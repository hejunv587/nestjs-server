import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('产品评价相关接口')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  // @Get('pagequery')
  // @ApiOperation({ summary: '翻页查询产品评价' })
  // @ApiQuery({ name: 'currentPage', description: '当前页码', type: Number })
  // @ApiQuery({ name: 'size', description: '查询条数', type: Number })
  // @ApiQuery({
  //   name: 'product',
  //   description: '查询参数：产品ID',
  //   required: false,
  //   type: String,
  // })
  // queryPage(@Query() queryParam: QueryParam) {
  //   console.log('queryPage', queryParam);
  //   return this.productService.queryPage(queryParam);
  // }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({ summary: '根据产品查询评论' })
  // @ApiQuery({ name: 'productid', description: '产品id', type: String })
  @Get(':productid')
  findByPrdouctId(@Param('productid') productid: string) {
    return this.reviewService.findByPrdouctId(+productid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
