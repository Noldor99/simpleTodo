import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TaskTodo, Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, TaskTodo]),
    FilesModule
  ],
  controllers: [TodoController],
  providers: [TodoService, IsUniqueConstraint],
  exports: [TodoService],
})
export class TodoModule { }
