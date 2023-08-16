import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ControllerService } from './controller.service';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { AuthGuard } from 'src/libraries/auth/auth.guard';

@ApiTags('Traffic Controller')
@Controller('controller')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ControllerController {
  constructor(private readonly controllerService: ControllerService) {}

  @Post()
  create(@Body() createControllerDto: CreateControllerDto) {
    return this.controllerService.create(createControllerDto);
  }

  @Get()
  findAll() {
    return this.controllerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controllerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateControllerDto: UpdateControllerDto,
  ) {
    return this.controllerService.update(id, updateControllerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controllerService.remove(id);
  }
}
