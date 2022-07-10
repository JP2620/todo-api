import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ToDoFolder } from './Folder';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(() => ToDoFolder, (folder) => folder.owner)
  folders: ToDoFolder[];
}
