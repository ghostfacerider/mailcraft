import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employe, EmployeeSchema } from './schema/employee.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    MongooseModule.forFeature([
      { name: Employe.name, schema: EmployeeSchema },
    ]),
    UsersModule,
  ],
})
export class EmployeeModule {}
