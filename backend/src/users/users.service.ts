import { Model } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async handleUserDto(
    userObject: CreateUserDto,
  ): Promise<CreateUserDto> {
    if (userObject.password) {
      const password = await this.hashPassword(userObject.password);
      return Object.assign(userObject, { password });
    }
    return userObject;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userObject: CreateUserDto = await this.handleUserDto(createUserDto);
    const createdUser = new this.userModel(userObject);
    try {
      return await createdUser.save();
    } catch (err) {
      if (err.code && err.code === 11000) {
        return null;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user.toObject();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    return user.toObject();
  }
}
