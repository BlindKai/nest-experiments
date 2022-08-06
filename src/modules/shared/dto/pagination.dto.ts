import { IsNumberString } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  pageSize: number;
}
