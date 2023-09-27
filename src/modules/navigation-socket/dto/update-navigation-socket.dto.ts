import { PartialType } from '@nestjs/mapped-types';
import { CreateNavigationSocketDto } from './user-location';

export class UpdateNavigationSocketDto extends PartialType(
  CreateNavigationSocketDto,
) {
  id: number;
}
