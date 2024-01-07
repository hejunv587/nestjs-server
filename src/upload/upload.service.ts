import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  async createFile(fileName: string, filePath: string): Promise<Upload> {
    const file = new Upload();
    file.name = fileName;
    file.path = filePath;
    return this.uploadRepository.save(file);
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: string) {
    return this.uploadRepository.findOne({ where: { id } });
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  async queryPage(queryParam) {
    const { currentPage, size } = queryParam;

    console.log('queryPage', currentPage, size);
    const query: FindManyOptions<Upload> = {
      take: size,
      skip: (currentPage - 1) * size,
      where: {},
      select: ['id', 'name', 'type'],
    };

    // if (name) {
    //   query.where = { ...query.where, name: Like(`%${name}%`) };
    // }

    // if (model) {
    //   query.where = { ...query.where, model: Like(`%${model}%`) };
    // }

    const [result, totalCount] = await this.uploadRepository.findAndCount(
      query,
    );

    return {
      list: result,
      total: totalCount,
      currentPage: currentPage,
      size: size,
    };
  }
}
