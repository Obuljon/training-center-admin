import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseTeacherDocument = HydratedDocument<TeacherOfCourse>;

@Schema()
export class TeacherOfCourse {
  @Prop({ required: true })
  course_id: string;
}

export const TeacherOfCourseSchema =
  SchemaFactory.createForClass(TeacherOfCourse);
