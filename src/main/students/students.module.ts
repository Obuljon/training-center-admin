import { Module } from '@nestjs/common';
import { StudentsCoController } from './controllers/students-co.controller';
import { StudentService } from './services/main-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schemas/students-schema';
import { InternalService } from './services/internal-service';
import { InternalController } from './controllers/internal-controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentsCoController, InternalController],
  providers: [StudentService, InternalService],
})
export class StudentsModule {}
