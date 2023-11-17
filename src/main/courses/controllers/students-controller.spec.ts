import { Test, TestingModule } from '@nestjs/testing';
import { StudentsOfCourseController } from './students-controller';

describe('StudentsOfCourseController', () => {
  let controller: StudentsOfCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsOfCourseController],
    }).compile();

    controller = module.get<StudentsOfCourseController>(
      StudentsOfCourseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
