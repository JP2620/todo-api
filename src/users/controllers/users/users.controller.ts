import { Controller, Get } from '@nestjs/common';
import {UsersService} from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){};

    @Get('') 
    getCustomer(){
        return this.usersService.findUser();
    }
    
}
