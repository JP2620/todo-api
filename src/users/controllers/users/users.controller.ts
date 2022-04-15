import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly usersService:
        UsersService) { };

    @Get('/search/:id')
    searchUserById(@Param('id', ParseIntPipe) id: number) {
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
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        this.usersService.createUser(createUserDto);
    }



}
