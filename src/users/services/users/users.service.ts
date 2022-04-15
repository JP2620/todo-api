import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/users/types/User';

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

    createUser(userDto: CreateUserDto) {
        this.users.push(userDto)
    }

    getUsers() {
        return this.users;
    }
}
