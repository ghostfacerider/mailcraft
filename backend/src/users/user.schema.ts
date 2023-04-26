import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;
  createdAt: string;
  updatedAt: string;

  @Prop({
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
