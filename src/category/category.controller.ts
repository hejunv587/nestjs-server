import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

interface QueryParam {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
  /** 查询参数：用户名 */
  name?: string;
}

@ApiTags('产品分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: '创建一个新的产品分类' })
  @ApiBody({ type: CreateCategoryDto }) // Add this line to specify the request body
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: '返回全部产品分类' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('pagequery')
  @ApiOperation({ summary: '翻页查询产品分类' })
  @ApiQuery({ name: 'currentPage', description: '当前页码', type: Number })
  @ApiQuery({ name: 'size', description: '查询条数', type: Number })
  @ApiQuery({
    name: 'name',
    description: '查询参数：用户名',
    required: false,
    type: String,
  })
  queryPage(@Query() queryParam: QueryParam) {
    console.log('queryPage', queryParam);
    return this.categoryService.queryPage(queryParam);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}
