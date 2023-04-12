import { PartialType } from '@nestjs/mapped-types';
import { CreateMapboxglDto } from './create-mapboxgl.dto';

export class UpdateMapboxglDto extends PartialType(CreateMapboxglDto) {}
