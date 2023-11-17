import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schemas/students-schema';
import { AddStudentDTO } from '../dto/add-student-dto';
import { student } from 'src/data-type/student-type';
import { SetStudentDTO } from '../dto/set-student-dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private stundentModel: Model<Student>,
  ) {}

  async add(student: AddStudentDTO): Promise<object | null> {
    student.courses = student.courses || [];
    student.img = student.img || ' ';
    const newstudent = new this.stundentModel(student);
    return newstudent.save().catch((err) => null);
  }

  async getAll(): Promise<student[] | null> {
    const students: student[] = await this.stundentModel
      .find()
      .catch((err) => null);
    return students;
  }

  async getById(_id: string): Promise<student | null> {
    const student: student | null = await this.stundentModel
      .findById(_id)
      .catch((err) => null);
    return student;
  }

  async search(lname: string, fname: string): Promise<student | null> {
    return this.stundentModel.findOne({ lname, fname }).catch((err) => null);
  }

  async searchPhoneNumber(phone: string): Promise<student | null> {
    return this.stundentModel.findOne({ phone }).catch((err) => null);
  }

  async set(_id: string, body: SetStudentDTO): Promise<object | null> {
    return this.stundentModel
      .findByIdAndUpdate({ _id }, { $set: body })
      .catch((err) => null);
  }

  async del(_id: string) {
    return this.stundentModel.findByIdAndRemove(_id).catch((err) => null);
  } 
}
