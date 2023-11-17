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

@Controller('/api/course')
export class MainController {
  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
  ) {}

  @Post('create')
  async create(@Body() body: AddCourseDTO) {
    const isCourse = await this.courseService.getOne(body.name);
    if (isCourse) {
      throw new HttpException(
        'there is such a course name',
        HttpStatus.BAD_REQUEST,
      );
    }
    const teacher = await this.teacherService.getById(body.teacher_id);
    if (!teacher) {
      throw new HttpException('Teacher not found.', HttpStatus.NOT_FOUND);
    }

    const result = await this.courseService.add(body);
    if (result) return result;
    else
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
    const olddata = await this.courseService.getById(_id);
    if (!olddata) throw new NotFoundException();

    const del = await this.courseService.delById(_id);
    if (del)
      throw new HttpException('Record deleted successfully.', HttpStatus.OK);
    else
      throw new HttpException(
        'Error occurred while deleting record.',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Put('set/:_id')
  async setById(@Param('_id') _id: string, @Body() body: SetCouresDTO) {
    const olddata = await this.courseService.getById(_id);
    if (!olddata)
      throw new HttpException('Course not found.', HttpStatus.NOT_FOUND);

    const newteacher = await this.teacherService.getById(body.teacher_id);
    if (!newteacher)
      throw new HttpException('Teacher not found.', HttpStatus.NOT_FOUND);

    const result = await this.courseService.setById(_id, body);
    if (result)
      throw new HttpException('Record updated successfully.', HttpStatus.OK);
    else throw new BadRequestException();
  }
}
