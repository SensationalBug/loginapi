import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(registerDto: RegisterDto) {
    return this.userRepository.save(registerDto);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
