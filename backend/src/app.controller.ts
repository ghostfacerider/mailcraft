import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { Response } from 'express';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Res,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity } from './users/entity/user.entity';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserEntity> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    const user = await this.authService.getUserDetails(token);
    return new UserEntity(user);
  }

  @Post('user/register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string } | { message: string }> {
    let user = await this.usersService.create(createUserDto);
    if (!user) {
      user = await this.usersService.findOneByEmail(createUserDto.email);
      res.status(HttpStatus.CONFLICT);
      return { message: `${user.email} already exists` };
    }
    return this.authService.login(user);
  }
}
