import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employe, EmployeeDocument } from './schema/employee.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employe.name)
    private employeeModel: Model<EmployeeDocument>,
    private userService: UsersService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password } = createEmployeeDto;
    createEmployeeDto.password = await this.userService.hashPassword(password);

    try {
      const createEmployee = new this.employeeModel(createEmployeeDto);
      return await createEmployee.save();
    } catch (error) {
      console.log(error);

      if (error.code == 11000) {
        throw new BadRequestException('Username already exist');
      }

      throw new ConflictException('Fail to create record.');
    }
  }

  async findAll() {
    return await this.employeeModel.find();
  }

  async findOne(id: string) {
    const findEmployeeById = await this.employeeModel.findById(id);
    if (!findEmployeeById) {
      throw new NotFoundException('Record Not found');
    }
    return findEmployeeById;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const { password } = updateEmployeeDto;
    if (password) {
      updateEmployeeDto.password = await this.userService.hashPassword(
        password,
      );
    }

    const findEmployeeById = await this.employeeModel.findById(id);
    if (!findEmployeeById) {
      throw new NotFoundException('Record Not found');
    }

    try {
      return await this.employeeModel.updateOne({ _id: id }, updateEmployeeDto);
    } catch (error) {
      throw new ConflictException('Fail to update record');
    }
  }

  async remove(id: string) {
    const findEmployeeById = await this.employeeModel.findById(id);
    if (!findEmployeeById) {
      throw new NotFoundException('Record Not found');
    }

    try {
      return await this.employeeModel.deleteOne({ _id: id });
    } catch (error) {
      throw new ConflictException('Fail to delete record');
    }
  }
}
