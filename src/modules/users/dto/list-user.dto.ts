import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class ListUserDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
