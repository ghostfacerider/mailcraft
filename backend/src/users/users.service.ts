import { Model } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string): Promise<string> {
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

  async createUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await this.hashPassword(password);

    try {
      const createUser = new this.userModel(createUserDto);
      return await createUser.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new BadRequestException('Email already exist');
      }

      throw new ConflictException('Fail to create record.');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await this.hashPassword(password);
    }

    const findUserById = await this.userModel.findById(id);
    if (!findUserById) {
      throw new NotFoundException('Record Not found');
    }

    try {
      return await this.userModel.updateOne({ _id: id }, updateUserDto)
    } catch (error) {
      throw new ConflictException('Fail to update record');
    }
  }

  async findOneUser(id: string) {
    const findUserById = await this.userModel.findById(id);
    if (!findUserById) {
      throw new NotFoundException('Record Not found');
    }
    return findUserById;
  }

  async findAllUser() {
    return await this.userModel.find();
  }

  async deleteUser(id: string) {
    const findUserById = await this.userModel.findById(id);
    if (!findUserById) {
      throw new NotFoundException('Record Not found');
    }

    try {
      return await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      throw new ConflictException('Fail to delete record');
    }
  }
}
