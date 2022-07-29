import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class ListPostDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
