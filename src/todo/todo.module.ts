import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoFolder } from 'src/typeorm/Folder';
import { Task } from 'src/typeorm/Task';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User, ToDoFolder, Task]),
      PassportModule.register({
        session: true,
      })
  ],
  controllers: [TodoController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    },
    {
      provide: 'TODO_SERVICE',
      useClass: TodoService
    }
  ]
})
export class TodoModule {}
