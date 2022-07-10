import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { CreateTaskDto } from 'src/todo/dtos/CreateTask.dto';
import { DeleteFolderDto } from 'src/todo/dtos/DeleteFolder.dto';
import { UpdateTaskDto } from 'src/todo/dtos/UpdateTask.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
import { Task } from 'src/typeorm/Task';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { ToDoFolder } from 'src/typeorm/Folder';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoService: TodoService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('folder')
  @UsePipes(ValidationPipe)
  async createFolder(
    @Session() session: Record<string, any>,
    @Body() createFolderDto: CreateFolderDto,
  ) {
    console.log(createFolderDto);
    if (session.passport.user.username === createFolderDto.owner)
      return await this.todoService.createFolder(createFolderDto);
    else
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('folder/:id')
  @UsePipes(ValidationPipe)
  async deleteFolder(
    @Session() session: Record<string, any>,
    @Param('id') folderId: number,
  ) {
    this.todoService
      .getFolderById(folderId)
      .then(async (folder: ToDoFolder) => {
        if (session.passport.user.id === folder.owner.id) {
          return await this.todoService.deleteFolderById(folder.id);
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.UNAUTHORIZED,
          );
        }
      });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('folder')
  @UsePipes(ValidationPipe)
  async getFolders(@Session() session: Record<string, any>) {
    return await this.todoService.getFolders(session.passport.user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('task')
  @UsePipes(ValidationPipe)
  async createTask(
    @Session() session: Record<string, any>,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    console.log(createTaskDto);
    if (session.passport.user.username === createTaskDto.owner)
      return await this.todoService.createTask(createTaskDto);
    else
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('folder/:id')
  @UsePipes(ValidationPipe)
  async getTasks(
    @Session() session: Record<string, any>,
    @Param('id') folder: string,
  ) {
    console.log(folder);
    return await this.todoService.getTasks(
      folder,
      session.passport.user.username,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('task')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Session() session: Record<string, any>,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    console.log(updateTaskDto);
    if (session.passport.user.username === updateTaskDto.owner)
      return await this.todoService.updateTask(updateTaskDto);
    else
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
