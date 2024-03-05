import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryTodoParamsDto } from './dto/query-todo-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from 'src/files/files.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.TODO))
  create(
    @Body() createTodoDto: CreateTodoDto,
    @UploadedFile() img
  ) {
    return this.todoService.create(createTodoDto, img);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })

  getAll(@Query() params: QueryTodoParamsDto) {
    return this.todoService.getAll(params);

  }

  @Get(':id')
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    enum: ['all', 'completed', 'notCompleted'],
  })
  @ApiParam({ name: 'id', required: true, description: 'ID of the todo' })
  getOne(@Param('id') id: string, @Query() params: QueryTodoParamsDto) {
    return this.todoService.findOne(id, params);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(FileType.TODO))
  async update(
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @UploadedFile() img
  ) {
    return await this.todoService.editTodo(todoId, updateTodoDto, img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
