import {
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { CreateTaskDto } from 'src/todo/dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/todo/dtos/UpdateTask.dto';
import { ToDoFolder } from 'src/typeorm/Folder';
import { Task } from 'src/typeorm/Task';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDoFolder)
    private readonly folderRepository: Repository<ToDoFolder>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @Inject('USER_SERVICE')
    private readonly userService: UsersService,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto, username: string) {
    this.userService.findUserByUsername(username).then(async (owner) => {
      const newFolder: ToDoFolder = this.folderRepository.create({
        name: createFolderDto.name,
        owner,
      });
      return this.folderRepository.save(newFolder);
    });
  }

  async deleteFolderById(folderId: number) {
    return this.folderRepository.delete({ id: folderId });
  }

  async findFolderByNameAndOwner(folder_name: string, ownerId: number) {
    const ownerUser: User = await this.userService.findById(ownerId);
    return this.folderRepository.findOne({
      where: {
        name: folder_name,
        owner: ownerUser,
      },
      relations: ['owner'],
    });
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    const folder: ToDoFolder = await this.findFolderByNameAndOwner(
      createTaskDto.folderName,
      userId,
    );
    if (userId === folder.owner.id) {
      const newTask: Task = this.taskRepository.create({
        folder: folder,
        name: createTaskDto.name,
        state: 'Uncompleted',
      });
      return this.taskRepository.save(newTask);
    } else {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
  }

  async getTasks(folderName: string, ownerId: number) {
    const folder: ToDoFolder = await this.findFolderByNameAndOwner(
      folderName,
      ownerId,
    );
    return this.taskRepository.find({
      where: {
        folder: folder,
      },
      relations: ['folder'],
    });
  }

  async getFolders(userId: number) {
    const ownerUser: User = await this.userService.findById(userId);
    return this.folderRepository.find({
      where: {
        owner: ownerUser,
      },
    });
  }

  async findFolderById(folderId: number) {
    return this.folderRepository.findOne({
      where: {
        id: folderId,
      },
      relations: ['owner'],
    });
  }

  async findTaskById(id: number) {
    return this.taskRepository.findOne({
      where: {
        id: id,
      },
      relations: ['folder', 'folder.owner'],
    });
  }

  async updateTask(updateTaskDto: UpdateTaskDto, ownerId: number) {
    const task: Task = await this.findTaskById(updateTaskDto.id);
    console.log(task);
    if (task.folder.owner.id === ownerId) {
      task.state =
        updateTaskDto.state === 'Uncompleted' ? 'Uncompleted' : 'Completed';
      task.name = updateTaskDto.name ? updateTaskDto.name : task.name;
      return this.taskRepository.save(task);
    } else {
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }
  }
}
