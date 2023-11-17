import { Test, TestingModule } from '@nestjs/testing';
import { StudentsOfCourseService } from './students-service';

describe('StudentsOfCourseService', () => {
  let service: StudentsOfCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsOfCourseService],
    }).compile();

    service = module.get<StudentsOfCourseService>(StudentsOfCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
