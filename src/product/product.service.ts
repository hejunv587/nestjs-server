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
import { Upload } from 'src/upload/entities/upload.entity';

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
    // return this.qaRepository.save(qa);
    // 使用事务
    this.entityManager.transaction(async (transactionalEntityManager) => {
      // const savedQA = await transactionalEntityManager.save(QA, qa);
      const product = await transactionalEntityManager.findOne(Product, { where: { id: qa.productId }, relations: ['qas'] });
      // INSERT INTO qa (q, a, productId) VALUES ('30岁S', '没有结婚的女人', 1);
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
      return savedQA;
    })

  }

  createAbout(createAboutDto: CreateAboutDto) {
    const about = {
      name: createAboutDto.name,
      desc: createAboutDto.desc,
      productId: createAboutDto.productId,
    };
    // return this.aboutRepository.save(about);
    // 使用事务
    this.entityManager.transaction(async (transactionalEntityManager) => {
      // const savedQA = await transactionalEntityManager.save(QA, qa);
      const product = await transactionalEntityManager.findOne(Product, { where: { id: about.productId }, relations: ['about'] });
      // INSERT INTO qa (q, a, productId) VALUES ('30岁S', '没有结婚的女人', 1);
      const about1 = {
        name: createAboutDto.name,
        desc: createAboutDto.desc,
        product: { id: createAboutDto.productId }, // 提供有效的 Product 对象
      };
      const savedAbout = await this.aboutRepository.save(about1);
      // 确保 product.qa 是数组
      product.about = product.about || [];
      product.about.push(savedAbout);
      const savedProduct = await transactionalEntityManager.save(Product, product);
      return savedAbout;
    })
  }

  async addImage(id: number, uploadId: string) {
    const product = await this.productRepository.findOne({ where: { id: +id }, relations: ['images'] });
    // INSERT INTO qa (q, a, productId) VALUES ('30岁S', '没有结婚的女人', 1);
    product.images = product.images || [];
    // 创建新的 Upload 对象并添加到 images 数组中
    const newUpload = new Upload();
    newUpload.id = uploadId;
    // newUpload.id = "0a75c57a-eb06-4b1f-92ae-26518899bcbe";
    product.images.push(newUpload);
    const savedProduct = await this.productRepository.save(product);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id: +id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // const product = {
    //   model: updateProductDto.model,
    //   name: updateProductDto.name,
    //   description: updateProductDto.description,
    //   overview: updateProductDto.overview,
    //   functions: updateProductDto.functions.join(","),
    //   advantages: updateProductDto.advantages.join(","),
    //   technical_parameters: updateProductDto.technical_parameters.join(","),
    //   services: updateProductDto.services.join(","),
    //   whychoose: updateProductDto.whychoose.join(","),
    //   note: updateProductDto.note.join(","),
    //   // ...createProductDto,
    // };
    const productToUpdate: Partial<Product> = {};
    if (updateProductDto.model) {
      productToUpdate.model = updateProductDto.model;
    }

    if (updateProductDto.name) {
      productToUpdate.name = updateProductDto.name;
    }

    if (updateProductDto.description) {
      productToUpdate.description = updateProductDto.description;
    }
    if (updateProductDto.description) {
      productToUpdate.description = updateProductDto.description;
    }
    if (updateProductDto.functions) {
      productToUpdate.functions = updateProductDto.functions.join(",")
    }
    if (updateProductDto.advantages) {
      productToUpdate.advantages = updateProductDto.advantages.join(",")
    }
    if (updateProductDto.technical_parameters) {
      productToUpdate.technical_parameters = updateProductDto.technical_parameters.join(",")
    }
    if (updateProductDto.services) {
      productToUpdate.services = updateProductDto.services.join(",")
    }
    if (updateProductDto.whychoose) {
      productToUpdate.whychoose = updateProductDto.whychoose.join(",")
    }
    if (updateProductDto.note) {
      productToUpdate.note = updateProductDto.note.join(",")
    }
    return this.productRepository.update(id, productToUpdate)
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
