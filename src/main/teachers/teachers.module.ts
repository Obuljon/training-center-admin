import { Module } from '@nestjs/common';
import { MainCoController } from './controllers/main-controllers';
import { TeacherService } from './services/main-services';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from 'src/schemas/teachers-schema';
import { TeacherInternalService } from './services/internal-service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [MainCoController],
  providers: [TeacherService, TeacherInternalService],
})
export class TeachersModule {}
