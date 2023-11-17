import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { teacherCourses } from 'src/data-type/teacher-type';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {
  @Prop({ required: true })
  lname: string;

  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  courses: teacherCourses[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
