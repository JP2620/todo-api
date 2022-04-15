import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import {UsersService} from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){};

    @Get('/search/:id') 
    searchUserById(@Param('id', ParseIntPipe) id: number){
        const user = this.usersService.findUserById(id);
        if (user)
            return user;
        else
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    @Get('')
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        this.usersService.createUser(createUserDto);
    }


    
}
