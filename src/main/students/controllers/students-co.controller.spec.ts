import { Test, TestingModule } from '@nestjs/testing';
import { StudentsCoController } from './students-co.controller';

describe('StudentsCoController', () => {
  let controller: StudentsCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsCoController],
    }).compile();

    controller = module.get<StudentsCoController>(StudentsCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
