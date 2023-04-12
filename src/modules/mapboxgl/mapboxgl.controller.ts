import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapboxglService } from './mapboxgl.service';
import { CreateMapboxglDto } from './dto/create-mapboxgl.dto';
import { UpdateMapboxglDto } from './dto/update-mapboxgl.dto';

@Controller('mapboxgl')
export class MapboxglController {
  constructor(private readonly mapboxglService: MapboxglService) {}

  @Post()
  create(@Body() createMapboxglDto: CreateMapboxglDto) {
    return this.mapboxglService.create(createMapboxglDto);
  }

  @Get()
  findAll() {
    return this.mapboxglService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapboxglService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapboxglDto: UpdateMapboxglDto) {
    return this.mapboxglService.update(+id, updateMapboxglDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapboxglService.remove(+id);
  }
}
