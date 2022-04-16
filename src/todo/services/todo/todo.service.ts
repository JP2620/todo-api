import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from 'src/todo/dtos/CreateFolder.dto';
import { DeleteFolderDto } from 'src/todo/dtos/DeleteFolder.dto';
import { ToDoFolder } from 'src/typeorm/Folder';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(ToDoFolder) private readonly folderRepository:
            Repository<ToDoFolder>,
        @Inject('USER_SERVICE')
        private readonly userService: UsersService) { }

    async createFolder(createFolderDto: CreateFolderDto) {
        const owner: User = await 
            this.userService.findUserByUsername(createFolderDto.owner);
        const newFolder: ToDoFolder = this.folderRepository.create({...createFolderDto, owner})
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
}
