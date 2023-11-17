import { ObjectId } from 'mongoose';
import { daysweek, months } from './date-type';
import { student } from './student-type';

export type courseUpdate = {
  coursename?: string;
  teacher_id?: string;
  durations?: months[];
  deysweek?: daysweek[];
  students?: student[];
  courseprice?: number;
};

export type course = {
  _id: ObjectId;
  coursename: string;
  teacher_id: string;
  courseprice: number;
  durations: number;
  deysweek: [];
  students: [];
};
export type coursetype = {
  coursename?: string;
  teacher_id?: string;
  courseprice?: number;
  durations?: number;
  deysweek?: [];
  students?: [];
};
