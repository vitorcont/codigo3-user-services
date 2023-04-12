import { Test, TestingModule } from '@nestjs/testing';
import { MapboxglService } from './mapboxgl.service';

describe('MapboxglService', () => {
  let service: MapboxglService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapboxglService],
    }).compile();

    service = module.get<MapboxglService>(MapboxglService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
