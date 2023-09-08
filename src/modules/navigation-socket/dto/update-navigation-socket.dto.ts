import { PartialType } from '@nestjs/mapped-types';
import { CreateNavigationSocketDto } from './create-navigation-socket.dto';

export class UpdateNavigationSocketDto extends PartialType(CreateNavigationSocketDto) {
  id: number;
}
