import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/users.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';


@Injectable()
export class AuthService {

  constructor (
    private readonly userService: UsersService,
    private jwtService: JwtService
    ) {}


  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 8);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    let roles = [];

    for (let i = 0; i < user.userRoles.length; i++) {
      roles.push(user.userRoles[i].role);
    }
    
    const payload = {email: user.email, id: user.id, roles: roles}

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const checkPassword = await bcrypt.compare(userDto.password, user.password);

    if (user && checkPassword) {
      return user;
    }

    throw new UnauthorizedException({message: 'Wrong email or password'})
  }
}
