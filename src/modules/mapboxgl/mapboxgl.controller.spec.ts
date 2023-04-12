import { Test, TestingModule } from '@nestjs/testing';
import { MapboxglController } from './mapboxgl.controller';
import { MapboxglService } from './mapboxgl.service';

describe('MapboxglController', () => {
  let controller: MapboxglController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapboxglController],
      providers: [MapboxglService],
    }).compile();

    controller = module.get<MapboxglController>(MapboxglController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
