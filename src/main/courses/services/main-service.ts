import { course, coursetype } from '../../../data-type/cours-type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Course } from 'src/schemas/courses-schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async add(course): Promise<course | null> {
    const { name, teacher_id, price, starttime, durations, deysweek } = course;
    const createData = new this.courseModel({
      name,
      teacher_id,
      starttime,
      price,
      durations,
      deysweek,
      students: [],
      daysleakage: [],
    });
    return createData.save().catch((err) => null);
  }

  async getAll(): Promise<course[] | null> {
    return this.courseModel.find().catch((err) => null);
  }

  async getById(_id: string): Promise<course | null> {
    return this.courseModel.findById(_id).catch((err) => null);
  }

  async getOne(name: string): Promise<course | null> {
    return this.courseModel.findOne({ name }).catch((err) => null);
  }

  async setById(_id: string, setData: object): Promise<object | null> {
    return this.courseModel
      .findOneAndUpdate({ _id }, { $set: setData })
      .catch((err) => null);
  }

  async delById(_id: string | ObjectId) {
    return this.courseModel.findByIdAndRemove(_id).catch((err) => null);
  }
}
