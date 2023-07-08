import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Employe } from '../schema/employee.schema';

export class CreateEmployeeDto implements Partial<Employe> {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
