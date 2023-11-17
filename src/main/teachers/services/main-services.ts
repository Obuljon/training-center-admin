import { teacher } from '../../../data-type/teacher-type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from 'src/schemas/teachers-schema';
import { Model } from 'mongoose';
import { AddTeacherDTO } from '../dto/add-teacher-dto';
import { SetTeacherDTO } from '../dto/set-teacher-dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async add(data: AddTeacherDTO): Promise<teacher | null> {
    data.img = data.img || ' ';
    const newteacher = new this.teacherModel(data);
    return newteacher.save().catch((err) => null);
  }

  async getAll(): Promise<teacher[] | null> {
    return this.teacherModel.find({}).catch((err) => null);
  }

  async getById(_id: string): Promise<teacher | null> {
    return this.teacherModel.findById(_id).catch((err) => null);
  }

  async getOne(lname: string, fname: string): Promise<teacher | null> {
    return this.teacherModel.findOne({ lname, fname }).catch((err) => null);
  }

  async set(_id: string, update: SetTeacherDTO): Promise<object | null> {
    return this.teacherModel
      .updateOne({ _id }, { $set: update })
      .catch((err) => null);
  }
  async del(_id: string) {
    return this.teacherModel.findByIdAndRemove(_id).catch((err) => null);
  }
}
