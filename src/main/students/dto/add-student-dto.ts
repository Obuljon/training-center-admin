import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class AddStudentDTO {
  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsNotEmpty()
  @IsString()
  fname: string;
  img?: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;
  courses?: [];
}
