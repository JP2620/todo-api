import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/types';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly usersService:
        UsersService) { };

    @Get('/search/:username')
    getByUsername(@Param('username') username: string) {
        const user = this.usersService.getUserByUsername(username);
        if (user)
            return new SerializedUser(user);
        else
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    @Get('')
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        this.usersService.createUser(createUserDto);
    }



}
