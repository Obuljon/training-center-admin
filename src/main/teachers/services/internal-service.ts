import { teacher } from './../../../data-type/teacher-type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Teacher } from 'src/schemas/teachers-schema';

@Injectable()
export class TeacherInternalService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async addCourse(
    teacher_id: string,
    course_id: ObjectId | string,
  ): Promise<any | null> {
    return await this.teacherModel
      .updateOne({ _id: teacher_id }, { $push: { courses: { course_id } } })
      .catch((err) => null);
  }

  async pullCourse(
    teacher_id: string,
    course_id: string | ObjectId,
  ): Promise<any | null> {
    return await this.teacherModel
      .updateOne(
        { _id: teacher_id },
        { $pull: { courses: { $gte: { course_id } } } },
      )
      .catch((err) => null);
  }
}
