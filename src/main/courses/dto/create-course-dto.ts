import { IsNumberString, IsString, IsNotEmpty, IsArray } from 'class-validator';

export class AddCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  starttime: string;

  @IsNotEmpty()
  @IsString()
  teacher_id: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  durations: number;

  @IsNotEmpty()
  @IsArray()
  deysweek: number[];
}
