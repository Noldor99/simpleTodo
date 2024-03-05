import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryTodoParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  @IsString()
  @IsIn(['all', 'completed', 'notcompleted'])
  sort?: 'all' | 'completed' | 'notcompleted'
}
