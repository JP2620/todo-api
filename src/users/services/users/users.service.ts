import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/users/types';

@Injectable()
export class UsersService {
    private users: User[] = [
    {
        "id": 1,
        "name": "John",
        "surname": "Doe",
        "username": "johndoe",
        "password": "password"
    },
    {
        "id": 2,
        "name": "Jane",
        "surname": "Doe",
        "username": "janedoe",
        "password": "password"
    }
    ]

    findUserById(id: number) {
        return this.users.find((user) => user.id === id);
    }

    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username);
    }

    createUser(userDto: CreateUserDto) {
        this.users.push(userDto)
    }

    getUsers() {
        return this.users;
    }
}
