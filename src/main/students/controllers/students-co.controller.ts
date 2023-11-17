import { student } from '../../../data-type/student-type';
import { StudentService } from '../services/main-service';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AddStudentDTO } from '../dto/add-student-dto';
import { SetStudentDTO } from '../dto/set-student-dto';

@Controller('api/students')
export class StudentsCoController {
  constructor(private studentService: StudentService) {}

  @Post('add')
  @HttpCode(201)
  async addStudent(@Body() body: AddStudentDTO, @Res() res: Response) {
    const isStudent = await this.studentService.searchPhoneNumber(body.phone);
    if (isStudent)
      throw new HttpException(
        'there is such a phone number.',
        HttpStatus.BAD_REQUEST,
      );

    const newstudent = await this.studentService.add(body);
    if (newstudent) return res.json(newstudent);
    else throw new BadRequestException();
  }

  @Get('all')
  async all() {
    const students: student[] = (await this.studentService.getAll()) || [];
    return students;
  }

  @Get('search/:_lname/:_fname')
  async search(
    @Param('_lname') _lname: string,
    @Param('_fname') _fname: string,
  ) {
    const student = await this.studentService.search(_lname, _fname);
    if (student) return student;
    else throw new BadRequestException();
  }

  @Get('byid/:_id')
  async studentById(@Param('_id') _id: string) {
    const student: student = await this.studentService.getById(_id);
    if (student) student;
    else throw new NotFoundException();
  }

  @Put('setbyid/:_id')
  async setStudentById(@Param('_id') _id: string, @Body() body: SetStudentDTO) {
    const isStudent: student | null = await this.studentService.getById(_id);
    if (!isStudent) throw new NotFoundException();

    const updateStudent = await this.studentService.set(_id, body);
    if (updateStudent)
      throw new HttpException('Record updated successfully.', HttpStatus.OK);
    else throw new BadRequestException();
  }

  @Delete('delbyid/:_id')
  async delById(@Res() res: Response, @Param('_id') _id: string) {
    const isobj = await this.studentService.getById(_id);
    if (!isobj) throw new NotFoundException();

    const del = await this.studentService.del(_id);
    if (del)
      throw new HttpException('Record deleted successfully.', HttpStatus.OK);
    else
      throw new HttpException(
        'Error occurred while deleting record.',
        HttpStatus.BAD_REQUEST,
      );
  }
}
