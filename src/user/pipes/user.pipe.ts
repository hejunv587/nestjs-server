import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'
import { validate} from 'class-validator'
@Injectable()
export class UserPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log("user pipe:", value, metadata)
    const dto = plainToInstance(metadata.metatype, value)
    // console.log(dto);
    const errors = await validate(dto)
    // console.log(errors)
    if(errors.length) {
      throw new HttpException(errors,HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}
