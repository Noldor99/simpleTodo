import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  todoImg: string;

  @OneToMany(() => TaskTodo, task => task.todo, { nullable: true })
  tasks: TaskTodo[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity('taskTodo')
export class TaskTodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @ManyToOne(() => Todo, todo => todo.tasks, { onDelete: 'CASCADE' })
  todo: Todo;
}
