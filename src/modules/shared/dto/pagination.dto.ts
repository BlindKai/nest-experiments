import { IsNumberString, IsPositive, Validate } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  pageSize: number;
}
