import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { QA } from './entities/qa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, About, QA])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
