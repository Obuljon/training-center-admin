import { Module } from '@nestjs/common';
import { MainController } from './controllers/main-controller';
import { CourseService } from './services/main-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schemas/courses-schema';
import { TeacherService } from '../teachers/services/main-services';
import { Teacher, TeacherSchema } from 'src/schemas/teachers-schema';
import { StudentsOfCourseController } from './controllers/students-controller';
import { StudentsOfCourseService } from './services/students-service';
import { Student, StudentSchema } from 'src/schemas/students-schema';
import { StudentService } from '../students/services/main-service';
import { InternalService } from '../students/services/internal-service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [MainController, StudentsOfCourseController],
  providers: [
    TeacherService,
    CourseService,
    StudentsOfCourseService,
    StudentService,
    InternalService,
  ],
})
export class CoursesModule {}
