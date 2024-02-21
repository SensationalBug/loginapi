import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  createUser(userData: UserDto) {
    return console.log(userData);
  }
}
