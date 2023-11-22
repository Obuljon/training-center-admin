import { StudentService } from './../../students/services/main-service';
import { CourseService } from './../services/main-service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { StudentsOfCourseService } from '../services/students-service';
import { AddStudentOfCourse } from '../dto/add-student-of-course';
import { InternalService } from 'src/main/students/services/internal-service';

@Controller('api/course/students')
export class StudentsOfCourseController {
  constructor(
    private studentsOfCourseService: StudentsOfCourseService,
    private courseService: CourseService,
    private studentService: StudentService,
    private intenalStudentService: InternalService,
  ) {}

  @Post('add/:_id')
  async addStudentCourse(
    @Param('_id') _id: string,
    @Body() body: AddStudentOfCourse,
  ) {
    const { student_id } = body;

    const isCourse = await this.courseService.getById(_id);
    //course mavjudligini tekshiradi
    if (!isCourse)
      throw new HttpException('No course found.', HttpStatus.NOT_FOUND);

    const isStudent = await this.studentService.getById(student_id);
    // student mavjudligini tekshiradi
    if (!isStudent)
      throw new HttpException('No student found.', HttpStatus.NOT_FOUND);
    
    const iScourseSstudent = await this.studentsOfCourseService.getStudents(
      _id,
      student_id,
    );
    // course da student mavjudligini tekshiradi
    if (iScourseSstudent)
      throw new HttpException('there is a student', HttpStatus.BAD_REQUEST);

    //studentni coursga qo'shish
    const addStudentcourse = await this.studentsOfCourseService.studendAdd(
      _id,
      body,
    );

    //student tarihiga course ga id berish
    const studentHistoryAdd = await this.intenalStudentService.addCourseId(
      student_id,
      _id,
    );

    if (
      addStudentcourse['modifiedCount'] > 0 &&
      studentHistoryAdd['modifiedCount'] > 0
    ) {
      throw new HttpException('student joined', HttpStatus.CREATED);
    } else {
      if (addStudentcourse['modifiedCount'] == 0) {
        // student da course qismiga course_id qo'shilgan uni o'chirish kerak

        throw new HttpException(
          'Problem adding student to course',
          HttpStatus.BAD_REQUEST,
        );
      }

      // course da student qismiga student_id qo'shilgan uni o'chirish kerak

      throw new HttpException(
        'Problem adding course to student',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('getbyid/:course_id/:student_id')
  async getStudentById(
    @Param('course_id') course_id: string,
    @Param('student_id') student_id: string,
  ) {
    const isCourse = await this.courseService.getById(course_id);

    if (!isCourse)
      throw new HttpException('No course found.', HttpStatus.NOT_FOUND);

    const data = await this.studentsOfCourseService.getStudents(
      course_id,
      student_id,
    );

    if (data) return data;
    else
      throw new HttpException(
        'No student found in course',
        HttpStatus.NOT_FOUND,
      );
  }

  @Delete('delbyid/:course_id/:student_id')
  async delStudentById(
    @Param('course_id') course_id: string,
    @Param('student_id') student_id: string,
  ) {
    const isCourse = await this.courseService.getById(course_id);
    const isStudent = await this.studentService.getById(student_id);
    if (isCourse && isStudent) {
      const delstudent = await this.studentsOfCourseService.studentDel(
        course_id,
        student_id,
      );

      const delcourse = await this.intenalStudentService.courseDelId(
        student_id,
        course_id,
      );
      const DELSTUDENTNUM: number = 0;

      if (
        delstudent['modifiedCount'] > DELSTUDENTNUM &&
        delcourse['modifiedCount'] > DELSTUDENTNUM
      )
        throw new HttpException(
          'Student has been deleted',
          HttpStatus.ACCEPTED,
        );
      else {
        if (delcourse['modifiedCount'] == 0 || delcourse == null) {
          throw new HttpException(
            'Problem deleting course.',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'Problem deleting student ',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else throw new HttpException('Not fount course', HttpStatus.NOT_FOUND);
  }

  @Delete('delspecialbyid/:course_id/:student_id')
  async delSpecialById(
    @Param('course_id') course_id: string,
    @Param('student_id') student_id: string,
  ) {
    const isStudent_id = await this.studentsOfCourseService.getStudents(
      course_id,
      student_id,
    );
    if (isStudent_id) {
      const delstudent = await this.studentsOfCourseService.studentDel(
        course_id,
        student_id,
      );
      if (delstudent['modifiedCount'] > 0)
        throw new HttpException('Record deleted successfully.', HttpStatus.OK);
      else
        throw new HttpException(
          'Error occurred while deleting record."',
          HttpStatus.BAD_REQUEST,
        );
    } else throw new HttpException('Record not found.', HttpStatus.NOT_FOUND);
  }
}
