import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseStudentDocument = HydratedDocument<StudentOfCourse>;

@Schema()
export class StudentOfCourse {
  @Prop({ required: true })
  student_id: string;

  @Prop({ required: true })
  attendance:[];
}

export const StudentOfCourseSchema =
  SchemaFactory.createForClass(StudentOfCourse);
