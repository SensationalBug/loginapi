import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(userData: UserDto) {
    return this.userRepository.save(userData);
  }
}
