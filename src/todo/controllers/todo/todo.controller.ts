import { Body, Controller, Delete, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { CreateTaskDto } from 'src/todo/dtos/CreateTask.dto';
import { DeleteFolderDto } from 'src/todo/dtos/DeleteFolder.dto';
import { GetTasksDto } from 'src/todo/dtos/GetTasks.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';

@Controller('todo')
export class TodoController {
    constructor(@Inject('TODO_SERVICE') private readonly todoService:
    TodoService) {}

    @Post('folder')
    @UsePipes(ValidationPipe)
    async createFolder(@Body() createFolderDto: CreateFolderDto) {
        console.log(createFolderDto);
        return await this.todoService.createFolder(createFolderDto);
    }

    @Delete('folder')
    @UsePipes(ValidationPipe)
    async deleteFolder(@Body() deleteFolderDto: DeleteFolderDto) {
        await this.todoService.deleteFolderByName(deleteFolderDto);
    }

    @Post('task')
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto)
        return await this.todoService.createTask(createTaskDto);
    }

    @Get('task')
    @UsePipes(ValidationPipe)
    async getTasks(@Body() getTasksDto: GetTasksDto) {
        console.log(getTasksDto);
        return await this.todoService.getTasks(getTasksDto);
    } 



}
