import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './main/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { TeachersModule } from './main/teachers/teachers.module';
import { StudentsModule } from './main/students/students.module';


config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MOGODB_URI, {
      connectionFactory: (connection) => {
        console.log('connection database');
        return connection;
      },
    }),
    CoursesModule,
    TeachersModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
