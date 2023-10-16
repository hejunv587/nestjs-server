import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }

  create(createUserDto: CreateUserDto) {
    const data = new User()
    data.name = createUserDto.name
    data.age = createUserDto.age
    data.password = createUserDto.password
    return this.user.save(data)

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // const data = new User()
    // // data.id = updateUserDto.id
    // data.name = updateUserDto.name
    // data.age = updateUserDto.age
    // data.password = updateUserDto.password
    return this.user.update(id,updateUserDto)
  }

  remove(id: string) {
    return this.user.delete(id)
  }

}
