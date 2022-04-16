import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository:
     Repository<UserEntity>) {}

    async getUserByUsername(username: string) {
        return await this.userRepository.findOne({
            where: {
                username: username
            }
        })
    }

    async createUser(userDto: CreateUserDto) {
        // TODO: VALIDATE
        const newUser = this.userRepository.create(userDto);
        return await this.userRepository.save(newUser);
    }

    async getUsers() {
        return await this.userRepository
        .find()
        .then(
            (rows) => rows.map((user) => plainToInstance(SerializedUser, user))
        );
    }
}
