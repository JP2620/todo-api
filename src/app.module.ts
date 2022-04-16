import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ToDoFolder } from './typeorm/Folder';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'todo_db.db',
    entities: [User, ToDoFolder],
    synchronize: true,
  }), AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
