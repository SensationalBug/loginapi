import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return new UnauthorizedException('Credenciales incorrectas');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return new UnauthorizedException('Credenciales incorrectas');
    }
    const payload = { email: user.email };
    return {
      name: user.name,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register({ name, email, password, rol }: RegisterDto) {
    const user = await this.userService.getUserByEmail(email);
    return user
      ? new BadRequestException('El usuario ya existe')
      : this.userService.createUser({
          rol,
          name,
          email,
          password: await bcryptjs.hashSync(password, 10),
        });
  }
}
