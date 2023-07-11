import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressesDocument = Addresses & Document;

@Schema({ timestamps: true })
export class Addresses {
  @Prop({
    type: String,
    required: true,
    maxlength: 100,
  })
  address: string;
}

export const AddressesSchema = SchemaFactory.createForClass(Addresses);