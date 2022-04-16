import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { CreateTaskDto } from 'src/todo/dtos/CreateTask.dto';
import { DeleteFolderDto } from 'src/todo/dtos/DeleteFolder.dto';
import { GetTasksDto } from 'src/todo/dtos/GetTasks.dto';
import { ToDoFolder } from 'src/typeorm/Folder';
import { Task } from 'src/typeorm/Task';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(ToDoFolder) private readonly folderRepository:
            Repository<ToDoFolder>,
        @InjectRepository(Task) private readonly taskRepository: 
            Repository<Task>,
        @Inject('USER_SERVICE')
        private readonly userService: UsersService) { }

    async createFolder(createFolderDto: CreateFolderDto) {
        const owner: User = await
            this.userService.findUserByUsername(createFolderDto.owner);
        const newFolder: ToDoFolder = this.folderRepository.create({ ...createFolderDto, owner })
        return this.folderRepository.save(newFolder);
    }

    async deleteFolderByName(deleteFolderDto: DeleteFolderDto) {
        const owner: User = await
            this.userService.findUserByUsername(deleteFolderDto.owner);
        return this.folderRepository.delete({
            name: deleteFolderDto.name,
            id: owner.id
        })
    }

    async findFolderByName(folder_name: string, owner: string) {
        const ownerUser: User = await
            this.userService.findUserByUsername(owner);
        return this.folderRepository.findOne(
            {
                name: folder_name,
                owner: ownerUser
            });
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const folder: ToDoFolder = await
            this.findFolderByName(createTaskDto.folder, createTaskDto.owner);
        const newTask: Task = this.taskRepository.create({
            folder: folder,
            name: createTaskDto.description
        });
        return this.taskRepository.save(newTask);
        
    }

    async getTasks(getTasksDto: GetTasksDto) {
        const folder: ToDoFolder = await
            this.findFolderByName(getTasksDto.folder, getTasksDto.owner);
        return this.taskRepository.find({
            folder: folder
        });
    }
}
