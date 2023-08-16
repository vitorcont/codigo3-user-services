import { FindRoute } from './dto/find-route.dtos';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/libraries/auth/auth.guard';

@ApiTags('Routes')
@Controller('routes')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('create')
  startRoute(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get('findRoute')
  findRoute(@Query() data: FindRoute) {
    console.log(data);
    return this.routesService.findRoute(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
