import { daysweek } from 'src/data-type/date-type';
import { student } from 'src/data-type/student-type';
import { IsNumberString, IsString, IsOptional } from 'class-validator';
export class SetCouresDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  starttime: string;

  @IsOptional()
  @IsString()
  teacher_id: string;

  @IsOptional()
  @IsNumberString()
  price: number;

  @IsOptional()
  @IsNumberString()
  durations: number;

  @IsOptional()
  @IsNumberString()
  deysweek: number[];

  daysleakage: [];

  students: [];
}
