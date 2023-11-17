import { IsNumberString, IsString, IsOptional } from 'class-validator';
import { teacherCourses } from 'src/data-type/teacher-type';

export class SetTeacherDTO {
  @IsOptional()
  @IsString()
  lname: string;

  @IsOptional()
  @IsString()
  fname: string;

  img: string;

  @IsOptional()
  @IsNumberString()
  phone: string;

  courses: teacherCourses[];
}
