import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    console.log('createProduct', createProductDto)
    const product = {
      model: createProductDto.model,
      name: createProductDto.name,
      description: createProductDto.description,
      overview: createProductDto.overview,
      functions: createProductDto.functions.join(","),
      advantages: createProductDto.advantages.join(","),
      technical_parameters: createProductDto.technical_parameters.join(","),
      services: createProductDto.services.join(","),
      whychoose: createProductDto.whychoose.join(","),
      note: createProductDto.note.join(","),
      // ...createProductDto,
    };
    return this.productRepository.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
