import { Test, TestingModule } from '@nestjs/testing';
import { DinamicWebsiteController } from './dinamic-website.controller';
import { DinamicWebsiteService } from './dinamic-website.service';

describe('DinamicWebsiteController', () => {
  let controller: DinamicWebsiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinamicWebsiteController],
      providers: [DinamicWebsiteService],
    }).compile();

    controller = module.get<DinamicWebsiteController>(DinamicWebsiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
