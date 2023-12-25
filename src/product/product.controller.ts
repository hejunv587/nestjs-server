import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQADto } from './dto/create-qa.dto copy';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateProductImageDto } from './dto/update-productImage.dto';

interface Upload {
  id: string
}

@Controller('product')
@ApiTags('产品相关接口')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

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

  @Post('about')
  @ApiOperation({ summary: '创建一个新的关于' })
  @ApiBody({ type: CreateAboutDto }) // Add this line to specify the request body
  createAbout(@Body() createAboutDto: CreateAboutDto) {
    return this.productService.createAbout(createAboutDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有产品' })
  findAll() {
    return this.productService.findAll();
  }

  @Patch('addimage/:id')
  @ApiOperation({ summary: '添加产品图片' })
  addImage(@Param('id') id: number, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productService.addImage(+id, updateProductImageDto.uploadId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改产品' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
