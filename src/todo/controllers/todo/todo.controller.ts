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
import { UpdateTaskDto } from 'src/todo/dtos/UpdateTask.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';
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
    return await this.todoService.createFolder(
      createFolderDto,
      session.passport.user.username,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('folder/:id')
  @UsePipes(ValidationPipe)
  async deleteFolder(
    @Session() session: Record<string, any>,
    @Param('id') folderId: number,
  ) {
    this.todoService
      .findFolderById(folderId)
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
    return await this.todoService.getFolders(session.passport.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('task')
  @UsePipes(ValidationPipe)
  async createTask(
    @Session() session: Record<string, any>,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.todoService.createTask(
      createTaskDto,
      session.passport.user.id,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Get('folder/:folderName')
  @UsePipes(ValidationPipe)
  async getTasks(
    @Session() session: Record<string, any>,
    @Param('folderName') folderName: string,
  ) {
    return await this.todoService.getTasks(
      folderName,
      session.passport.user.id,
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
    return await this.todoService.updateTask(
      updateTaskDto,
      session.passport.user.id,
    );
  }
}
