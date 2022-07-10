import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Task } from './Task';
import { User } from './User';

@Entity()
export class ToDoFolder {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'todo_folder_id',
  })
  id: number;

  @ManyToOne(() => User, (owner) => owner.folders, { onDelete: 'CASCADE' })
  owner: User;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Task, (task) => task.folder)
  tasks: Task[];
}
