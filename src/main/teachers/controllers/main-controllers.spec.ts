import { Test, TestingModule } from '@nestjs/testing';
import { MainCoController } from './main-controllers';
import { Request, Response } from 'express';

describe('MainCoController', () => {
  let controller: MainCoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainCoController],
    }).compile();

    controller = module.get<MainCoController>(MainCoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
