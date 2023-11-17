import { Response } from 'express';
import { TeacherService } from '../services/main-services';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Delete,
  Res,
  Param,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AddTeacherDTO } from '../dto/add-teacher-dto';
import { SetTeacherDTO } from '../dto/set-teacher-dto';

@Controller('api/teachers')
export class MainCoController {
  constructor(private teacherService: TeacherService) {}

  @Post('add')
  @HttpCode(201)
  async addTeacher(@Body() body: AddTeacherDTO, @Res() res: Response) {
    const newteacher = await this.teacherService.add(body);
    if (newteacher) return res.json(newteacher);
    else
      throw new HttpException(
        'Unable to create record.',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Get('all')
  @HttpCode(200)
  async getAllTeachers() {
    const teachers = await this.teacherService.getAll();
    if (teachers) return teachers;
    else throw new NotFoundException();
  }

  @Get('search/:_lname/:_fname')
  @HttpCode(200)
  async getSearchTeacher(
    @Param('_lname') _lname: string,
    @Param('_fname') _fname: string,
  ) {
    const teacherOne = await this.teacherService.getOne(_lname, _fname);
    if (teacherOne) return teacherOne;
    else throw new NotFoundException();
  }

  @Get('byid/:_id')
  @HttpCode(200)
  async getTeacherById(@Param('_id') _id: string) {
    const teacher = await this.teacherService.getById(_id);
    if (teacher) return teacher;
    else throw new NotFoundException();
  }

  @Put('setbyid/:_id')
  @HttpCode(201)
  async setTeacherById(@Param('_id') _id: string, @Body() body: SetTeacherDTO) {
    const isteacher = await this.teacherService.getById(_id);
    if (!isteacher) throw new NotFoundException();

    const updateTeacher = await this.teacherService.set(_id, body);
    if (updateTeacher['acknowledged'])
      return {
        message: ['Record updated successfully.'],
      };
    else throw new BadRequestException();
  }

  @Delete('delbyid/:_id')
  async delTeacherById(@Param('_id') _id: string) {
    const isdel = await this.teacherService.getById(_id);
    if (!isdel) throw new NotFoundException();
    const del = await this.teacherService.del(_id);
    if (del)
      throw new HttpException('Record deleted successfully.', HttpStatus.OK);
    else
      throw new HttpException(
        'Error occurred while deleting record.',
        HttpStatus.BAD_REQUEST,
      );
  }
}
