import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

interface QueryParam {
  /** 当前页码 */
  currentPage: number;
  /** 查询条数 */
  size: number;
  /** 查询参数：产品编码 */
  productId?: string;
}

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  // create(createReviewDto: CreateReviewDto) {
  //   return 'This action adds a new review';
  // }

  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = {
      username: createReviewDto.username,
      score: createReviewDto.score,
      content: createReviewDto.content,
      product: createReviewDto.product,
      images: createReviewDto.images,
    };
    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
    // return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async queryPage(queryParam: QueryParam) {
    const { currentPage, size, productId } = queryParam;

    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    queryBuilder
      .take(size)
      .skip((currentPage - 1) * size)
      .select([
        'review.id',
        'review.product',
        'review.username',
        'review.score',
        'review.content',
        'review.images',
      ])
      .orderBy('review.create_time', 'DESC'); // 按 create_time 降序排列;

    if (productId) {
      queryBuilder.andWhere('review.product.id = :productId', { productId });
    }

    const [result, totalCount] = await queryBuilder.getManyAndCount();

    return {
      list: result,
      total: totalCount,
      currentPage: currentPage,
      size: size,
    };
  }

  async findByPrdouctId(productId: number): Promise<Review[]> {
    console.log('findByPrdouctId', productId);
    return this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['images'], // Include images in the result
      order: { create_time: 'DESC' }, // 按 create_time 降序排列
    });
  }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Update properties if they are provided in the DTO
    if (updateReviewDto.username !== undefined) {
      review.username = updateReviewDto.username;
    }

    if (updateReviewDto.score !== undefined) {
      review.score = updateReviewDto.score;
    }

    if (updateReviewDto.content !== undefined) {
      review.content = updateReviewDto.content;
    }

    if (updateReviewDto.images !== undefined) {
      review.images = updateReviewDto.images;
    }

    return this.reviewRepository.save(review);
  }

  remove(id: number) {
    // return `This action removes a #${id} review`;
    return this.reviewRepository.delete(id);
  }
}
