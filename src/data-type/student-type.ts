import { ObjectId } from 'mongoose';
import { course } from './cours-type';


export type student = {
  _id: ObjectId;
  lname: string;
  fname: string;
  phone: number;
  img: string;
  courses: course[];
};
