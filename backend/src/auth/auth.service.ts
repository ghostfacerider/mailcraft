import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      const { password, ...result } = user;
      return isMatch ? result : null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserDetails(token: string): Promise<any> {
    const result = this.jwtService.decode(token);
    if (result?.sub) {
      return this.usersService.findOneById(result.sub);
    }
    return null;
  }
}
