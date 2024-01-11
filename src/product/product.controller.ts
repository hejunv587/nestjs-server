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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateQADto } from './dto/create-qa.dto copy';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateProductImageDto } from './dto/update-productImage.dto';

interface Upload {
  id: string;
}

interface QueryParam {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
  /** 查询参数：产品编码 */
  model?: string;
  /** 查询参数：产品名 */
  name?: string;
}

@Controller('product')
@ApiTags('产品相关接口')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Post()
  @ApiOperation({ summary: '创建一个新的产品' })
  @ApiBody({ type: CreateProductDto }) // Add this line to specify the request body
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('qa')
  @ApiOperation({ summary: '创建一个新的问答' })
  @ApiBody({ type: CreateQADto }) // Add this line to specify the request body
  createQA(@Body() createQADto: CreateQADto) {
    return this.productService.createQA(createQADto);
  }

  @Patch('qa/:id')
  @ApiOperation({ summary: 'id修改问答' })
  updateQA(@Param('id') id: string, @Body() createQADto: CreateQADto) {
    return this.productService.updateQA(+id, createQADto);
  }

  @Delete('qa/:id')
  @ApiOperation({ summary: 'id删除问答' })
  removeQA(@Param('id') id: string) {
    return this.productService.removeQA(+id);
  }

  @Post('about')
  @ApiOperation({ summary: '创建一个新的关于' })
  @ApiBody({ type: CreateAboutDto }) // Add this line to specify the request body
  createAbout(@Body() createAboutDto: CreateAboutDto) {
    return this.productService.createAbout(createAboutDto);
  }

  @Patch('about/:id')
  @ApiOperation({ summary: 'id修改关于' })
  updateAbout(@Param('id') id: string, @Body() createAboutDto: CreateAboutDto) {
    return this.productService.updateAbout(+id, createAboutDto);
  }

  @Delete('about/:id')
  @ApiOperation({ summary: 'id删除关于' })
  removeAbout(@Param('id') id: string) {
    return this.productService.removeAbout(+id);
  }

  @Get()
  @ApiOperation({ summary: '获取所有产品,只返回产品id,model,name' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('pagequery')
  @ApiOperation({ summary: '翻页查询产品分类' })
  @ApiQuery({ name: 'currentPage', description: '当前页码', type: Number })
  @ApiQuery({ name: 'size', description: '查询条数', type: Number })
  @ApiQuery({
    name: 'name',
    description: '查询参数：产品名',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'model',
    description: '查询参数：产品编码',
    required: false,
    type: String,
  })
  queryPage(@Query() queryParam: QueryParam) {
    console.log('queryPage', queryParam);
    return this.productService.queryPage(queryParam);
  }

  @Patch('addcover/:id')
  @ApiOperation({ summary: '添加产品封面图' })
  addCover(
    @Param('id') id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productService.addCover(+id, updateProductImageDto.uploadId);
  }

  @Patch('addimage/:id')
  @ApiOperation({ summary: '添加产品图片' })
  addImage(
    @Param('id') id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productService.addImage(+id, updateProductImageDto.uploadId);
  }

  @Patch('addimages/:id')
  @ApiOperation({ summary: '批量添加产品图片' })
  addImages(@Param('id') id: number, @Body() uploads: string[]) {
    return this.productService.addImages(+id, uploads);
  }

  @Patch('removeimages/:id')
  @ApiOperation({ summary: '移除产品图片' })
  removeImage(
    @Param('id') id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productService.removeImage(+id, updateProductImageDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'id获取单个产品' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Get('getimages/:id')
  // @ApiOperation({ summary: 'id获取单个产品对应的产品图片' })
  // findImages(@Param('id') id: string) {
  //   return this.productService.findImages(+id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'id修改产品' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
