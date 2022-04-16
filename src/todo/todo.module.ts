import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
