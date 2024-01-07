import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';

interface QueryParam {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
  /** 查询参数：用户名 */
  name?: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const data = new Category();
    data.name = createCategoryDto.name;
    return this.categoryRepository.save(data);
  }

  async queryPage(queryParam: QueryParam) {
    const { currentPage, size, name } = queryParam;

    console.log('queryPage', currentPage, size, name);
    const query: FindManyOptions<Category> = {
      take: size,
      skip: (currentPage - 1) * size,
      where: {},
    };

    if (name) {
      query.where = { ...query.where, name: Like(`%${name}%`) };
    }

    const [result, totalCount] = await this.categoryRepository.findAndCount(
      query,
    );

    return {
      // data: result,
      // total: totalCount,
      // currentPage: currentPage,
      // size: size,

      list: result,
      total: totalCount,
      currentPage: currentPage,
      size: size,
    };
  }

  findAll() {
    // 返回Category全部数据
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
