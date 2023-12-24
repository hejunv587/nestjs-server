import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { QA } from './entities/qa.entity';
import { CreateQADto } from './dto/create-qa.dto copy';
import { CreateAboutDto } from './dto/create-about.dto';
import { About } from './entities/about.entity';
import { EntityManager, Transaction } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(QA)
    private readonly qaRepository: Repository<QA>,
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
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

  createQA(createQADto: CreateQADto) {
    let qa = {
      q: createQADto.q,
      a: createQADto.a,
      productId: +createQADto.productId,
    };
    console.group('createQADto', qa)
    // return this.qaRepository.save(qa);
    // 使用事务
    this.entityManager.transaction(async (transactionalEntityManager) => {
      // const savedQA = await transactionalEntityManager.save(QA, qa);
      const product = await transactionalEntityManager.findOne(Product, { where: { id: qa.productId }, relations: ['qas'] });
      // INSERT INTO qa (q, a, productId) VALUES ('30岁S', '没有结婚的女人', 1);
      console.group('product1', product)
      const qa1 = {
        q: createQADto.q,
        a: createQADto.a,
        product: { id: createQADto.productId }, // 提供有效的 Product 对象
      };
      const savedQA = await this.qaRepository.save(qa1);
      // 确保 product.qa 是数组
      product.qas = product.qas || [];
      product.qas.push(savedQA);
      const savedProduct = await transactionalEntityManager.save(Product, product);
      console.group('product2', savedProduct)
      return savedQA;
    })

  }

  createAbout(createAboutDto: CreateAboutDto): Promise<About> {
    const about = {
      name: createAboutDto.name,
      desc: createAboutDto.desc,
      productId: createAboutDto.productId,
    };
    return this.aboutRepository.save(about);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = {
    }
    return this.productRepository.update(id, product)
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
