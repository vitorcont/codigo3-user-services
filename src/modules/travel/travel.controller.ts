import { ApiTags } from '@nestjs/swagger';
import { TravelService } from './travel.service';
import { Controller, Get, Param, Delete } from '@nestjs/common';

@ApiTags('Travel')
@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  async findAll() {
    return await this.travelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(id);
  }
}
