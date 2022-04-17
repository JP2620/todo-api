import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Patch, Post, Session, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { CreateTaskDto } from 'src/todo/dtos/CreateTask.dto';
import { DeleteFolderDto } from 'src/todo/dtos/DeleteFolder.dto';
import { UpdateTaskDto } from 'src/todo/dtos/UpdateTask.dto';
import { GetTasksDto } from 'src/todo/dtos/GetTasks.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
import { Task } from 'src/typeorm/Task';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('todo')
export class TodoController {
    constructor(@Inject('TODO_SERVICE') private readonly todoService:
    TodoService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('folder')
    @UsePipes(ValidationPipe)
    async createFolder(@Session() session: Record<string, any>, @Body() createFolderDto: CreateFolderDto) {
        console.log(createFolderDto);
        if (session.passport.user.username === createFolderDto.owner)
            return await this.todoService.createFolder(createFolderDto);
        else
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('folder')
    @UsePipes(ValidationPipe)
    async deleteFolder(@Session() session: Record<string, any>, @Body() deleteFolderDto: DeleteFolderDto) {
        if (session.passport.user.username === deleteFolderDto.owner)
            await this.todoService.deleteFolderByName(deleteFolderDto);
        else
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);

    }

    @UseGuards(AuthenticatedGuard)
    @Post('task')
    @UsePipes(ValidationPipe)
    async createTask(@Session() session: Record<string, any>, @Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto)
        if (session.passport.user.username === createTaskDto.owner)
            return await this.todoService.createTask(createTaskDto);
        else
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('task')
    @UsePipes(ValidationPipe)
    async getTasks(@Session() session: Record<string, any>, @Body() getTasksDto: GetTasksDto)  {
        console.log(getTasksDto);
        if (session.passport.user.username === getTasksDto.owner)
            return await this.todoService.getTasks(getTasksDto);
        else
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }

    @UseGuards(AuthenticatedGuard)
    @Patch('task')
    @UsePipes(ValidationPipe)
    async updateTask(@Session() session: Record<string, any>, @Body() updateTaskDto: UpdateTaskDto) {
        console.log(updateTaskDto);
        if (session.passport.user.username === updateTaskDto.owner)
            return await this.todoService.updateTask(updateTaskDto);
        else
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }


}
