import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Addresses } from 'src/users/schema/address.schema';

export type UserDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
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

  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  role: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Address' }] })
  addresses: Addresses[];

  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;

  @Prop({ default: Date.now })
  deletedAt?: Date;

  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
