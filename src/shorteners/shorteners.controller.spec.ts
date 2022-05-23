import { Test, TestingModule } from '@nestjs/testing';
import { ShortenersController } from './shorteners.controller';

describe('ShortenersController', () => {
  let controller: ShortenersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenersController],
    }).compile();

    controller = module.get<ShortenersController>(ShortenersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
