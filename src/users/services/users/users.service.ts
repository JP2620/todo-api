import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findUser() {
        return {
            id: 1,
            username: "jp2620",
            password: "password123"
        }
    }
}
