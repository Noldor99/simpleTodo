import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TaskTodo, Todo } from "./todo.entity"
import { Repository } from "typeorm"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { QueryTodoParamsDto } from "./dto/query-todo-params.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { FileType, FilesService } from "src/files/files.service"

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private fileService: FilesService,
    @InjectRepository(TaskTodo)
    private taskRepository: Repository<TaskTodo>
  ) { }


  async create(dto: CreateTodoDto, img): Promise<Todo> {

    let savedTasks = null

    if (dto.tasks) {
      //@ts-ignore
      const contactParse = JSON.parse(dto.tasks)
      const task = this.taskRepository.create(contactParse);
      savedTasks = await this.taskRepository.save(task);
    }

    let picturePath = null
    if (img) {
      picturePath = await this.fileService.createPostImage(
        FileType.TODO,
        img,
      )
    }

    const todo = this.todoRepository.create({
      ...dto,
      todoImg: picturePath,
      tasks: savedTasks,
    });
    return await this.todoRepository.save(todo);
  }

  async getAll(dto: QueryTodoParamsDto) {
    const { page = 1, limit = 4 } = dto;
    try {
      const [todos, totalCount] = await this.todoRepository.findAndCount({
        relations: { tasks: true },
        order: {
          createdAt: 'DESC',
        },
        take: +limit,
        skip: (+page - 1) * +limit,
      });

      return { totalCount, todos };
    } catch (e) {
      return { totalCount: 0, todos: [] }
    }
  }

  async findOne(id: string, dto?: QueryTodoParamsDto): Promise<{ todo: Todo; totalTasks: number; }> {
    const { sort } = dto || {};

    const queryBuilder = this.todoRepository.createQueryBuilder('todo')
      .leftJoinAndSelect('todo.tasks', 'task')
      .where('todo.id = :id', { id });



    if (sort === 'completed') {
      queryBuilder.andWhere('task.status = :status', { status: true });
    } else if (sort === 'notcompleted') {
      queryBuilder.andWhere('task.status = :status', { status: false });
    }

    const todo = await queryBuilder.getOne();

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const totalTasks = await this.taskRepository.count({
      where: { todo: { id: todo.id } },
    });

    return { todo, totalTasks };
  }



  async editTodo(todoId: string, dto: UpdateTodoDto, img) {
    const { todo } = await this.findOne(todoId);

    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (key !== "todoImg" && key !== "tasks") {
        if (dto[key]) acc[key] = dto[key];
      }
      return acc;
    }, {});

    Object.assign(todo, dtoFilter);

    const urlProjestsImg = todo.todoImg

    let picturePath = null

    if (img) {
      picturePath = await this.fileService.updatePostImage(
        urlProjestsImg,
        FileType.TODO,
        img,
      )
      todo.todoImg = picturePath
    }

    if (dto.tasks) {
      //@ts-ignore
      const tasks = JSON.parse(dto.tasks);
      const existingTasks = todo.tasks || [];

      const tasksToCreate = tasks.filter(taskDto => !existingTasks.some(existingTask => existingTask.id === taskDto.id));
      const tasksToUpdate = tasks.filter(taskDto => existingTasks.some(existingTask => existingTask.id === taskDto.id));
      const tasksToDelete = existingTasks.filter(existingTask => !tasks.some(taskDto => taskDto.id === existingTask.id));

      await Promise.all(tasksToDelete.map(async (taskToDelete) => {
        await this.taskRepository.remove(taskToDelete);
      }));

      const updatedTasks = await Promise.all(tasksToUpdate.map(async (taskDto) => {
        const task = existingTasks.find((existingTask) => existingTask.id === taskDto.id) || new TaskTodo();
        Object.assign(task, taskDto);
        return this.taskRepository.save(task);
      }));

      const createdTasks = await Promise.all(tasksToCreate.map(async (taskDto) => {
        const newTask = new TaskTodo();
        Object.assign(newTask, taskDto);
        return this.taskRepository.save(newTask);
      }));

      const allTasks = [...updatedTasks, ...createdTasks];

      todo.tasks = allTasks;
    }

    const updatedTodo = await this.todoRepository.save(todo);
    return updatedTodo;
  }


  async remove(id: string) {
    const { todo } = await this.findOne(id);
    return this.todoRepository.remove(todo);
  }

}
