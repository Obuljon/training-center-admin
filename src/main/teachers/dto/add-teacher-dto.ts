import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';
import { teacherCourses } from 'src/data-type/teacher-type';

export class AddTeacherDTO {
  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsNotEmpty()
  @IsString()
  fname: string;

  img: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  courses: teacherCourses[];
}
