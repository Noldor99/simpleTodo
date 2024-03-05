import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoService } from 'src/todo/todo.service';


@Injectable()
export class TodoSeed implements SeederInterface {
  constructor(

    private readonly todoService: TodoService,
  ) { }

  async seed() {


    for (let i = 50; i > 0; i--) {
      const todoImg =
        i % 3 === 0
          ? 'https://loremflickr.com/600/200/cat'
          : i % 3 === 1
            ? 'https://loremflickr.com/600/300/cat'
            : 'https://loremflickr.com/400/300/cat';

      const todoSeed: CreateTodoDto = {
        title: `Simple Title ${i}`,
        description: `Simple Description ${i}`,
        todoImg,
        //@ts-ignore
        tasks: JSON.stringify(
          [
            { title: 'Task 1', status: false, description: 'Description for Task 1' },
            { title: 'Task 2', status: true, description: 'Description for Task 2' }
          ]
        ),
        subDescription: `Simple subDescription ${i}`,
      };


      await new Promise(resolve => setTimeout(resolve, 10));
      await this.todoService.create(todoSeed, todoImg)
    }
  }
}
