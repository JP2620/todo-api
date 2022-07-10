import { Inject, Injectable } from '@nestjs/common';
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
  ) { }

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

  async findFolderByName(folder_name: string, owner: string) {
    const ownerUser: User = await this.userService.findUserByUsername(owner);
    return this.folderRepository.findOne({
      where: {
        name: folder_name,
        owner: ownerUser,
      },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const folder: ToDoFolder = await this.findFolderByName(
      createTaskDto.folder,
      createTaskDto.owner,
    );
    const newTask: Task = this.taskRepository.create({
      folder: folder,
      name: createTaskDto.description,
      state: 'Uncompleted',
    });
    return this.taskRepository.save(newTask);
  }

  async getTasks(folder_name: string, owner: string) {
    const folder: ToDoFolder = await this.findFolderByName(folder_name, owner);
    return this.taskRepository.find({
      where: {
        folder: folder,
      },
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

  async getFolderById(folderId: number) {
    return this.folderRepository.findOne({
      where: {
        id: folderId,
      },
      relations: ['owner', 'tasks'],
    });
  }

  async findTask(owner: string, folder: string, description: string) {
    const parent_folder: ToDoFolder = await this.findFolderByName(
      folder,
      owner,
    );
    return this.taskRepository.findOne({
      where: {
        name: description,
      },
    });
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {
    const task: Task = await this.findTask(
      updateTaskDto.owner,
      updateTaskDto.folder,
      updateTaskDto.old_description,
    );
    const state: string =
      updateTaskDto.state === 'Uncompleted' ? 'Uncompleted' : 'Completed';
    const description = updateTaskDto.new_description
      ? updateTaskDto.new_description
      : updateTaskDto.old_description;
    return this.taskRepository.save({
      id: task.id,
      name: description,
      state: state,
    });
  }
}
