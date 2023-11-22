import { ObjectId } from 'mongoose';

export type teacher = {
  _id: ObjectId;
  lname: string;
  fname: string;
  img: string;
  courses: teacherCourses[];
};

export type teacherCourses = {
  course_id: string;
};
