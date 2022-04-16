import { TodoController } from "src/todo/controllers/todo/todo.controller";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ToDoFolder } from "./Folder";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'task_id'
    })
    id: number;

    @Column({
        nullable: false
    })
    name: string

    @ManyToOne(() => ToDoFolder, folder => folder.tasks, {onDelete: "CASCADE"})
    folder: ToDoFolder;
}