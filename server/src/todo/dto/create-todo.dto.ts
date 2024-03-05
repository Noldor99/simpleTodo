import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';

export class CreateTaskDto {
  @ApiProperty({
    example: 'http://example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: false,
  })
  readonly status: boolean;

  @ApiProperty({
    example: 'Official Website',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly description: string;

  readonly id?: string
}

export class CreateTodoDto {
  @ApiProperty({
    example: 'Simple Title',
  })
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'todo', column: 'title' })
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly title: string;

  @ApiProperty({
    example: 'Simple Description',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be 3 - 255 characters long' })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image',
    required: false,
  })
  readonly todoImg: any

  @ApiProperty({
    example: [
      { title: 'Task 1', status: false, description: 'Description for Task 1' },
      { title: 'Task 2', status: true, description: 'Description for Task 2' }
    ],
    type: CreateTaskDto,
    isArray: false,
  })
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  readonly tasks: CreateTaskDto[];
}
