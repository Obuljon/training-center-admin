import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentOfCourse } from 'src/schemas/course.schemas/course-students-schema';
import { Course } from 'src/schemas/courses-schema';
import { CourseService } from './main-service';

@Injectable()
export class StudentsOfCourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private courseService: CourseService,
  ) {}

  async getStudents(
    course_id: string,
    student_id: string,
  ): Promise<null | object> {
    let data = await this.courseService.getById(course_id);
    if (data && data.students.length > 0) {
      return data.students.find((item) => item['student_id'] == student_id);
    } else return null;
  }

  async studendAdd(course_id: string, body: any): Promise<null | object> {
    const { student_id } = body;
    return this.courseModel
      .updateOne(
        { _id: course_id },
        {
          $push: { students: { student_id: student_id, attendance: [] } },
        },
      )
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  async studentDel(
    course_id: string,
    student_id: string,
  ): Promise<object | null> {
    return this.courseModel
      .updateOne({ _id: course_id }, { $pull: { students: { student_id } } })
      .catch((err) => null);
  }
}
