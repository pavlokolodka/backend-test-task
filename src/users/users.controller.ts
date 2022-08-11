import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-token.auth';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ChangeBossDto } from './dto/change-boss.dto';
import { UserPayloadDto } from './dto/user-payload.dto';
import { User } from './users.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}
  
  @Get('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async getAll(@User() user: UserPayloadDto) {
    return await this.userService.getAll(user)
  }

  @Post('change')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async change(@Body() user: ChangeBossDto, @User() reqUser: UserPayloadDto) {
    return await this.userService.changeBoss(user, reqUser)
  }
}
