import { PartialType } from '@nestjs/mapped-types';
import { CreateControllerSocketDto } from './create-controller-socket.dto';

export class UpdateControllerSocketDto extends PartialType(CreateControllerSocketDto) {
  id: number;
}
