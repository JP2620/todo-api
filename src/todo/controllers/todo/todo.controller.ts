import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';

@Controller('todo')
export class TodoController {
    constructor(@Inject('TODO_SERVICE') private readonly todoService:
    TodoService) {}

    @Post('create/folder')
    @UsePipes(ValidationPipe)
    async createFolder(@Body() createFolderDto: CreateFolderDto) {
        console.log(createFolderDto);
        await this.todoService.createFolder(createFolderDto);
    }

}
