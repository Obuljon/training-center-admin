import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true })
  lname: string;

  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  courses: [];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
