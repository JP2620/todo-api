import { Body, Controller, Get, Head, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser } from 'src/users/types';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly usersService:
        UsersService) { };

    @Get('/search/:username')
    async getByUsername(@Param('username') username: string) {
        const user = await this.usersService.getUserByUsername(username);
        if (user)
            return new SerializedUser(user);
        else
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    @Head('/search/:username')
    async headByUsername(@Param('username') username: string) {
        const user = await this.usersService.getUserByUsername(username);
        if (user)
            return new SerializedUser(user);
        else
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    @Get('')
    async getAllUsers() {
        return await this.usersService.getUsers();
    }



    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        this.usersService.createUser(createUserDto);
    }



}
