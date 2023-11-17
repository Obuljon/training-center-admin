import { InternalService } from 'src/main/students/services/internal-service';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';

@Controller('api/students')
export class InternalController {
  constructor(private internalService: InternalService) {}

  @Get('course/getbyid/:student_id/:course_id')
  async getCourses(
    @Param('student_id') student_id: string,
    @Param('course_id') course_id: string,
  ) {
    const course = await this.internalService.getByIdCourse(
      student_id,
      course_id,
    );
    if (course) return course;
    else throw new NotFoundException();
  }

  @Delete('delspecialbyid/:student_id/:course_id')
  async delCourse(
    @Param('student_id') student_id: string,
    @Param('course_id') course_id: string,
  ) {
    const course = await this.internalService.courseDelId(
      student_id,
      course_id,
    );
    if (course['modifiedCount'] > 0)
      throw new HttpException('Record deleted successfully.', HttpStatus.OK);
    throw new BadRequestException();
  }
}
