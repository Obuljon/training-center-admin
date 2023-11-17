import { IsNumberString, IsString, IsOptional } from 'class-validator';

export class SetStudentDTO {
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

  courses: [];
}
