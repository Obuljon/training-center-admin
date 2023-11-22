import { CourseService } from '../services/main-service';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Body,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Express, Request, Response } from 'express';
import { AddCourseDTO } from '../dto/create-course-dto';
import { SetCouresDTO } from '../dto/set-course-dto';
import { TeacherService } from 'src/main/teachers/services/main-services';
import { TeacherInternalService } from 'src/main/teachers/services/internal-service';

@Controller('/api/courses')
export class MainController {
  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private teacherInternalService: TeacherInternalService,
  ) {}

  @Post('create')
  async create(@Body() body: AddCourseDTO) {
    const isCourse = await this.courseService.getOne(body.name);
    // course mavjudligini tekshiradi. agar course mavjud bo'lsa statusCode:400 qaytaradi
    if (isCourse) {
      throw new HttpException(
        'there is such a course name',
        HttpStatus.BAD_REQUEST,
      );
    }
    const teacher = await this.teacherService.getById(body.teacher_id);
    // teacher mavjudligini tekshiradi
    if (!teacher) {
      throw new HttpException('No teacher found.', HttpStatus.NOT_FOUND);
    }

    const result = await this.courseService.add(body);
    // course yaratish mofaqqatli amalga oshsa teacher ni courses ga course id si qo'shiladi
    const course_id = result._id;
    const { teacher_id } = body;
    if (result) {
      // teacher ni course arr ga course_id qo'shiladi
      const teachercoursepushid = await this.teacherInternalService.addCourse(
        teacher_id,
        course_id,
      );
      if (teachercoursepushid) return result;
      else {
        // teacher corse ga course_id ni push qilishda muammo yuz bersa course ni delete qiladi
        await this.courseService.delById(course_id);
        throw new BadRequestException(
          'There was a problem attaching course id to teacher',
        );
      }
    } else
      throw new HttpException(
        'Unable to create record.',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Get('all')
  async getAll() {
    const data = (await this.courseService.getAll()) || [];
    return data;
  }

  @Get('byid/:_id')
  async getById(@Param('_id') _id: string) {
    const getid = await this.courseService.getById(_id);
    if (getid) return getid;
    else throw new NotFoundException();
  }

  @Get('name/:name')
  async getName(@Param('name') name: string) {
    const saerchcoures = await this.courseService.getOne(name);

    if (saerchcoures) return saerchcoures;
    else throw new NotFoundException();
  }

  @Delete('delbyid/:_id')
  async del(@Param('_id') _id: string) {
    // o'chiriladigan course mavjudligini tekshirish
    const olddata = await this.courseService.getById(_id);
    if (!olddata) throw new NotFoundException();
    if (olddata.students.length > 0)
      throw new BadRequestException(
        'You cannot delete students from an existing course',
      );

    // course ni o'chirish
    const delcourse = await this.courseService.delById(_id);
    if (delcourse) {
      const { teacher_id } = olddata;
      // course ochirilgandan so'ng unga biriktirilgan techer ni course arr da qo'shilgan course_id ni o'chirish
      const delteachercourseid = await this.teacherInternalService.pullCourse(
        teacher_id,
        _id,
      );
      if (!delteachercourseid)
        throw new BadRequestException(
          'There was a problem deleting course_id attached to teacher',
        );
      throw new HttpException('Record deleted successfully.', HttpStatus.OK);
    } else
      throw new HttpException(
        'Error occurred while deleting record.',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Put('set/:_id')
  async setById(@Param('_id') _id: string, @Body() body: SetCouresDTO) {
    // yangilash kerak bo'lgan coursni mavjudligini tekshirish
    const olddata = await this.courseService.getById(_id);
    if (!olddata)
      throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);

    // teacher_id berilsa ishga tushadi
    const { teacher_id } = body;
    if (teacher_id) {
      // teacher_id mavjud bo'sa va course.teacher_id bilan teng bo'lsa ishga tushadi
      if (olddata.teacher_id == teacher_id) throw new BadRequestException();

      // yangilamoqchi bo'lgan teacher ni mavjudligini tekshirish
      const newteacher = await this.teacherService.getById(body.teacher_id);
      if (!newteacher)
        throw new HttpException('Teacher not found.', HttpStatus.NOT_FOUND);
      const newteacherstoreg = await this.teacherInternalService.addCourse(
        teacher_id,
        _id,
      );
    }

    // course ni yangilash
    const result = await this.courseService.setById(_id, body);
    if (result) {
      // teacher_id mavjud bo'lsa eski teacher ni course arr dan course_id ni o'chiradi
      if (teacher_id) {
        const { teacher_id } = olddata;
        const oldteacher = await this.teacherInternalService.pullCourse(
          teacher_id,
          _id,
        );
        if (!oldteacher)
          throw new BadRequestException(
            'There was a problem deleting course_id attached to teacher',
          );
      }
      throw new HttpException('Record updated successfully.', HttpStatus.OK);
    } else throw new BadRequestException();
  }
}
