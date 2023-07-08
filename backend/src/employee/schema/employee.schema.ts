import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employe & Document;

@Schema({ timestamps: true })
export class Employe {
  @Prop({
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 255,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  lastname: string;

  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employe);
