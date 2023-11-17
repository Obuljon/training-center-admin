import { StudentService } from './main-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schemas/students-schema';

@Injectable()
export class InternalService {
  constructor(
    @InjectModel(Student.name) private stundentModel: Model<Student>,
    private studentService: StudentService,
  ) {}

  async getByIdCourse(
    student_id: string,
    course_id: string,
  ): Promise<null | object> {
    let student = await this.studentService.getById(student_id);
    if (student && student.courses.length > 0) {
      return student.courses.find((item) => item['course_id'] == course_id);
    }
  }

  async addCourseId(
    student_id: string,
    course_id: string,
  ): Promise<object | null> {
    return this.stundentModel
      .updateOne({ _id: student_id }, { $push: { courses: { course_id } } })
      .catch((err) => null);
  }

  async courseDelId(
    student_id: string,
    course_id: string,
  ): Promise<object | null> {
    return this.stundentModel
      .updateOne({ _id: student_id }, { $pull: { courses: { course_id } } })
      .catch((err) => null);
  }
}
