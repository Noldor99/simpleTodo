import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'
import { TodoSeed } from './generation/todoSeed';
import { TaskTodo, Todo } from 'src/todo/todo.entity';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Todo, TaskTodo]),
    TodoModule
  ],
  providers: [
    SeedService,
    TodoSeed
  ],
  exports: [SeedService]

})
export class SeedModule { }
