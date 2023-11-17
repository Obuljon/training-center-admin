import {
  StudentOfCourse,
  StudentOfCourseSchema,
} from './course.schemas/course-students-schema';
import { months, daysweek } from './../data-type/date-type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { student } from 'src/data-type/student-type';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  teacher_id: string;

  @Prop({ required: true })
  starttime: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  durations: number;

  @Prop({ required: true })
  deysweek: [];

  @Prop({ required: true })
  daysleakage: [];

  @Prop({ required: true })
  students: StudentOfCourse[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
