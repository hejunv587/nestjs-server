import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/common/password.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>, private readonly passwordService: PasswordService) { }

  findById(id: string) {
    throw new Error('Method not implemented.');
  }

  async create(createUserDto: CreateUserDto) {
    const data = new User()
    data.name = createUserDto.name
    data.role = createUserDto.role
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    data.password = hashedPassword
    return this.user.save(data)

  }

  findAll() {
    return `This action returns all user`;
  }

  findOneById(id: string) {
    return this.user.findOne({ where: { id } });
  }

  findOneByName(name: string) {
    return this.user.findOne({ where: { name } });

  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // const data = new User()
    // // data.id = updateUserDto.id
    // data.name = updateUserDto.name
    // data.age = updateUserDto.age
    // data.password = updateUserDto.password
    return this.user.update(id, updateUserDto)
  }

  remove(id: string) {
    return this.user.delete(id)
  }

}
