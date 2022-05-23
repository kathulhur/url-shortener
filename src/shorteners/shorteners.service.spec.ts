import { Test, TestingModule } from '@nestjs/testing';
import { ShortenersService } from './shorteners.service';

describe('ShortenersService', () => {
  let service: ShortenersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenersService],
    }).compile();

    service = module.get<ShortenersService>(ShortenersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
