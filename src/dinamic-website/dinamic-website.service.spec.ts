import { Test, TestingModule } from '@nestjs/testing';
import { DinamicWebsiteService } from './dinamic-website.service';

describe('DinamicWebsiteService', () => {
  let service: DinamicWebsiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinamicWebsiteService],
    }).compile();

    service = module.get<DinamicWebsiteService>(DinamicWebsiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
