import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Users } from '../schema/user.schema';
import { Addresses } from 'src/users/schema/address.schema';

export class CreateUserDto implements Partial<Users> {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  
  @IsNotEmpty()
  @IsString()
  firstname: string;
  
  @IsNotEmpty()
  @IsString()
  lastname: string;
  
  @IsNotEmpty()
  @IsString()
  role: string;
  
  @IsNotEmpty()
  addresses: Addresses[];
}
